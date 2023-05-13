import { NextFunction, Request, Response } from "express";

import { authService } from "../services/auth.service";
import { ITokenPair } from "../types/token.types";
import { IUser } from "../types/user.types";

class AuthController {
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.register(req.body);

      res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ITokenPair>> {
    try {
      const { email, password } = req.body;
      const { user } = req.res.locals;

      const tokenPair = await authService.login(
        { email, password },
        user as IUser
      );

      return res.status(200).json(tokenPair);
    } catch (e) {
      next(e);
    }
  }

  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { tokenData, jwtPayload } = req.res.locals;

      const tokenPair = await authService.refresh(tokenData, jwtPayload);

      return res.status(200).json(tokenPair);
    } catch (e) {
      next(e);
    }
  }

  public async activateEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = req.res.locals;
      await authService.activateEmail(user);

      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }

  public async setActivate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { user } = req.res.locals;
      await authService.setActivateEmail(user._id);

      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }

  public async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { tokenData } = req.res.locals;

      const { oldPassword, newPassword } = req.body;

      await authService.changePassword(
        tokenData._user_id,
        oldPassword,
        newPassword
      );

      res.status(200).json({
        message: "Password has been changed!",
      });
    } catch (e) {
      next(e);
    }
  }

  public async changeEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { tokenData } = req.res.locals;

      const { oldEmail, newEmail, password } = req.body;

      await authService.changeEmail(
        tokenData._user_id,
        oldEmail,
        newEmail,
        password
      );

      res.status(200).json({
        message: "Email has been changed!",
      });
    } catch (e) {
      next(e);
    }
  }

  public async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = req.res.locals;
      await authService.forgotPassword(user);

      res.status(200).json({
        message: "Check your email",
      });
    } catch (e) {
      next(e);
    }
  }

  public async setForgotPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { password } = req.body;
      const { jwtPayload } = req.res.locals;

      await authService.setForgotPassword(
        password,
        jwtPayload._id,
        req.params.token
      );

      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
