import { environment } from "../config/environment";
const Sentry = require("@sentry/node");
const Integrations = require("@sentry/integrations");

Sentry.init({
  dsn: environment.sentry.dsn,
  tracesSampleRate: 1.0,
  normalizeDepth: 11,
  integrations: [new Integrations.RewriteFrames({ root: __dirname }), new Integrations.ExtraErrorData({ depth: 10 })],
});

export { Sentry };
