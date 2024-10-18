import { FastifyInstance } from "fastify";
import { admin } from "./admin";
import { auth } from "./auth";
import { user } from "./user";
import { beneficiary } from "./beneficiary";
import { totalReach } from "./totalReach";
import { affiliate } from "./affiliate";
import { transaction } from "./transaction";

export async function routes(app: FastifyInstance) {
  app.get("/", () => ({ message: "Hmmm... Halal-dollars API server" }));

  app.register(admin, { prefix: "admin" });
  app.register(auth, { prefix: "auth" });
  app.register(user, { prefix: "user" });
  app.register(beneficiary, { prefix: "beneficiary" });
  app.register(totalReach, { prefix: "total-reach" });
  app.register(affiliate, { prefix: "affiliate" });
  app.register(transaction, { prefix: "transaction" });
}
