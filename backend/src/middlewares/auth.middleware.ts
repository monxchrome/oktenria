import { NextFunction, Request, Response } from "express";

import { EActionToken, EToken } from "../enums";
import { ApiError } from "../errors";
import { Action, oldPassword, Token } from "../models";
import { oauthService, tokenService } from "../services";
import { UserValidator } from "../validators";

class AuthMiddleware {
  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const refreshToken = req.get("Authorization");

      if (!refreshToken) {
        throw new ApiError("Your refresh token has been expired", 404);
      }

      const jwtPayload = tokenService.checkToken(refreshToken, EToken.refresh);
      const tokenData = await Token.findOne({ refreshToken });

      if (!tokenData) {
        throw new ApiError("Refresh token is not valid!", 401);
      }

      req.res.locals = { tokenData, jwtPayload };
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const accessToken = req.get("Authorization");

      if (!accessToken) {
        throw new ApiError("Access token has been axpired", 404);
      }

      const jwtPayload = tokenService.checkToken(accessToken);
      const tokenData = await Token.findOne({ accessToken }).populate(
        "_user_id"
      );

      if (!tokenData) {
        throw new ApiError("Access token is not valid", 401);
      }

      req.res.locals = { tokenData, jwtPayload, user: tokenData._user_id };
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isValidChangePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error } = UserValidator.changePassword.validate(req.body);

      if (error) {
        throw new ApiError(error.message, 409);
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  public async isValidChangeEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error } = UserValidator.changeEmail.validate(req.body);

      if (error) {
        throw new ApiError(error.message, 409);
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkActionForgotToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const actionToken = req.params.token;

      if (!actionToken) {
        throw new ApiError("Action token not found!", 404);
      }

      const jwtPayload = tokenService.checkActionToken(
        actionToken,
        EActionToken.forgot
      );

      const tokenData = Action.findOne({ actionToken });

      if (!tokenData) {
        throw new ApiError("Action token not valid", 401);
      }

      req.res.locals = { tokenData, jwtPayload };

      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkOldPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { body } = req.body;
      const { tokenData } = req.res.locals;

      const oldPasswords = await oldPassword.find({
        _user_id: tokenData._id,
      });

      if (!oldPasswords) {
        next();
      }

      await Promise.all(
        oldPasswords.map(async (record) => {
          const isMatched = await oauthService.compare(
            body.password,
            record.password
          );
          if (isMatched) {
            throw new ApiError("Your new password is same as old", 409);
          }
        })
      );

      next();
    } catch (e) {
      next(e);
    }
  }

  public async isValidForgotPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error } = UserValidator.forgotPassword.validate(req.body);

      if (error) {
        throw new ApiError(error.message, 409);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
