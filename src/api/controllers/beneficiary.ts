import { Service } from "typedi";
import { Message, response } from "../../utils";
import { FastifyReply, FastifyRequest } from "fastify";
import { BeneficiaryService } from "../../services";
import { ICreateBeneficiaryPayload } from "../../interfaces";

@Service()
export class BeneficiaryController {
  constructor(private readonly beneficairyService: BeneficiaryService) {}

  public async createBeneficiary(request: FastifyRequest, reply: FastifyReply) {
    const { body, user }: { [key: string]: any } = request;

    const payload: ICreateBeneficiaryPayload = {
      alias: body.alias,
      accountNumber: body.accountNumber,
      accountName: body.accountName,
      bankName: body.bankName,
      bankCode: body.bankCode,
      amount: body.amount,
      transactionPin: body.transactionPin,
    };

    const data = await this.beneficairyService.createBeneficiary(payload, user);
    return response.success(reply, {
      message: Message.beneficiaryAdded,
      data,
    });
  }

  public async getUserBeneficiary(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const { params, user }: { [key: string]: any } = request;

    const data = await this.beneficairyService.getUserBeneficiary(
      params.id,
      user
    );
    return response.success(reply, {
      message: Message.beneficiaryFetched,
      data,
    });
  }

  public async getUserBeneficiaries(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const { user }: { [key: string]: any } = request;

    const data = await this.beneficairyService.getUserBeneficiaries(user);
    return response.success(reply, {
      message: Message.beneficiariesFetched,
      data,
    });
  }

  public async deleteUserBeneficiary(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const { params, user }: { [key: string]: any } = request;

    const data = await this.beneficairyService.deleteUserBeneficiary(
      params.id,
      user
    );
    return response.success(reply, {
      message: Message.beneficiaryDeleted,
      data,
    });
  }
}
