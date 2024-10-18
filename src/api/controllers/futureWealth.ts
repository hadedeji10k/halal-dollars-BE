import { Service } from "typedi";
import { Message, response } from "../../utils";
import { FastifyReply, FastifyRequest } from "fastify";
import { FutureWealthService } from "../../services";
import { ICreateSubsidiary } from "../../interfaces";

@Service()
export class FutureWealthController {
  constructor(private readonly futureWealthService: FutureWealthService) {}

  // future wealth
  public async getUserFutureWealths(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const { user }: { [key: string]: any } = request;

    const data = await this.futureWealthService.getUserFutureWealths(user.id);
    return response.success(reply, {
      message: Message.futureWealthFetched,
      data,
    });
  }

  public async getUserFutureWealth(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const { params }: { [key: string]: any } = request;

    const data = await this.futureWealthService.getFutureWealth(params.id);
    return response.success(reply, {
      message: Message.subsidiaryFetched,
      data,
    });
  }

  // subsidiaries
  public async createSubsidiary(request: FastifyRequest, reply: FastifyReply) {
    const { body, user }: { [key: string]: any } = request;

    const payload: ICreateSubsidiary = {
      name: body.name,
      description: body.description,
      relationship: body.relationship,
      userId: user.id,
    };

    const data = await this.futureWealthService.createSubsidiary(payload);
    return response.success(reply, {
      message: Message.subsidiaryAdded,
      data,
    });
  }

  public async updateSubsidiary(request: FastifyRequest, reply: FastifyReply) {
    const { body, params }: { [key: string]: any } = request;

    const payload = {
      name: body.name,
      description: body.description,
      relationship: body.relationship,
    };

    const data = await this.futureWealthService.updateSubsidiary(
      params.id,
      payload
    );
    return response.success(reply, {
      message: Message.subsidiaryUpdated,
      data,
    });
  }

  public async getUserSubsidiaries(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const { user }: { [key: string]: any } = request;

    const data = await this.futureWealthService.getUserSubsidiaries(user.id);
    return response.success(reply, {
      message: Message.subsidiariesFetched,
      data,
    });
  }

  public async getUserSubsidiary(request: FastifyRequest, reply: FastifyReply) {
    const { params }: { [key: string]: any } = request;

    const data = await this.futureWealthService.getSubsidiary(params.id);
    return response.success(reply, {
      message: Message.subsidiaryFetched,
      data,
    });
  }
}
