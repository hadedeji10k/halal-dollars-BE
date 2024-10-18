import { Container } from "typedi";
import { FastifyInstance } from "fastify";
import {
  changePasswordSchema,
  completeEmailConfirmationSchema,
  contactUsSchema,
  requestEmailConfirmationSchema,
  requestForgotPasswordSchema,
  resetForgotPasswordSchema,
  signInSchema,
  signUpSchema,
} from "../../schema";
import { AuthController } from "../controllers";

export async function auth(app: FastifyInstance) {
  const controller = Container.get(AuthController);

  app.post(
    "/signup",
    { schema: { body: signUpSchema } },
    controller.signUp.bind(controller),
  );
  app.post(
    "/signin",
    { schema: { body: signInSchema } },
    controller.signIn.bind(controller),
  );
  app.post(
    "/password/reset",
    { schema: { body: requestForgotPasswordSchema } },
    controller.requestForgotPassword.bind(controller),
  );
  app.put(
    "/password/reset",
    { schema: { body: resetForgotPasswordSchema } },
    controller.resetForgotPassword.bind(controller),
  );
  app.put(
    "/password/change",
    { schema: { body: changePasswordSchema } },
    controller.changePassword.bind(controller),
  );
  app.post(
    "/confirmation/request/email",
    { schema: { body: requestEmailConfirmationSchema } },
    controller.requestEmailConfirmation.bind(controller),
  );
  app.post(
    "/confirmation/email",
    { schema: { body: completeEmailConfirmationSchema } },
    controller.completeEmailConfirmation.bind(controller),
  );
  app.post(
    "/contact-us",
    { schema: { body: contactUsSchema } },
    controller.contactUs.bind(controller),
  );
}
