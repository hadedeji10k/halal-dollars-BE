import { Service } from "typedi";
import { Beneficiary, Transaction, User } from "../database/repository";
import { PaystackTransactionService } from "./paystack";
import { ITransferToBank, IUser } from "../interfaces";
import { ApiError, Message } from "../utils";

@Service()
export class TransactionService {
  constructor(
    private readonly beneficiary: Beneficiary,
    private readonly transaction: Transaction,
    private readonly user: User,
    private readonly paystack: PaystackTransactionService
  ) {}

  public async fetchBankList() {
    return this.paystack.fetchBankList();
  }

  public async transferToBank(payload: ITransferToBank, user: IUser) {
    const beneficiary = await this.beneficiary.findOneBeneficiary({
      id: payload.beneficiaryId,
    });

    if (beneficiary) {
      // Compare user pin with the transaction pin
      if (payload.transactionPin !== user.transactionPin) {
        throw new ApiError(Message.invalidTransactionPin, 400);
      }

      if (!payload.from) {
        throw new ApiError(Message.noAccountSpecified, 400);
      }

      if (payload.from === "mudaarabah") {
        // const mudaarabah = await
        throw new ApiError(Message.insufficientBalance, 400);
      }

      const transaction = await this.transaction.create({
        type: "DEBIT",
        amount: payload.amount,
        title: "Withdraw to bank",
        description: payload.reason,
        status: "PENDING",
        beneficiary: {
          connect: { id: payload.beneficiaryId },
        },
        user: {
          connect: { id: user.id },
        },
      });
      await this.paystack.transferToBank({
        amount: payload.amount,
        recipientCode: beneficiary.recipientCode!,
        reference: transaction.id,
      });
    } else {
      throw new ApiError(Message.beneficiaryNotExists, 404);
    }

    return;
  }

  public async resolveBankAccount(accountNumber: string, bankCode: string) {
    return this.paystack.resolveBankAccount(accountNumber, bankCode);
  }
}
