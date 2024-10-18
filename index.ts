import "reflect-metadata";

import { app } from "./src/app";
import { environment } from "./src/config";
import { Sentry } from "./src/utils";

app.listen({ port: environment.port, host: environment.host });

app.server.on("listening", () => {
  console.log(`🚀 Server is running on port ${environment.port}`);
});

app.server.on("error", (error: Error & { code: string; syscall: string }) => {
  Sentry.captureException(error);

  if (error.syscall !== "listen") {
    throw error;
  }

  switch (error.code) {
    case "EADDRINUSE":
      console.log(`😔 Port ${environment.port} is already in use`);
      process.exit(1);
    case "EACCES":
      console.log(`😔 Not enough permission to use port ${environment.port} `);
      process.exit(1);
    default:
      throw error;
  }
});
