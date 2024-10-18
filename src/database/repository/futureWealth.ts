import { Prisma } from "@prisma/client";
import { Service } from "typedi";
import { prisma } from "..";

interface IFutureWealthFindOptions {
  select?: Prisma.FutureWealthSelect;
  include?: Prisma.FutureWealthInclude;
}
interface ISubsidiaryFindOptions {
  select?: Prisma.SubsidiarySelect;
  include?: Prisma.SubsidiaryInclude;
}

@Service()
export class FutureWealth {
  public async createFutureWealth(payload: Prisma.FutureWealthCreateInput) {
    return await prisma.futureWealth.create({ data: payload });
  }

  public async updateFutureWealth(
    where: Prisma.FutureWealthWhereUniqueInput,
    payload: Prisma.FutureWealthUpdateInput
  ) {
    return await prisma.futureWealth.update({ where, data: payload });
  }

  public async findOneFutureWealth(
    where: Prisma.FutureWealthWhereInput,
    options?: IFutureWealthFindOptions
  ) {
    return await prisma.futureWealth.findFirst({
      where: { ...where },
      ...options,
    });
  }

  public async findManyFutureWealth(
    where: Prisma.FutureWealthWhereInput,
    data?: Prisma.FutureWealthFindManyArgs
  ) {
    return await prisma.futureWealth.findMany({
      where: { ...where },
      ...data,
    });
  }

  public async totalFutureWealths(where?: Prisma.FutureWealthWhereInput) {
    return await prisma.futureWealth.count({
      where: { ...where },
    });
  }

  public async deleteFutureWealth(where: Prisma.FutureWealthWhereUniqueInput) {
    return await prisma.futureWealth.delete({
      where: { ...where },
    });
  }

  // Subsidiary
  public async createSubsidiary(payload: Prisma.SubsidiaryCreateInput) {
    return await prisma.subsidiary.create({ data: payload });
  }

  public async updateSubsidiary(
    where: Prisma.SubsidiaryWhereUniqueInput,
    payload: Prisma.SubsidiaryUpdateInput
  ) {
    return await prisma.subsidiary.update({ where, data: payload });
  }

  public async findOneSubsidiary(
    where: Prisma.SubsidiaryWhereInput,
    options?: ISubsidiaryFindOptions
  ) {
    return await prisma.subsidiary.findFirst({
      where: { ...where },
      ...options,
    });
  }

  public async findManySubsidiary(
    where: Prisma.SubsidiaryWhereInput,
    data?: Prisma.SubsidiaryFindManyArgs
  ) {
    return await prisma.subsidiary.findMany({
      where: { ...where },
      ...data,
    });
  }

  public async totalSubsidiarys(where?: Prisma.SubsidiaryWhereInput) {
    return await prisma.subsidiary.count({
      where: { ...where },
    });
  }

  public async deleteSubsidiary(where: Prisma.SubsidiaryWhereUniqueInput) {
    return await prisma.subsidiary.delete({
      where: { ...where },
    });
  }
}
