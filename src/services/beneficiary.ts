import { Service } from "typedi";
import { Beneficiary } from "../database/repository";
import { ICreateBeneficiaryPayload, IUser } from "../interfaces";
import { ApiError, Message } from "../utils";
import { PaystackTransactionService } from "./paystack";

@Service()
export class BeneficiaryService {
  constructor(
    private readonly beneficiary: Beneficiary,
    private readonly paystack: PaystackTransactionService
  ) {}

  public async createBeneficiary(
    payload: ICreateBeneficiaryPayload,
    user: IUser
  ) {
    let bankBeneficiary = await this.beneficiary.findOneBeneficiary({
      userId: user.id,
      accountNumber: payload.accountNumber,
      bankCode: payload.bankCode,
    });

    if (bankBeneficiary) {
      throw new ApiError(Message.beneficiaryExists, 409);
    }

    const transaferRecipient = await this.paystack.createTransferRecipient({
      name: payload.accountName,
      account_number: payload.accountNumber,
      bank_code: payload.bankCode,
    });

    if (!transaferRecipient.active) {
      throw new ApiError(Message.beneficiaryToAddNotActive, 400);
    }

    await this.beneficiary.createBeneficiary(
      { ...payload, recipientCode: transaferRecipient.recipient_code },
      user.id
    );
    return;
  }

  public async getUserBeneficiary(beneficiaryId: string, user: IUser) {
    let userBeneficiary = await this.beneficiary.findOneBeneficiary(
      { userId: user.id, id: beneficiaryId },
      {}
    );

    if (!userBeneficiary) {
      throw new ApiError(Message.beneficiaryNotExists, 404);
    }

    return userBeneficiary;
  }

  public async getUserBeneficiaries(user: IUser) {
    let userBeneficiaries = await this.beneficiary.findManyBeneficiary(
      { userId: user.id },
      {}
    );

    return userBeneficiaries;
  }

  public async deleteUserBeneficiary(id: string, user: IUser) {
    let bankBeneficiary = await this.beneficiary.findOneBeneficiary({ id });

    if (!bankBeneficiary) {
      throw new ApiError(Message.beneficiaryNotExists, 404);
    }

    if (bankBeneficiary.userId !== user.id) {
      throw new ApiError(Message.notAuthorized, 401);
    }

    await this.paystack.deleteTransferRecipient(bankBeneficiary.recipientCode!);

    await this.beneficiary.deleteBeneficiary({ id });

    return;
  }
}
