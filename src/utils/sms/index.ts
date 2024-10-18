import { Twilio } from "./twilio";
import { Service } from "typedi";
import { Termii } from "./termii";

interface ISendData {
  body: string;
  to: string;
  service: "twilio" | "termii";
}

@Service()
export class Sms {
  async send({ body, service, to }: ISendData) {
    switch (service) {
      case "termii":
        const termii = new Termii();
        await termii.sendSms(body, to);
        break;
      case "twilio":
        const twilio = new Twilio();
        await twilio.sendSms(body, to);
        break;
      default:
        throw new Error(`Invalid SMS service ${service}`);
    }
  }
}
