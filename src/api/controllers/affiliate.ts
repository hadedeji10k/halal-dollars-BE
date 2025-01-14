import { Service } from "typedi";
import { Message, response } from "../../utils";
import { FastifyReply, FastifyRequest } from "fastify";
import { AffiliateService } from "../../services";

@Service()
export class AffiliateController {
  constructor(private readonly affiliateService: AffiliateService) {}

  public async generateAffiliateCode(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const { user }: { [key: string]: any } = request;

    const data = await this.affiliateService.generateReferralCode(user);
    return response.success(reply, {
      message: Message.affiliateCodeGenerated,
      data,
    });
  }

  public async getUserAffiliates(request: FastifyRequest, reply: FastifyReply) {
    const { user }: { [key: string]: any } = request;

    const data = await this.affiliateService.getUserAffiliates(user);
    return response.success(reply, {
      message: Message.affiliatesFetched,
      data,
    });
  }

  public async getUserAffiliateTransactions(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const { user }: { [key: string]: any } = request;

    const data = await this.affiliateService.getUserAffiliateTransactions(user);
    return response.success(reply, {
      message: Message.affiliatesTransactionsFetched,
      data,
    });
  }

  public async getTotalUserAffiliates(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const { user }: { [key: string]: any } = request;

    const data = await this.affiliateService.getTotalUserAffiliates(user);
    return response.success(reply, {
      message: Message.totalAffiliatesFetched,
      data,
    });
  }
}
