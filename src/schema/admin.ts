export const setConfigSchema = {
  type: "array",
  items: {
    type: "object",
    required: ["key", "value"],
    properties: {
      key: { type: "string" },
      value: { type: "string" },
    },
    errorMessage: {
      required: {
        key: "config key is required",
        value: "config value is required",
      },
    },
  },
};
