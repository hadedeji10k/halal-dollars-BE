import { FastifyInstance } from "fastify";
import { Container } from "typedi";
import { FutureWealthController } from "../controllers";
import { auth } from "../middleware";

export async function futureWealth(app: FastifyInstance) {
  const controller = Container.get(FutureWealthController);

  app.get(
    "/",
    {
      onRequest: [auth.user()],
    },
    controller.getUserFutureWealths.bind(controller)
  );
  app.get(
    "/:id",
    {
      onRequest: [auth.user()],
    },
    controller.getUserFutureWealth.bind(controller)
  );

  // subsidiaries
  app.post(
    "/subsidiary",
    {
      onRequest: [auth.user()],
    },
    controller.createSubsidiary.bind(controller)
  );
  app.put(
    "/subsidiary/:id",
    {
      onRequest: [auth.user()],
    },
    controller.updateSubsidiary.bind(controller)
  );
  app.get(
    "/subsidiary",
    {
      onRequest: [auth.user()],
    },
    controller.getUserSubsidiaries.bind(controller)
  );
  app.get(
    "/subsidiary/:id",
    {
      onRequest: [auth.user()],
    },
    controller.getUserSubsidiary.bind(controller)
  );
}
