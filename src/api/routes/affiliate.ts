import { FastifyInstance } from "fastify";
import { Container } from "typedi";
import { AffiliateController } from "../controllers";
import { auth } from "../middleware";

export async function affiliate(app: FastifyInstance) {
  const controller = Container.get(AffiliateController);

  app.post(
    "/generate",
    {
      onRequest: [auth.user()],
    },
    controller.generateAffiliateCode.bind(controller)
  );
  app.get(
    "/",
    {
      onRequest: [auth.user()],
    },
    controller.getUserAffiliates.bind(controller)
  );
  app.get(
    "/transactions",
    {
      onRequest: [auth.user()],
    },
    controller.getUserAffiliateTransactions.bind(controller)
  );
  app.get(
    "/total",
    {
      onRequest: [auth.user()],
    },
    controller.getTotalUserAffiliates.bind(controller)
  );
}
