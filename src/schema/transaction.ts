export const transferToBankSchema = {
  type: "object",
  additionalProperties: false,
  required: ["from", "amount", "beneficiaryId", "transactionPin"],
  properties: {
    amount: { type: "number" },
    beneficiaryId: { type: "string" },
    reason: { type: "string" },
    transactionPin: { type: "string" },
    from: {
      type: "string",
      enum: ["mudaarabah", "future_wealth", "affiliation"],
    },
  },
  errorMessage: {
    required: {
      from: "From is required",
      amount: "Amount is required",
      beneficiaryId: "Beneficiary ID is required",
      transactionPin: "Transaction pin is required",
    },
  },
};
