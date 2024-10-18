import { Service } from "typedi";
import { FutureWealth } from "../database/repository";
import { ICreateSubsidiary, IUser } from "../interfaces";
import { ApiError, Message } from "../utils";
import { Prisma } from "@prisma/client";

@Service()
export class FutureWealthService {
  constructor(private readonly futureWealth: FutureWealth) {}

  public async createFutureWealth(payload: Prisma.FutureWealthCreateInput) {
    return await this.futureWealth.createFutureWealth(payload);
  }

  public async updateFutureWealth(
    id: string,
    data: Partial<Prisma.TotalReachUpdateInput>
  ) {
    return await this.futureWealth.updateFutureWealth({ id }, data);
  }

  public async getFutureWealth(id: string) {
    let futureWealth = await this.futureWealth.findOneFutureWealth({
      id,
    });

    return futureWealth;
  }

  public async getUserFutureWealths(userId: string) {
    let userFutureWealths = await this.futureWealth.findManyFutureWealth({
      userId,
    });

    return userFutureWealths;
  }

  // Subsidiary
  public async createSubsidiary(payload: ICreateSubsidiary) {
    const data = {
      name: payload.name,
      description: payload.description,
      relationship: payload.relationship,
      user: {
        connect: {
          id: payload.userId,
        },
      },
    };
    return await this.futureWealth.createSubsidiary(data);
  }

  public async updateSubsidiary(
    id: string,
    data: Partial<Prisma.SubsidiaryUpdateInput>
  ) {
    return await this.futureWealth.updateSubsidiary({ id }, data);
  }

  public async getSubsidiary(id: string) {
    let subsidiary = await this.futureWealth.findOneSubsidiary({
      id,
    });

    return subsidiary;
  }

  public async getUserSubsidiaries(userId: string) {
    let userSubsidiaries = await this.futureWealth.findManySubsidiary({
      userId,
    });

    return userSubsidiaries;
  }
}
