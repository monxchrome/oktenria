import * as jwt from "jsonwebtoken";

import { configs } from "../config/config";
import { EActionToken } from "../enums/action-token.enum";
import { EToken } from "../enums/token-enum";
import { ApiError } from "../errors/api.error";
import {
  IActionTokenPayload,
  ITokenPair,
  ITokenPayload,
} from "../types/token.types";

class TokenService {
  public generateTokenPair(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, configs.ACCESS_SECRET, {
      expiresIn: configs.ACCESS_EXPIRES_IN,
    });
    const refreshToken = jwt.sign(payload, configs.REFRESH_SECRET, {
      expiresIn: configs.REFRESH_EXPIRES_IN,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public checkToken(token: string, tokenType = EToken.access): ITokenPayload {
    let secret = "";

    try {
      switch (tokenType) {
        case EToken.access:
          secret = configs.ACCESS_SECRET;
          break;

        case EToken.refresh:
          secret = configs.REFRESH_SECRET;
          break;
      }

      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token is not valid", 401);
    }
  }

  public generateActionToken(
    payload: IActionTokenPayload,
    tokenType: EActionToken
  ): string {
    let secret = "";

    try {
      switch (tokenType) {
        case EActionToken.activate:
          secret = configs.ACTIVATE_SECRET;
          break;

        case EActionToken.forgot:
          secret = configs.FORGOT_SECRET;
          break;
      }

      return jwt.sign(payload, secret, { expiresIn: "7d" });
    } catch (e) {
      throw new ApiError("Action token not valid", 401);
    }
  }

  public checkActionToken(token: string, tokenType: EActionToken) {
    try {
      let secret = "";

      switch (tokenType) {
        case EActionToken.forgot:
          secret = configs.FORGOT_SECRET;
          break;
        case EActionToken.activate:
          secret = configs.ACTIVATE_SECRET;
          break;
      }

      return jwt.verify(token, secret) as IActionTokenPayload;
    } catch (e) {
      throw new ApiError("Action token is not valid", 401);
    }
  }
}

export const tokenService = new TokenService();
