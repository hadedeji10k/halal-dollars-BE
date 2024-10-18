import mail from "@sendgrid/mail";
import { Service } from "typedi";
import { environment } from "../../config";
import { EmailOptions, EmailType } from "../../interfaces";
import { EmailTemplatesPlugin } from "./emailTemplatesPlugin";

@Service()
export class Mailer {
  constructor(private readonly emailPlugin: EmailTemplatesPlugin) {}

  async sendEmail(emailType: EmailType, options: EmailOptions) {
    mail.setApiKey(environment.mail.apiKey);
    try {
      const emailOptions = this.emailPlugin.generateTemplate(
        emailType,
        options,
      );
      return await mail.send(emailOptions);
    } catch (error) {
      console.log("Error sending email >>", error);
    }
  }
}
