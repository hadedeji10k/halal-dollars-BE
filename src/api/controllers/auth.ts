import { Service } from "typedi";
import { AuthService } from "../../services";
import { Message, response } from "../../utils";
import { FastifyReply, FastifyRequest } from "fastify";
import {
  IChangePassword,
  IConfirmEmailPayload,
  IContactUsPayload,
  IForgotPasswordReset,
  IRequestEmailConfirmationPayload,
  IRequestForgotPassword,
  ISignInPayload,
  ISignUpPayload,
} from "../../interfaces";

@Service()
export class AuthController {
  public constructor(private readonly authService: AuthService) { }

  public async signUp(request: FastifyRequest, reply: FastifyReply) {
    const { body }: { [key: string]: any } = request;

    const payload: ISignUpPayload = {
      email: body.email.toLowerCase(),
      phone: body.phone,
      firstName: body.firstName,
      username: body.username,
      lastName: body.lastName,
      password: body.password,
      countryCode: body.countryCode,
      userReferralCode: body.userReferralCode,
    };

    const data = await this.authService.signUp(payload);
    return response.success(reply, { message: Message.signUpSuccessful, data });
  }

  public async signIn(request: FastifyRequest, reply: FastifyReply) {
    const { body }: { [key: string]: any } = request;

    const payload: ISignInPayload = {
      email: body.email,
      password: body.password,
    };

    const data = await this.authService.signIn(payload);
    return response.success(reply, { message: Message.signInSuccessful, data });
  }

  public async requestForgotPassword(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    const { body }: { [key: string]: any } = request;

    const payload: IRequestForgotPassword = {
      email: body.email,
    };

    const data = await this.authService.requestForgotPassword(payload);
    return response.success(reply, { message: Message.passwordOtpSent, data });
  }

  public async resetForgotPassword(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    const { body }: { [key: string]: any } = request;

    const payload: IForgotPasswordReset = {
      email: body.email,
      otpCode: body.otpCode,
      password: body.password,
    };

    const data = await this.authService.resetForgotPassword(payload);
    return response.success(reply, {
      message: Message.passwordResetSuccessfully,
      data,
    });
  }

  public async changePassword(request: FastifyRequest, reply: FastifyReply) {
    const { body }: { [key: string]: any } = request;

    const payload: IChangePassword = {
      email: body.email,
      oldPassword: body.oldPassword,
      newPassword: body.newPassword,
    };

    const data = await this.authService.changePassword(payload);
    return response.success(reply, { message: Message.passwordChanged, data });
  }

  public async requestEmailConfirmation(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    const { body }: { [key: string]: any } = request;

    const payload: IRequestEmailConfirmationPayload = {
      email: body.email,
    };

    const data = await this.authService.requestEmailConfirmation(payload);
    return response.success(reply, {
      message: Message.emailConfirmationSent,
      data,
    });
  }

  public async completeEmailConfirmation(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    const { body }: { [key: string]: any } = request;

    const payload: IConfirmEmailPayload = {
      otpCode: body.otpCode,
      email: body.email,
    };

    const data = await this.authService.completeEmailConfirmation(payload);
    return response.success(reply, { message: Message.emailConfirmed, data });
  }

  public async contactUs(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    const { body }: { [key: string]: any } = request;

    const payload: IContactUsPayload = {
      email: body.email,
      name: body.name,
      message: body.message,
    };

    const data = await this.authService.contactUsForm(payload);
    return response.success(reply, { message: Message.emailConfirmed, data });
  }
}
