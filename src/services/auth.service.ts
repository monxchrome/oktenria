import { EActionToken, EEmailEnum, EUserAccount, EUserStatus } from "../enums";
import { ApiError } from "../errors";
import { Action, oldPassword, Token, User } from "../models";
import { ICredentials, ITokenPair, ITokenPayload, IUser } from "../types";
import { emailService } from "./email.service";
import { oauthService } from "./oauth.service";
import { tokenService } from "./token.service";

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

  public async changeEmail(
    userId: string,
    oldEmail: string,
    newEmail: string,
    password: string
  ): Promise<void> {
    try {
      const user = await User.findById(userId);
      const isMatched = await oauthService.compare(password, user.password);

      if (!isMatched) {
        throw new ApiError("Invalid email or password", 401);
      }

      if (oldEmail !== user.email) {
        throw new ApiError("Invalid email or password", 401);
      }

      await User.updateOne({ _id: user._id }, { email: newEmail });

      await emailService.sendEmail(user.email, EEmailEnum.CHANGE_EMAIL);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async forgotPassword(user: IUser): Promise<void> {
    try {
      const actionToken = tokenService.generateActionToken(
        { _id: user._id },
        EActionToken.forgot
      );

      await Action.create({
        actionToken,
        tokenType: EActionToken.forgot,
        _user_id: user._id,
      });

      await emailService.sendEmail(user.email, EEmailEnum.FORGOT_PASSWORD, {
        token: actionToken,
      });

      await oldPassword.create({ _user_id: user._id, password: user.password });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async setForgotPassword(
    password: string,
    id: string,
    token: string
  ): Promise<void> {
    try {
      const hashedPassword = await oauthService.hash(password);
      await User.updateOne({ _id: id }, { password: hashedPassword });
      await Action.deleteOne({
        actionToken: token,
        tokenType: EActionToken.forgot,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
