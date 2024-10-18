import { Method } from "axios";

export interface HTTPMethods {
  GET: Method;
  PUT: Method;
  PATCH: Method;
  POST: Method;
  DELETE: Method;
}
