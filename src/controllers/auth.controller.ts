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
}

export const authController = new AuthController();
