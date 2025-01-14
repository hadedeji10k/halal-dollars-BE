import { Service } from "typedi";
import { ApiError, generateOTP, jwt, Message, password } from "../utils";
import { User } from "../database/repository";
import {
  EmailOptions,
  EmailType,
  IChangePassword,
  IConfirmEmailPayload,
  IContactUsPayload,
  IForgotPasswordReset,
  IRequestEmailConfirmationPayload,
  IRequestForgotPassword,
  ISignInPayload,
  ISignUpPayload,
  IUser,
} from "../interfaces";
import { Mailer } from "../utils/mailing";
import { isFuture } from "date-fns";
import { AffiliateService } from "./affiliate";
import { PinVerificationType } from "@prisma/client";

@Service()
export class AuthService {
  constructor(
    private readonly user: User,
    private readonly mail: Mailer,
    private readonly affiliation: AffiliateService
  ) {}

  public async signUp(payload: ISignUpPayload) {
    const emailExists = await this.user.findByEmail(payload.email);
    if (emailExists) {
      throw new ApiError(Message.emailAlreadyRegistered, 409);
    }

    const phoneExists = await this.user.findByPhoneNumber(payload.phone);
    if (phoneExists) {
      throw new ApiError(Message.phoneAlreadyRegistered, 409);
    }

    const usernameExist = await this.user.findByUsername(
      payload.username || payload.firstName
    );
    if (usernameExist) {
      throw new ApiError(Message.usernameAlreadyExists, 409);
    }

    const passwordHash = await password.hash(payload.password);
    const otpCode = generateOTP({ type: "num", length: 6 });

    const referrer = await this.user.findOne({
      referralCode: payload.userReferralCode,
    });
    if (!referrer) {
      payload.userReferralCode = undefined;
    }
    const user = await this.user.create({
      ...payload,
      password: passwordHash,
    });

    if (referrer) {
      await this.affiliation.createAffiliate(
        { referrerId: referrer.id, userId: user.id },
        false
      );
    }

    await this.user.createOrUpdateVerificationCode(
      user,
      PinVerificationType.EMAIL,
      otpCode,
      true
    );

    await this._sendEmailConfirmation(user, otpCode);

    return {
      token: await jwt.sign({ id: user.id }),
    };
  }

  public async adminSignIn(payload: ISignInPayload) {
    const user = await this.user.findByEmail(payload.email);
    if (!user) {
      throw new ApiError(Message.userNotFound, 401);
    }

    if (!user.isEmailVerified) {
      throw new ApiError(Message.userSuspended, 401);
    }

    if (!user.email) {
      throw new ApiError(Message.emailNotVerified, 403);
    }

    const isValidPassword = await password.verify(
      payload.password,
      user.password
    );
    if (!isValidPassword) {
      throw new ApiError(Message.invalidPassword, 400);
    }

    return {
      token: await jwt.sign({ id: user.id }),
    };
  }

  public async signIn(payload: ISignInPayload) {
    const user = await this.user.findByEmail(payload.email);
    if (!user) {
      throw new ApiError(Message.userNotFound, 401);
    }

    const isValidPassword = await password.verify(
      payload.password,
      user.password
    );
    if (!isValidPassword) {
      throw new ApiError(Message.invalidPassword, 400);
    }

    await this.user.updateUser({ id: user.id }, { lastLogin: new Date() });

    return {
      token: await jwt.sign({ id: user.id }),
    };
  }

  public async requestForgotPassword(payload: IRequestForgotPassword) {
    const user = await this.user.findByEmail(payload.email);
    if (!user) {
      throw new ApiError(Message.userNotFound, 404);
    }

    const otpCode = generateOTP({ type: "num", length: 6 });
    await this.user.createOrUpdateVerificationCode(
      user,
      PinVerificationType.FORGOT_PASSWORD,
      otpCode,
      true
    );

    const options: EmailOptions = {
      recipient: user.email,
      context: {
        name: user.firstName,
        activationCode: parseInt(otpCode),
      },
    };

    await this.mail.sendEmail(EmailType.USER_FORGET_PASSWORD, options);

    return { otpCode };
  }

