import { FastifyInstance } from "fastify";
import { Container } from "typedi";
import { TransactionController } from "../controllers";
import { auth } from "../middleware";
import { transferToBankSchema } from "../../schema";

export async function transaction(app: FastifyInstance) {
  const controller = Container.get(TransactionController);

  app.post(
    "/transfer",
    {
      schema: { body: transferToBankSchema },
      onRequest: [auth.user()],
    },
    controller.transferToBank.bind(controller)
  );
  app.get(
    "/bank-details",
    {
      onRequest: [auth.user()],
    },
    controller.resolveBankAccount.bind(controller)
  );
  app.get(
    "/bank-list",
    {
      onRequest: [auth.user()],
    },
    controller.fetchBankList.bind(controller)
  );
}
