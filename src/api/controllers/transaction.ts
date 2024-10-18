import { Service } from "typedi";
import { Message, response } from "../../utils";
import { FastifyReply, FastifyRequest } from "fastify";
import { TransactionService } from "../../services";

@Service()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  public async resolveBankAccount(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const { query }: { [key: string]: any } = request;
    const { accountNumber, bankCode } = query;
    const data = await this.transactionService.resolveBankAccount(
      accountNumber,
      bankCode
    );
    return response.success(reply, {
      message: Message.bankDetailsFetched,
      data,
    });
  }

  public async transferToBank(request: FastifyRequest, reply: FastifyReply) {
    const { body, user }: { [key: string]: any } = request;

    const payload = {
      amount: body.amount,
      beneficiaryId: body.beneficiaryId,
      reason: body.reason,
      transactionPin: body.transactionPin,
      from: body.from,
      fromId: body.fromId,
    };

    const data = await this.transactionService.transferToBank(payload, user);
    return response.success(reply, {
      message: Message.transferInitialized,
      data,
    });
  }

  public async fetchBankList(_: FastifyRequest, reply: FastifyReply) {
    const data = await this.transactionService.fetchBankList();

    return response.success(reply, {
      message: Message.bankListFetched,
      data,
    });
  }
}