  public async resetForgotPassword(payload: IForgotPasswordReset) {
    const user = await this.user.findByEmail(payload.email);

    if (!user) {
      throw new ApiError(Message.userNotFound, 404);
    }

    const codeDetails = await this.user.findVerificationCode(
      user,
      PinVerificationType.PASSWORD
    );

    if (!isFuture(codeDetails?.validity || new Date())) {
      throw new ApiError(Message.otpExpired, 400);
    }

    if (!codeDetails?.valid) {
      throw new ApiError(Message.otpUsed, 400);
    }

    if (codeDetails?.code !== payload.otpCode) {
      throw new ApiError(Message.invalidOtp, 400);
    }

    if (await password.verify(payload.password, user.password)) {
      throw new ApiError(Message.passwordIsSameAsOld, 400);
    }

    const passwordHash = await password.hash(payload.password);
    await this.user.updateUser(
      { id: user.id },
      {
        password: passwordHash,
      }
    );
    await this.user.createOrUpdateVerificationCode(
      user,
      PinVerificationType.FORGOT_PASSWORD,
      codeDetails?.code,
      false
    );

    const options: EmailOptions = {
      recipient: user.email,
      context: {
        name: user.firstName,
      },
    };

    await this.mail.sendEmail(EmailType.PASSWORD_CHANGE, options);

    return;
  }

  public async changePassword(payload: IChangePassword) {
    const user = await this.user.findByEmail(payload.email);

    if (!user) {
      throw new ApiError(Message.userNotFound, 404);
    }

    if (await password.verify(payload.newPassword, user.password)) {
      throw new ApiError(Message.passwordIsSameAsOld, 400);
    }

    if (!(await password.verify(payload.oldPassword, user.password))) {
      throw new ApiError(Message.oldPasswordNotCorrect, 400);
    }

    const passwordHash = await password.hash(payload.newPassword);
    await this.user.updateUser(
      { id: user.id },
      {
        password: passwordHash,
      }
    );

    const options: EmailOptions = {
      recipient: user.email,
      context: {
        name: user.firstName,
      },
    };

    await this.mail.sendEmail(EmailType.PASSWORD_CHANGE, options);

    return;
  }

  public async requestEmailConfirmation(
    payload: IRequestEmailConfirmationPayload
  ) {
    const user = await this.user.findByEmail(payload.email);

    if (!user) {
      throw new ApiError("Email has not been registered", 404);
    }
    if (user.isEmailVerified) {
      throw new ApiError(Message.emailAlreadyConfirmed, 409);
    }

    await this._sendEmailConfirmation(user);
  }

  public async completeEmailConfirmation(payload: IConfirmEmailPayload) {
    const user = await this.user.findByEmail(payload.email);

    if (!user) {
      throw new ApiError(Message.userNotFound, 404);
    }
    if (user.isEmailVerified) {
      throw new ApiError(Message.emailAlreadyConfirmed, 409);
    }

    const codeDetails = await this.user.findVerificationCode(
      user,
      PinVerificationType.EMAIL
    );

    if (!isFuture(codeDetails?.validity || new Date())) {
      throw new ApiError(Message.otpExpired, 400);
    }

    if (!codeDetails?.valid) {
      throw new ApiError(Message.otpUsed, 400);
    }

    if (codeDetails?.code !== payload.otpCode) {
      throw new ApiError(Message.invalidOtp, 400);
    }

    await this.user.updateUser(
      { id: user.id },
      {
        isEmailVerified: true,
      }
    );

    await this.user.createOrUpdateVerificationCode(
      user,
      PinVerificationType.EMAIL,
      codeDetails?.code,
      false
    );
  }

  private async _sendEmailConfirmation(user: IUser, otpCode?: string | null) {
    if (!otpCode) {
      otpCode = generateOTP({ type: "num", length: 6 });
      await this.user.createOrUpdateVerificationCode(
        user,
        PinVerificationType.EMAIL,
        otpCode,
        true
      );
    }

    const options: EmailOptions = {
      recipient: user.email,
      context: {
        name: user.firstName,
        activationCode: parseInt(otpCode),
      },
    };

    await this.mail.sendEmail(EmailType.ACCOUNT_CREATION, options);
  }

  public async contactUsForm(payload: IContactUsPayload) {
    const options: EmailOptions = {
      recipient: "info@halal-dollarsapp.co",
      context: {
        name: payload.name.split(" ")[0],
        message: payload.message,
        email: payload.email,
      },
    };

    await this.mail.sendEmail(EmailType.CONTACT_US, options);
  }
}
