import * as jwt from "jsonwebtoken";

import { configs } from "../config/config";
import { EToken } from "../enums/token-enum";
import { ApiError } from "../errors/api.error";
import { ITokenPair, ITokenPayload } from "../types/token.types";

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
}

export const tokenService = new TokenService();
