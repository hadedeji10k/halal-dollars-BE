const defaultTermiiApiKey =
  "TLaO38rSRZEKlt6RHn79c15nEEGWgHECGBDuUglc7SpjRWE8xx9kLO2QvJz9Jr";
const defaultTermiiBaseUrl = "https://api.ng.termii.com";
const defaultPaystackBaseUrl = "https://api.paystack.co";

export interface IEnvironment {
  appStage: string;
  port: number;
  host: string;
  isTestEnv: boolean;
  secrets: {
    jwt: string;
  };
  mail: {
    apiKey: string;
    from: string;
  };
  termii: {
    baseUrl: string;
    apiKey: string;
  };
  clients: string[];
  twilio: {
    accountSid: string;
    authToken: string;
    phoneNumber: string;
  };
  sentry: {
    dsn: string;
  };
  webAccessToken: string;
  localAccessToken: string;
  paystack: {
    secretKey: string;
    baseUrl: string;
  };
}

export const environment: IEnvironment = {
  appStage: process.env.APP_STAGE || "DEV", // "DEV" | "PROD" | "TEST"
  port: Number(process.env.PORT) || 6006,
  host: process.env.HOST || "127.0.0.1",
  isTestEnv: process.env.IS_TEST_ENV === "true" || false,
  secrets: {
    jwt:
      process.env.JWT_SECRET ||
      ".VS'-uck4VOg4xAKyN?nett_gugVtzHn;Tol.m:k~F850M(5$7/tK4{nJ:)SXOi",
  },
  mail: {
    apiKey: process.env.EMAIL_API_KEY || "",
    from: process.env.EMAIL_FROM || "",
  },
  termii: {
    baseUrl: process.env.TERMII_BASE_URL || defaultTermiiBaseUrl,
    apiKey: process.env.TERMII_API_KEY || defaultTermiiApiKey,
  },
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID || "",
    authToken: process.env.TWILIO_AUTH_TOKEN || "",
    phoneNumber: process.env.TWILIO_PHONE_NUMBER || "",
  },
  sentry: {
    dsn: process.env.SENTRY_DSN || "",
  },
  clients: ["web", "local"],
  localAccessToken: process.env.LOCAL_ACCESS_TOKEN || "",
  webAccessToken: process.env.WEB_ACCESS_TOKEN || "",
  paystack: {
    secretKey: process.env.PAYSTACK_SECRET_KEY || "",
    baseUrl: defaultPaystackBaseUrl,
  },
};
