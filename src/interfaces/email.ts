export interface EmailOptions {
  from?: {
    senderEmail?: string;
    senderName?: string;
  };
  recipient: string;
  context: {
    name?: string;
    amount?: number;
    activationCode?: number;
    message?: string;
    email?: string;
  };
}

export interface EmailTemplate {
  from: {
    email: string;
    name: string;
  };
  to: string;
  subject: string;
  text?: string;
  html: string;
}

export enum EmailType {
  ACCOUNT_CREATION,
  USER_FORGET_PASSWORD,
  PASSWORD_CHANGE,
  USER_FORGET_PIN,
  PIN_CHANGE,
  CONTACT_US
}
