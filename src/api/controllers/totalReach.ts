import { Service } from "typedi";
import { Message, response } from "../../utils";
import { FastifyReply, FastifyRequest } from "fastify";
import { TotalReachService } from "../../services";

@Service()
export class TotalReachController {
  constructor(private readonly totalReachService: TotalReachService) {}

  public async getUserTotalReach(request: FastifyRequest, reply: FastifyReply) {
    const { user }: { [key: string]: any } = request;

    const data = await this.totalReachService.getUserTotalReach(user);
    return response.success(reply, {
      message: Message.totalReachFetched,
      data,
    });
  }
}
