import { User } from "@prisma/client";

export interface ICreateUserPayload {
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  countryCode: string;
  email: string;
  password: string;
  userReferralCode?: string;
}

export interface ICompleteProfilePayload {
  username: string;
  interest?: string[];
}

export interface IUser extends User {}

export interface IRequestPhoneNumberVerification {
  email: string;
  phone: string;
}

export interface IVerifyUserPhoneNumber {
  email: string;
  phoneOtpCode: string;
}
export interface ISetProfilePicture {
  imageUrl: string;
}

export interface ISetTransactionPin {
  pin: string;
}

export interface IUpdateTransactionPin {
  oldPin: string;
  newPin: string;
}

export interface IForgotPinReset {
  otpCode: string;
  pin: string;
}

export interface IUpdatePassword {
  newPassword: string;
  oldPassword: string;
}

export interface IUpdateUser {
  avatar?: string;
  username?: string;
}

export interface IUpdateUserAddress {
  line1?: string;
  city?: string;
  state?: string;
  country?: string;
}

export interface IGetUser {
  id: string;
}

export interface ISuspendUser extends IGetUser {}
export interface IUnsuspendUser extends IGetUser {}

export interface IPagination {
  pageSize?: string;
  pageNumber?: string;
}

export interface ICreateBeneficiaryPayload {
  alias: string;
  accountNumber: string;
  accountName: string;
  bankCode: string;
  bankName: string;
  amount?: number;
  transactionPin: string;
  recipientCode?: string;
}

export interface ICreateAffiliate {
  referrerId: string;
  userId: string;
}
