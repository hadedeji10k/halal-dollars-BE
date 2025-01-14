import fastify from "fastify";
import cors from "@fastify/cors";
import { fastifyJwt } from "@fastify/jwt";
import { routes } from "./api/routes";
import { environment } from "./config";
import ajvErrors from "ajv-errors";
import { Message, response, Sentry } from "./utils";
import { auth } from "./api/middleware";

export const app = fastify({
  logger: true,
  ignoreTrailingSlash: true,
  ajv: {
    customOptions: { allErrors: true, strictRequired: true },
    plugins: [ajvErrors],
  },
});

app.register(cors, { origin: "*" });
app.register(routes);
app.register(fastifyJwt, { secret: Buffer.from(environment.secrets.jwt) });

app.addHook("onRequest", auth.clientAuth());

app.setErrorHandler((error, _request, reply) => {
  console.log(error);
  Sentry.captureException(error);

  if (error.validation && error.validation[0]) {
    let validationMessage = error.validation.map((item) => item.message);
    error.message = validationMessage.join(" | ");
  }

  return response.error(reply, {
    message: error.statusCode
      ? error.statusCode === 500
        ? Message.internalServerError
        : error.message
      : Message.internalServerError,
    statusCode: error.statusCode,
  });
});
