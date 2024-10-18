import { Service } from "typedi";
import { TotalReach } from "../database/repository";
import { IUser } from "../interfaces";
import { ApiError, Message } from "../utils";
import { Prisma } from "@prisma/client";

@Service()
export class TotalReachService {
  constructor(private readonly totalReach: TotalReach) {}

  public async findOrCreateTotalReach(userId: string) {
    return await this.totalReach.findOrCreateTotalReach(userId);
  }

  public async updateUserTotalReach(
    id: string,
    data: Partial<Prisma.TotalReachUpdateInput>
  ) {
    return await this.totalReach.updateTotalReach({ id }, data);
  }

  public async getUserTotalReach(user: IUser) {
    let userTotalReach = await this.totalReach.findOrCreateTotalReach(user.id);

    if (!userTotalReach) {
      throw new ApiError(Message.totalReachNotFound, 404);
    }

    return userTotalReach;
  }
}
