import { prisma } from "..";
import { Service } from "typedi";
import { Prisma } from "@prisma/client";

interface IFindOptions {
  select?: Prisma.TransactionSelect;
  include?: Prisma.TransactionInclude;
  take?: number;
}

@Service()
export class Transaction {
  async create(payload: Partial<Prisma.TransactionCreateInput>) {
    let data: any = {
      type: payload.type,
      amount: payload.amount,
      title: payload.title,
      description: payload.description,
      chargedAmount: payload.chargedAmount,
      cardTxIdRef: payload.cardTxIdRef,
      cardTxId: payload.cardTxId,
      status: payload.status,
      beneficiary: payload.beneficiary,
      user: payload.user,
    };

    return await prisma.transaction.create({
      data,
    });
  }

  async findOne(where: Prisma.TransactionWhereInput, options?: IFindOptions) {
    return await prisma.transaction.findFirst({
      where: { ...where },
      ...options,
    });
  }

  public async findMany(
    where: Prisma.TransactionWhereInput,
    options?: IFindOptions
  ) {
    return await prisma.transaction.findMany({
      where: { ...where },
      ...options,
    });
  }

  public async totalTransaction(where?: Prisma.TransactionWhereInput) {
    return await prisma.transaction.count({
      where: {
        ...where,
      },
    });
  }

  public async findById(id: string, options?: IFindOptions) {
    return await this.findOne({ id }, options);
  }

  public async updateTransaction(
    where: Prisma.TransactionWhereUniqueInput,
    data: Prisma.TransactionUpdateInput
  ) {
    return await prisma.transaction.update({
      where: { ...where },
      data: { ...data },
    });
  }

  public async deleteTransaction(where: Prisma.TransactionWhereUniqueInput) {
    return await prisma.transaction.delete({ where: { ...where } });
  }
}
