import { app } from "../app";

function sign(payload: string | object | Buffer) {
  return new Promise((resolve, reject) => {
    app.jwt.sign(payload, (err, token) => {
      if (err) {
        reject(err);
      }

      resolve(token);
    });
  });
}

function verify(token: string) {
  return new Promise((resolve, reject) => {
    app.jwt.verify(token, (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
  });
}

export const jwt = { sign, verify };
