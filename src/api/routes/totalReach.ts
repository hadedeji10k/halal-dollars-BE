import { FastifyInstance } from "fastify";
import { Container } from "typedi";
import { TotalReachController } from "../controllers";
import { auth } from "../middleware";

export async function totalReach(app: FastifyInstance) {
  const controller = Container.get(TotalReachController);

  app.get(
    "/",
    {
      onRequest: [auth.user()],
    },
    controller.getUserTotalReach.bind(controller)
  );
}
