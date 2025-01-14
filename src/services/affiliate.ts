import { Service } from "typedi";
import { Affiliate, User } from "../database/repository";
import { ICreateAffiliate, IUser } from "../interfaces";
import { ApiError, generateOTP, Message } from "../utils";

@Service()
export class AffiliateService {
  constructor(
    private readonly affiliation: Affiliate,
    private readonly user: User
  ) {}

  public async generateReferralCode(user: IUser) {
    if (user.referralCode) {
      throw new ApiError(Message.affiliateCodeAlreadyGenerated, 409);
    }
    const code = generateOTP({ type: "alphanum", length: 9 });
    await this.user.updateUser({ id: user.id }, { referralCode: code });
    return;
  }

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
