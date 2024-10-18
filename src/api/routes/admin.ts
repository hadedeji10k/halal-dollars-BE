import { FastifyInstance } from "fastify";
import { Container } from "typedi";
import {
  unsuspendUserSchema,
  makeUserAdminSchema,
  signInSchema,
  suspendUserSchema,
  setConfigSchema,
} from "../../schema";
import { AdminController, UserController } from "../controllers";
import { auth } from "../middleware";

export async function admin(app: FastifyInstance) {
  const adminController = Container.get(AdminController);
  const userController = Container.get(UserController);

  // ADMIN ROUTES
  app.post(
    "/signin",
    { schema: { body: signInSchema } },
    adminController.adminSignIn.bind(adminController)
  );

  // USER ENDPOINTS
  app.get(
    "/user",
    { onRequest: [auth.user(), auth.isAdmin()] },
    userController.getUsers.bind(userController)
  );
  app.put(
    "/user/suspend",
    {
      schema: { body: suspendUserSchema },
      onRequest: [auth.user(), auth.isAdmin()],
    },
    userController.suspendUser.bind(userController)
  );
  app.put(
    "/user/unsuspend",
    {
      schema: { body: unsuspendUserSchema },
      onRequest: [auth.user(), auth.isAdmin()],
    },
    userController.unsuspendUser.bind(userController)
  );

  // MAKE USER ADMIN
  app.put(
    "/make-user-admin",
    { schema: { body: makeUserAdminSchema }, onRequest: [auth.user()] },
    userController.makeUserAdmin.bind(userController)
  );
  app.put(
    "/make-admin-user",
    {
      schema: { body: makeUserAdminSchema },
      onRequest: [auth.user(), auth.isAdmin()],
    },
    userController.makeAdminUser.bind(userController)
  );

  app.get(
    "/config",
    { onRequest: [auth.user(), auth.isAdmin()] },
    adminController.getConfig.bind(adminController)
  );
  app.post(
    "/config",
    {
      schema: { body: setConfigSchema },
      onRequest: [auth.user(), auth.isAdmin()],
    },
    adminController.setConfig.bind(adminController)
  );
}
