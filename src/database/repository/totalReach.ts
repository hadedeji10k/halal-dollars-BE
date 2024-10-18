import { Prisma } from "@prisma/client";
import { Service } from "typedi";
import { prisma } from "..";

@Service()
export class TotalReach {
  public async findOrCreateTotalReach(userId: string) {
    const existing = await prisma.totalReach.findFirst({
      where: {
        userId,
      },
    });
    if (existing) {
      return existing;
    } else {
      return await prisma.totalReach.create({
        data: {
          userId,
        },
      });
    }
  }

  public async updateTotalReach(
    where: Prisma.TotalReachWhereUniqueInput,
    data: Prisma.TotalReachUpdateInput
  ) {
    return await prisma.totalReach.update({
      where: { ...where },
      data: { ...data },
    });
  }

  public async findManyTotalReach(
    where: Prisma.TotalReachWhereInput,
    data: Prisma.TotalReachFindManyArgs
  ) {
    return await prisma.totalReach.findMany({
      where: { ...where },
      ...data,
    });
  }

  public async totalTotalReaches(where?: Prisma.TotalReachWhereInput) {
    return await prisma.totalReach.count({
      where: { ...where },
    });
  }

  public async deleteTotalReach(where: Prisma.TotalReachWhereUniqueInput) {
    return await prisma.totalReach.delete({
      where: { ...where },
    });
  }
}
