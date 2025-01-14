import { IncomingHttpHeaders } from "http";
import { Method, AxiosInstance } from "axios";
import { HTTPMethods } from "./types";
import { ApiError } from "../error";
import { Message } from "../message";

export const methods: HTTPMethods = {
  GET: "GET",
  PUT: "PUT",
  PATCH: "PATCH",
  POST: "POST",
  DELETE: "DELETE",
};

export default class APIGateway {
  public HTTPMethods: HTTPMethods = methods;
  public axiosInstance: AxiosInstance;

  public constructor(axiosIns: AxiosInstance) {
    this.axiosInstance = axiosIns;
  }

  public request(
    method: Method = this.HTTPMethods.GET,
    url: string,
    params?: Record<string, unknown> | null,
    data?: Record<string, unknown> | string,
    extraHeaders?: IncomingHttpHeaders
  ): Promise<any> {
    let headers = {};

    console.log(`${method}: ${url}`);
    if (extraHeaders) {
      headers = { ...headers, ...extraHeaders };
    }

    return this.axiosInstance
      .request({
        method,
        url,
        params,
        data,
        headers,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("Err>>", err?.code, err?.response?.status);
        const msg =
          err?.response?.status === 422 || err?.code === "ERR_BAD_REQUEST"
            ? Message.wrongParameters
            : Message.internalServerError;
        throw new ApiError(msg, err?.response?.status || 500);
      });
  }
}
