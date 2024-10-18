export const completeProfileSchema = {
  type: "object",
  additionalProperties: false,
  required: ["username"],
  properties: {
    username: { type: "string" },
  },
  errorMessage: {
    required: {
      username: "Username is required",
    },
  },
};

export const setProfilePictureSchema = {
  type: "object",
  additionalProperties: false,
  required: ["imageUrl"],
  properties: {
    imageUrl: { type: "string" },
  },
  errorMessage: {
    required: {
      imageUrl: "ImageURL is required",
    },
  },
};

export const requestPhoneNumberVerificationSchema = {
  type: "object",
  additionalProperties: false,
  required: ["phone", "email"],
  properties: {
    phone: { type: "string" },
    email: { type: "string" },
  },
  errorMessage: {
    required: {
      phone: "Phone number is required",
      email: "Email address is required",
    },
  },
};

export const verifyPhoneNumberSchema = {
  type: "object",
  additionalProperties: false,
  required: ["phoneOtpCode", "email"],
  properties: {
    email: { type: "string" },
    phoneOtpCode: { type: "string" },
  },
  errorMessage: {
    required: {
      email: "Email address is required",
      phoneOtpCode: "OTP code is required",
    },
  },
};

export const updateUserAddressSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    line1: { type: "string" },
    city: { type: "string" },
    state: { type: "string" },
    country: { type: "string" },
  },
};

export const updateUserSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    avatar: { type: "string" },
    username: { type: "string" },
  },
};

export const updateUserPasswordSchema = {
  type: "object",
  additionalProperties: false,
  required: ["oldPassword", "newPassword"],
  properties: {
    oldPassword: { type: "string" },
    newPassword: { type: "string" },
  },
  errorMessage: {
    required: {
      oldPassword: "Old Password is required",
      newPassword: "New Password is required",
    },
  },
};

export const setUserPinSchema = {
  type: "object",
  additionalProperties: false,
  required: ["pin"],
  properties: {
    pin: { type: "string" },
  },
  errorMessage: {
    required: {
      pin: "Pin is required",
    },
  },
};

export const updateUserPinSchema = {
  type: "object",
  additionalProperties: false,
  required: ["oldPin", "newPin"],
  properties: {
    oldPin: { type: "string" },
    newPin: { type: "string" },
  },
  errorMessage: {
    required: {
      oldPin: "Old Pin is required",
      newPin: "New Pin is required",
    },
  },
};

export const resetForgotTransactionPinSchema = {
  type: "object",
  additionalProperties: false,
  required: ["otpCode", "pin"],
  properties: {
    otpCode: { type: "string" },
    pin: { type: "string" },
  },
  errorMessage: {
    required: {
      otpCode: "OTP code is required",
      pin: "Pin is required",
    },
  },
};

export const makeUserAdminSchema = {
  type: "object",
  additionalProperties: false,
  required: ["email"],
  properties: {
    email: { type: "string" },
  },
  errorMessage: {
    required: {
      email: "Email address is required",
    },
  },
};

export const suspendUserSchema = {
  type: "object",
  additionalProperties: false,
  required: ["userId"],
  properties: {
    userId: { type: "string" },
  },
  errorMessage: {
    required: {
      userId: "User Id is required",
    },
  },
};

export const unsuspendUserSchema = {
  type: "object",
  additionalProperties: false,
  required: ["userId"],
  properties: {
    userId: { type: "string" },
  },
  errorMessage: {
    required: {
      userId: "User Id is required",
    },
  },
};

export const createBeneficiarySchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "alias",
    "accountNumber",
    "accountName",
    "bankName",
    "bankCode",
    "transactionPin",
  ],
  properties: {
    alias: { type: "string" },
    accountNumber: { type: "string" },
    accountName: { type: "string" },
    bankName: { type: "string" },
    bankCode: { type: "string" },
    amount: { type: "number" },
    transactionPin: { type: "string" },
  },
  errorMessage: {
    required: {
      alias: "Beneficiary alias is required",
      accountNumber: "Account number is required",
      accountName: "Account name is required",
      bankName: "Bank name is required",
      bankCode: "Bank code is required",
      transactionPin: "Transaction pin is required",
    },
  },
};
