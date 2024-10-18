import { Prisma } from "@prisma/client";
import { Service } from "typedi";
import { prisma } from "..";
import { ICreateAffiliate } from "../../interfaces";

interface IAffiliationFindOptions {
  select?: Prisma.AffiliationSelect;
  include?: Prisma.AffiliationInclude;
}

@Service()
export class Affiliate {
  public async createAffiliate(payload: ICreateAffiliate) {
    let data: any = {
      referrer: {
        connect: {
          id: payload.referrerId,
        },
      },
      user: {
        connect: {
          id: payload.userId,
        },
      },
    };

    return await prisma.affiliation.create({ data });
  }

  public async findOneAffiliate(
    where: Prisma.AffiliationWhereUniqueInput,
    options?: IAffiliationFindOptions
  ) {
    return await prisma.affiliation.findFirst({
      where: { ...where },
      ...options,
    });
  }

  public async findManyAffiliate(
    where: Prisma.AffiliationWhereInput,
    data: Prisma.AffiliationFindManyArgs
  ) {
    return await prisma.affiliation.findMany({
      where: { ...where },
      ...data,
    });
  }

  public async findManyAffiliateTransaction(
    where: Prisma.AffiliationTransactionWhereInput,
    data: Prisma.AffiliationTransactionFindManyArgs
  ) {
    return await prisma.affiliationTransaction.findMany({
      where: { ...where },
      ...data,
    });
  }

  public async totalAffiliates(where?: Prisma.AffiliationWhereInput) {
    return await prisma.affiliation.count({
      where: { ...where },
    });
  }
}
