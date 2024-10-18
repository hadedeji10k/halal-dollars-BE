import { Service } from "typedi";
import { Affiliate } from "../database/repository";
import { ICreateAffiliate, IUser } from "../interfaces";
import { ApiError, Message } from "../utils";

@Service()
export class AffiliateService {
  constructor(private readonly affiliation: Affiliate) {}

  public async createAffiliate(
    payload: ICreateAffiliate,
    throwError: boolean = false
  ) {
    let affiliate = await this.affiliation.findOneAffiliate({
      userId: payload.userId,
      referrerId: payload.referrerId,
    });

    if (affiliate) {
      if (throwError) {
        throw new ApiError(Message.afflilationExists, 409);
      } else {
        return;
      }
    }

    await this.affiliation.createAffiliate(payload);
    return;
  }

  public async getUserAffiliates(user: IUser) {
    let userAffiliates = await this.affiliation.findManyAffiliate(
      { referrerId: user.id },
      {
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      }
    );

    return userAffiliates;
  }

  public async getTotalUserAffiliates(user: IUser) {
    let totalCount = await this.affiliation.totalAffiliates({
      referrerId: user.id,
    });

    return totalCount;
  }

  public async getUserAffiliateTransactions(user: IUser) {
    let transactions = await this.affiliation.findManyAffiliateTransaction(
      { affilation: { referrerId: user.id } },
      {
        include: {
          affilation: {
            select: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  email: true,
                },
              },
            },
          },
        },
      }
    );

    return transactions;
  }
}
