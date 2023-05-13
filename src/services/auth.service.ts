import {EActionToken} from "../enums/action-token.enum";
import {EEmailEnum} from "../enums/email.enum";
import {EUserAccount} from "../enums/user-account.enum";
import {EUserStatus} from "../enums/user-status.enum";
import {ApiError} from "../errors/api.error";
import {Action} from "../models/Action.model";
import {Token} from "../models/Token.model";
import {User} from "../models/User.model";
import {ICredentials} from "../types/auth.types";
import {ITokenPair, ITokenPayload} from "../types/token.types";
import {IUser} from "../types/user.types";
import {emailService} from "./email.service";
import {oauthService} from "./oauth.service";
import {tokenService} from "./token.service";

class AuthService {
  public async register(body: IUser): Promise<void> {
    try {
      const { password } = body;

      const hashedPassword = await oauthService.hash(password);
      await User.create({
        ...body,
        password: hashedPassword,
      });

      await emailService.sendEmail(body.email, EEmailEnum.REGISTER);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async login(
    credentials: ICredentials,
    user: IUser
  ): Promise<ITokenPair> {
    try {
      const isMatched = await oauthService.compare(
        credentials.password,
        user.password
      );

      if (!isMatched) {
        throw new ApiError("Email or password incorrect!", 400);
      }

      const tokenPair = tokenService.generateTokenPair({
        _id: user._id,
        firstName: user.firstName,
      });

      await Token.create({
        _user_id: user._id,
        ...tokenPair,
      });

      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async refresh(
    tokenData: ITokenPair,
    jwtPayload: ITokenPayload
  ): Promise<ITokenPair> {
    try {
      const tokenPair = tokenService.generateTokenPair({
        _id: jwtPayload._id,
        firstName: jwtPayload.firstName,
      });

      await Promise.all([
        Token.create({ _user_id: jwtPayload._id, ...tokenPair }),
        Token.deleteOne({ refreshToken: tokenData.refreshToken }),
      ]);

      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async activateEmail(user: IUser): Promise<void> {
    try {
      const actionToken = tokenService.generateActionToken(
        { _id: user._id },
        EActionToken.activate
      );

      await Action.create({
        actionToken,
        tokenType: EActionToken.activate,
        _user_id: user._id,
      });

      await emailService.sendEmail(user.email, EEmailEnum.ACTIVATE_EMAIL, {
        token: actionToken,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async setActivateEmail(id: string): Promise<void> {
    try {
      await User.updateOne(
        { _id: id },
        {
          account: EUserAccount.premium,
          status: EUserStatus.active,
          premiumExpiration: new Date(),
        }
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      const user = await User.findById(userId);
      const isMatched = await oauthService.compare(oldPassword, user.password);

      if (!isMatched) {
        throw new ApiError("Wrong old password!", 401);
      }

      const hashNewPassword = await oauthService.hash(newPassword);
      await User.updateOne({ _id: user._id }, { password: hashNewPassword });

      await emailService.sendEmail(user.email, EEmailEnum.CHANGE_PASSWORD);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
