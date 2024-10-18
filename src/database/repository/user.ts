import { Prisma } from "@prisma/client";
import { addMinutes } from "date-fns";
import { Service } from "typedi";
import { prisma } from "..";
import { ICreateUserPayload, IUser } from "../../interfaces";

interface IFindOptions {
  select?: Prisma.UserSelect;
  include?: Prisma.UserInclude;
}

@Service()
export class User {
  async create(payload: ICreateUserPayload) {
    let data = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone,
      password: payload.password,
      username: payload.username || payload.firstName,
      referrerCode: payload.userReferralCode,
    };

    return await prisma.user.create({ data: data });
  }

  async findOne(where: Prisma.UserWhereInput, options?: IFindOptions) {
    return await prisma.user.findFirst({ where: { ...where }, ...options });
  }

  public async findByEmail(email: string, options?: IFindOptions) {
    return await this.findOne({ email }, options);
  }

  public async findById(id: string, options?: IFindOptions) {
    return await this.findOne({ id }, options);
  }

  public async findByUsername(username: string, options?: IFindOptions) {
    return await this.findOne({ username }, options);
  }

  public async findByPhoneNumber(phone: string, options?: IFindOptions) {
    return await this.findOne({ phone }, options);
  }

  public async updateUser(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput
  ) {
    return await prisma.user.update({ where: { ...where }, data: { ...data } });
  }

  public async findMany(
    where: Prisma.UserWhereInput,
    data: Prisma.UserFindManyArgs
  ) {
    return await prisma.user.findMany({ where: { ...where }, ...data });
  }

  public async totalUsers(where?: Prisma.UserWhereInput) {
    return await prisma.user.count({
      where: {
        ...where,
      },
    });
  }

  async totalUserReferrals(id: string) {
    const result = await this.findOne(
      { id },
      {
        select: {
          _count: {},
        },
      }
    );

    // @ts-expect-error
    return result ? <number>result._count : 0;
  }

  async createOrUpdateVerificationCode(
    user: IUser,
    type: "email" | "password" | "phone" | "pin",
    code: string,
    valid: boolean
  ) {
    let data: any = {
      user: { connect: { id: user.id } },
      code,
      validity: addMinutes(new Date(), 10),
      valid,
    };

    let updateData = {
      code,
      validity: addMinutes(new Date(), 10),
      valid,
    };

    const findUser = await prisma.pinVerification.findFirst({
      where: { userId: user.id },
    });

    if (findUser) {
      return await prisma.pinVerification.update({
        where: { id: findUser.id },
        data: updateData,
      });
    } else {
      return await prisma.pinVerification.create({ data });
    }
  }

  async findVerificationCode(
    user: IUser,
    type: "email" | "password" | "phone" | "pin"
  ) {
    let data: {
      code: string;
      valid: boolean;
      validity: Date;
    } | null = null;
    data = await prisma.pinVerification.findFirst({
      where: { userId: user.id },
    });

    return data;
  }

  async findUserPin(where: Prisma.UserWhereInput, options?: any) {
    const user = await prisma.user.findFirst({
      where: { ...where },
      ...options,
    });
    return user && user.transactionPin ? user.transactionPin : null;
  }

  async createOrUpdateTransactionPin(user: IUser, pin: string) {
    return await prisma.user.update({
      where: { id: user.id },
      data: { transactionPin: pin },
    });
  }
}
