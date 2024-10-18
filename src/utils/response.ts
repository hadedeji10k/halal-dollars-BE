import { FastifyReply } from "fastify";

function success(
  reply: FastifyReply,
  { statusCode, message, data }: {
    statusCode?: number;
    message: string;
    data?: any;
  },
) {
  return reply
    .code(statusCode || 200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({ success: true, message, data });
}

function error(
  reply: FastifyReply,
  { statusCode, message }: { statusCode?: number; message: string },
) {
  return reply
    .code(statusCode || 500)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({ success: false, message });
}

export const response = { success, error };
