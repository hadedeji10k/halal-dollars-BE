import { FastifyReply, FastifyRequest } from "fastify";
import { Container } from "typedi";
import { environment } from "../../config";
import { User } from "../../database/repository";
import { IUser } from "../../interfaces";
import { ApiError, Message, password, response } from "../../utils";

interface IOptions {
  optional?: boolean;
}

const user = Container.get(User);

function userAuth(options: IOptions = {}) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const data: { id: string } = await request.jwtVerify();
      console.log("Id>>>", data.id);
      const userId = String(data.id);
      const userExists = await user.findById(userId);
      if (!userExists) {
        throw new ApiError(Message.userNotFound, 404);
      }

      request.user = userExists;
    } catch (e: any) {
      if (!options.optional) {
        return response.error(reply, {
          statusCode: e?.statusCode || 500,
          message: (e as Error)?.message,
        });
      }
    }
  };
}

function ensureEmailConfirmed() {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = request.user as IUser;
      if (!user) {
        throw new ApiError(Message.authenticationRequired, 401);
      }

      if (!user.isEmailVerified) {
        throw new ApiError(Message.emailConfirmationRequired, 403);
      }
    } catch (e: any) {
      return response.error(reply, {
        statusCode: e?.statusCode || 500,
        message: (e as Error)?.message,
      });
    }
  };
}

function ensurePhoneConfirmed() {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = request.user as IUser;
      if (!user) {
        throw new ApiError(Message.authenticationRequired, 401);
      }

      if (!user.phone) {
        throw new ApiError(Message.phoneConfirmationRequired, 403);
      }
    } catch (e: any) {
      return response.error(reply, {
        statusCode: e?.statusCode || 500,
        message: (e as Error)?.message,
      });
    }
  };
}

function ensureUserNotSuspended() {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = request.user as IUser;
      if (!user) {
        throw new ApiError(Message.authenticationRequired, 401);
      }

      if (user.isSuspended) {
        throw new ApiError(Message.userSuspended, 401);
      }
    } catch (e: any) {
      console.log("Error>>>>", JSON.stringify(e));

      return response.error(reply, {
        statusCode: e?.statusCode || 500,
        message: (e as Error)?.message,
      });
    }
  };
}

function isAdmin(options: IOptions = {}) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = request.user as IUser;
      if (!user) {
        throw new ApiError(Message.authenticationRequired, 401);
      }

      if (user.role && user.role !== "ADMIN") {
        throw new ApiError(Message.notAuthorized, 401);
      }
    } catch (e: any) {
      if (!options.optional) {
        return response.error(reply, {
          statusCode: e?.statusCode || 500,
          message: (e as Error)?.message,
        });
      }
    }
  };
}

function clientAuth() {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    if (environment.appStage === "PROD") {
      try {
        const clientType = <string>request.headers["x-client-type"];
        const accessToken = Buffer.from(
          <string>request.headers["x-access-token"] || "",
          "base64"
        ).toString("utf8");

        if (!clientType || !accessToken) {
          throw new ApiError(Message.notAuthorized, 401);
        }

        if (!environment.clients.includes(clientType.toLowerCase())) {
          throw new ApiError(Message.notAuthorized, 401);
        }

        // we currently have mobile and local clients only
        const platformAccessToken =
          clientType === "web"
            ? environment.webAccessToken
            : clientType === "local"
            ? environment.localAccessToken
            : "";
        let authenticated = await password.verify(
          platformAccessToken,
          accessToken
        );

        if (!authenticated) {
          throw new ApiError(Message.notAuthorized, 401);
        }
      } catch (e: any) {
        return response.error(reply, {
          statusCode: 401,
          message: Message.notAuthorized,
        });
      }
    }
  };
}

export const auth = {
  user: userAuth,
  isAdmin,
  ensureEmailConfirmed,
  ensurePhoneConfirmed,
  ensureUserNotSuspended,
  clientAuth,
};
