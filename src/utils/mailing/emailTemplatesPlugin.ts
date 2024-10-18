import { Service } from "typedi";
import {
  accountCreationTemplate,
  passwordChangeTemplate,
  userForgetPasswordTemplate,
  contactUsTemplate,
  userForgetPinTemplate,
  pinChangeTemplate
} from "./emailTemplates";
import { EmailOptions, EmailTemplate, EmailType } from "../../interfaces";
import { environment } from "../../config";

@Service()
export class EmailTemplatesPlugin {
  private static getHTMLTemplate(
    emailType: EmailType,
    options: EmailOptions,
  ): { html: string; subject: string } {
    return {
      [EmailType.ACCOUNT_CREATION]: {
        html: accountCreationTemplate(options),
        subject: "Welcome to Halal-dollars ✅",
      },
      [EmailType.USER_FORGET_PIN]: {
        html: userForgetPinTemplate(options),
        subject: "Let's help you retrieve your pin",
      },
      [EmailType.PIN_CHANGE]: {
        html: pinChangeTemplate(options),
        subject: "Transaction Pin Changed",
      },
      [EmailType.USER_FORGET_PASSWORD]: {
        html: userForgetPasswordTemplate(options),
        subject: "Let's help you get back into Halal-dollars",
      },
      [EmailType.PASSWORD_CHANGE]: {
        html: passwordChangeTemplate(options),
        subject: "Password Changed",
      },
      [EmailType.CONTACT_US]: {
        html: contactUsTemplate(options),
        subject: "Contact Us Form",
      },
    }[emailType];
  }

  generateTemplate(emailType: EmailType, options: EmailOptions) {
    const template = EmailTemplatesPlugin.getHTMLTemplate(emailType, options);

    return {
      from: {
        email: environment.mail.from || "support@halal-dollars.com",
      },
      to: options.recipient,
      subject: template.subject,
      text: template.subject,
      html: template.html,
    } as EmailTemplate;
  }
}
