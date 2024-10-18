export interface ITransferToBank {
  reason?: string;
  amount: number;
  beneficiaryId: string;
  transactionPin: string;
  from: string;
  fromId: string;
}

export interface ITransferToBankPayload {
  source?: string;
  reason?: string;
  recipientCode: string;
  amount: number;
  reference: string;
}

export interface ICreateRecipient {
  type?: string;
  name: string;
  account_number: string;
  bank_code: string;
  currency?: string;
}

export interface IResolveAccountDetails {
  account_number: string;
  bank_code: string;
}
