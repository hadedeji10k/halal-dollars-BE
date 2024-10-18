import { FastifyInstance } from "fastify";
import { Container } from "typedi";
import { completeProfileSchema, resetForgotTransactionPinSchema, setUserPinSchema, updateUserPasswordSchema, updateUserPinSchema } from "../../schema";
import { UserController } from "../controllers";
import { auth } from "../middleware";
import {
  requestPhoneNumberVerificationSchema,
  setProfilePictureSchema,
  updateUserAddressSchema,
  updateUserSchema,
  verifyPhoneNumberSchema,
} from "../../schema";

export async function user(app: FastifyInstance) {
  const controller = Container.get(UserController);

  app.get(
    "/me",
    { onRequest: [auth.user(), auth.ensureUserNotSuspended(), auth.ensureEmailConfirmed()] },
    controller.getCurrentUser.bind(controller)
  );
  app.get(
    "/dashboard",
    { onRequest: [auth.user(), auth.ensureUserNotSuspended(), auth.ensureEmailConfirmed()] },
    controller.getUserDashboard.bind(controller)
  );
  app.put(
    "/complete",
    {
      schema: { body: completeProfileSchema },
      onRequest: [auth.user(), auth.ensureUserNotSuspended(), auth.ensureEmailConfirmed()],
    },
    controller.completeProfile.bind(controller)
  );
  app.put(
    "/avatar",
    {
      schema: { body: setProfilePictureSchema },
      onRequest: [auth.user(), auth.ensureUserNotSuspended(), auth.ensureEmailConfirmed()],
    },
    controller.setProfilePicture.bind(controller)
  );
  app.post(
    "/phone",
    {
      onRequest: [auth.user(), auth.ensureUserNotSuspended(), auth.ensureEmailConfirmed()],
    },
    controller.requestPhoneNumberVerification.bind(controller)
  );
  app.put(
    "/phone",
    {
      schema: { body: requestPhoneNumberVerificationSchema },
    },
    controller.resendPhoneNumberOtp.bind(controller)
  );
  app.put(
    "/phone/verify",
    {
      schema: { body: verifyPhoneNumberSchema },
    },
    controller.verifyPhoneNumber.bind(controller)
  );
  // app.put(
  //   "/address",
  //   {
  //     schema: { body: updateUserAddressSchema },
  //     onRequest: [auth.user(), auth.ensureUserNotSuspended(), auth.ensureEmailConfirmed()],
  //   },
  //   controller.updateUserAddress.bind(controller)
  // );
  app.put(
    "/",
    {
      schema: { body: updateUserSchema },
      onRequest: [auth.user(), auth.ensureUserNotSuspended(), auth.ensureEmailConfirmed()],
    },
    controller.updateUser.bind(controller)
  );
  app.put(
    "/password",
    {
      schema: { body: updateUserPasswordSchema },
      onRequest: [auth.user(), auth.ensureUserNotSuspended(), auth.ensureEmailConfirmed()],
    },
    controller.updateUserPassword.bind(controller)
  );
  app.post(
    "/set-pin",
    {
      schema: { body: setUserPinSchema },
      onRequest: [auth.user(), auth.ensureUserNotSuspended(), auth.ensureEmailConfirmed()],
    },
    controller.setUserPin.bind(controller)
  );
  app.put(
    "/update-pin",
    {
      schema: { body: updateUserPinSchema },
      onRequest: [auth.user(), auth.ensureUserNotSuspended(), auth.ensureEmailConfirmed()],
    },
    controller.updateUserPin.bind(controller)
  );
  app.post(
    "/pin/reset",
    {
      onRequest: [auth.user(), auth.ensureUserNotSuspended(), auth.ensureEmailConfirmed()],
    },
    controller.requestForgotTransactionPin.bind(controller)
  );
  app.put(
    "/pin/reset",
    {
      schema: { body: resetForgotTransactionPinSchema },
      onRequest: [auth.user(), auth.ensureUserNotSuspended(), auth.ensureEmailConfirmed()],
    },
    controller.resetForgotTransactionPin.bind(controller)
  );
}
