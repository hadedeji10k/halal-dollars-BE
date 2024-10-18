import { FastifyInstance } from "fastify";
import { Container } from "typedi";
import { BeneficiaryController } from "../controllers";
import { auth } from "../middleware";
import { createBeneficiarySchema } from "../../schema";

export async function beneficiary(app: FastifyInstance) {
  const controller = Container.get(BeneficiaryController);

  app.post(
    "/create",
    {
      schema: { body: createBeneficiarySchema },
      onRequest: [auth.user()],
    },
    controller.createBeneficiary.bind(controller)
  );
  app.get(
    "/",
    {
      onRequest: [auth.user()],
    },
    controller.getUserBeneficiaries.bind(controller)
  );
  app.get(
    "/:id",
    {
      onRequest: [auth.user()],
    },
    controller.getUserBeneficiary.bind(controller)
  );
  app.delete(
    "/:id",
    {
      onRequest: [auth.user()],
    },
    controller.deleteUserBeneficiary.bind(controller)
  );
}
