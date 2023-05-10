import { EEmailEnum } from "../enums/email.enum";
import { ApiError } from "../errors/api.error";
import { Token } from "../models/Token.model";
import { User } from "../models/User.model";
import { ICredentials } from "../types/auth.types";
import { ITokenPair, ITokenPayload } from "../types/token.types";
import { IUser } from "../types/user.types";
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
}

export const authService = new AuthService();
