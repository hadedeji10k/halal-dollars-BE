import { Prisma } from "@prisma/client";
import { Service } from "typedi";
import { prisma } from "..";
import { ICreateBeneficiaryPayload } from "../../interfaces";

interface IBankFindOptions {
  select?: Prisma.BeneficiarySelect;
  include?: Prisma.BeneficiaryInclude;
}

@Service()
export class Beneficiary {
  public async createBeneficiary(
    payload: ICreateBeneficiaryPayload,
    userId: string
  ) {
    let data: any = {
      alias: payload.alias,
      accountNumber: payload.accountNumber,
      accountName: payload.accountName,
      bankName: payload.bankName,
      bankCode: payload.bankCode,
      user: {
        connect: {
          id: userId,
        },
      },
    };

    return await prisma.beneficiary.create({ data });
  }

  public async findOneBeneficiary(
    where: Prisma.BeneficiaryWhereInput,
    options?: IBankFindOptions
  ) {
    return await prisma.beneficiary.findFirst({
      where: { ...where },
      ...options,
    });
  }

  public async findManyBeneficiary(
    where: Prisma.BeneficiaryWhereInput,
    data: Prisma.BeneficiaryFindManyArgs
  ) {
    return await prisma.beneficiary.findMany({
      where: { ...where },
      ...data,
    });
  }

  public async totalBankBeneficiaries(where?: Prisma.BeneficiaryWhereInput) {
    return await prisma.beneficiary.count({
      where: { ...where },
    });
  }

  public async deleteBeneficiary(where: Prisma.BeneficiaryWhereUniqueInput) {
    return await prisma.beneficiary.delete({
      where: { ...where },
    });
  }
}
