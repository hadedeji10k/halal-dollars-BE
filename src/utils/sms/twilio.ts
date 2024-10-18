import twilio, { Twilio as TwilioClient } from "twilio";
import { environment } from "../../config/environment";

export class Twilio {
  private twilioClient: TwilioClient;

  constructor() {
    this.twilioClient = twilio(environment.twilio.accountSid, environment.twilio.authToken);
  }

  async sendSms(body: string, to: string) {
    try {
      return await this.twilioClient.messages.create({ body, to, from: environment.twilio.phoneNumber });
    } catch (e) {
      console.log("Error sending message: ", e);
    }
  }
}
