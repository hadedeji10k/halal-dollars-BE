import { Service } from "typedi";
import { prisma } from "../database";
import { Transaction, User } from "../database/repository";
import { environment } from "../config";
import crypto from "crypto";
import APIGateway, { methods } from "../utils/axios";
import axios from "axios";
import {
  ICreateRecipient,
  ITransferToBank,
  ITransferToBankPayload,
} from "../interfaces";

@Service()
export class PaystackTransactionService extends APIGateway {
  constructor(
    private readonly transaction: Transaction,
    private readonly user: User
  ) {
    super(
      axios.create({
        baseURL: environment.paystack.baseUrl,
        headers: {
          Authorization: `Bearer ${environment.paystack.secretKey}`,
          "content-type": "application/json",
        },
      })
    );
  }

  public async paystackWebhook(payload: any, headers: any) {
    const hash = crypto
      .createHmac("sha512", environment.paystack.secretKey)
      .update(JSON.stringify(payload))
      .digest("hex");
    if (hash == headers["x-paystack-signature"]) {
      const verifiedTransaction = await this.fetchTransaction(payload?.id);
      if (
        verifiedTransaction?.id === payload?.id &&
        verifiedTransaction?.status === "success" &&
        verifiedTransaction?.amount === payload?.amount
      ) {
        const transaction = await this.transaction.findOne({
          id: verifiedTransaction?.id,
        });

        const user = await this.user.findOne({
          email:
            verifiedTransaction?.customer?.email ||
            verifiedTransaction?.meta?.email,
        });

        if (user) {
          if (!transaction) {
            await prisma.$transaction(async (tx) => {
              await tx.transaction.create({
                data: {
                  amount: Number(verifiedTransaction.amount),
                  userId: user?.id!,
                  type: "CREDIT",
                  status: "SUCCESS",
                },
              });

              // create mudaarabah or any other transaction type

              if (verifiedTransaction?.meta?.saveCard) {
                const card = await tx.userCard.findFirst({
                  where: {
                    firstSixDigits: verifiedTransaction?.card?.first_6digits,
                    lastFourDigits: verifiedTransaction?.card?.last_4digits,
                    type: verifiedTransaction?.card?.type,
                  },
                });

                if (!card) {
                  await tx.userCard.create({
                    data: {
                      firstSixDigits: verifiedTransaction?.card?.first_6digits,
                      lastFourDigits: verifiedTransaction?.card?.last_4digits,
                      type: verifiedTransaction?.card?.type,
                      issuer: verifiedTransaction?.card?.issuer,
                      token: verifiedTransaction?.card?.token,
                      expiryDate: verifiedTransaction?.card?.expiry,
                      isPrimary: false,
                      userId: user.id,
                      dateAdded: new Date(),
                    },
                  });
                }
              }
            });
            return { status: true };
          } else if (transaction?.status === "PENDING") {
            await prisma.$transaction(async (tx) => {
              await tx.transaction.update({
                where: {
                  id: transaction.id,
                },
                data: {
                  status: "SUCCESS",
                },
              });

              // create mudaarabah or any other transaction type

              if (verifiedTransaction?.meta?.saveCard) {
                const card = await tx.userCard.findFirst({
                  where: {
                    firstSixDigits: verifiedTransaction?.card?.first_6digits,
                    lastFourDigits: verifiedTransaction?.card?.last_4digits,
                    type: verifiedTransaction?.card?.type,
                  },
                });

                if (!card) {
                  await tx.userCard.create({
                    data: {
                      firstSixDigits: verifiedTransaction?.card?.first_6digits,
                      lastFourDigits: verifiedTransaction?.card?.last_4digits,
                      type: verifiedTransaction?.card?.type,
                      issuer: verifiedTransaction?.card?.issuer,
                      token: verifiedTransaction?.card?.token,
                      expiryDate: verifiedTransaction?.card?.expiry,
                      isPrimary: false,
                      userId: user.id,
                      dateAdded: new Date(),
                    },
                  });
                }
              }
            });
            return { status: true };
          }
        } else {
          return { status: false, message: "User not found" };
        }
      }
    } else {
      return { status: false, message: "Signature not match" };
    }
  }

  public async transferToBank(data: ITransferToBankPayload) {
    const payload = {
      source: "balance",
      amount: data.amount,
      recipient: data.recipientCode,
      reason: data.reason,
      reference: data.reference,
    };
    const response = await this.request(methods.GET, `/transfer`, {}, payload);
    return response?.data;
  }

  public async fetchTransaction(reference: string) {
    const response = await this.request(
      methods.GET,
      `/transaction/${reference}`
    );
    return response?.data;
  }

  public async createTransferRecipient(data: ICreateRecipient) {
    const payload = {
      type: "nuban",
      name: data.name,
      account_number: data.account_number,
      bank_code: data.bank_code,
      currency: "NGN",
    };
    const response = await this.request(
      methods.POST,
      `/transferrecipient`,
      {},
      payload
    );
    return response?.data;
  }

  public async deleteTransferRecipient(recipientCode: string) {
    const response = await this.request(
      methods.DELETE,
      `/transferrecipient/${recipientCode}`
    );
    return response?.status;
  }

  public async resolveBankAccount(accountNumber: string, bankCode: string) {
    const response = await this.request(
      methods.GET,
      `/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`
    );
    return response?.data;
  }

  public async fetchBankList() {
    let banks: any[] = [];
    const getBankList = async () => {
      const result = await this.request(methods.GET, "/bank?country=nigeria");
      if (result.status) {
        banks.push(...result.data);
        if (result.meta?.next !== null) {
          await getBankList();
        }
      }
    };
    return banks;
  }
}
