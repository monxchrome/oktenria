import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString, Types } from "mongoose";

import { ApiError } from "../errors/api.error";
import { User } from "../models/User.model";
import { IRequest } from "../types/common.types";
import { ITokenPayload } from "../types/token.types";
import { IUser } from "../types/user.types";
import { AuthValidator } from "../validators/auth.validator";
import { UserValidator } from "../validators/user.validator";

class UserMiddleware {
  public async isIdValid(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!isObjectIdOrHexString(req.params.userId)) {
        return next(new ApiError("User id is not valid", 422));
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  public async getByIdOrThrow(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId);

      if (!user) {
        throw new ApiError("User not found", 404);
      }

      res.locals.user = user;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isValidUpdate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = UserValidator.update.validate(req.body);

      if (error) {
        next(new ApiError(error.message, 400));
      }

      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isValidCreate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = UserValidator.create.validate(req.body);

      if (error) {
        next(new ApiError(error.message, 400));
      }

      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }

  public getDynamicallyAndThrow(
    fieldName: string,
    from = "body",
    dbField = fieldName
  ) {
    return async (req: IRequest, res: Response, next: NextFunction) => {
      try {
        const fieldValue = req[from][fieldName];

        const user = await User.findOne({ [dbField]: fieldValue });

        if (user) {
          throw new ApiError(
            `User with ${fieldName} ${fieldValue} is already exist!`,
            409
          );
        }

        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public async isValidLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = AuthValidator.loginUser.validate(req.body);

      if (error) {
        next(new ApiError(error.message, 400));
      }

      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }

  public getDynamicallyOrThrow(
    fieldName: string,
    from = "body",
    dbField = fieldName
  ) {
    return async (req: IRequest, res: Response, next: NextFunction) => {
      try {
        const fieldValue = req[from][fieldName];

        const user = await User.findOne({ [dbField]: fieldValue });

        if (!user) {
          throw new ApiError("User not found", 404);
        }

        res.locals.user = user;
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public async isSeller(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { _id } = req.res.locals.jwtPayload as ITokenPayload;

      const user = (await User.findOne({
        _id: new Types.ObjectId(_id),
      })) as IUser;

      if (user.role === "buyer") {
        throw new ApiError("You dont have permission", 422);
      }
      next();
    } catch (e) {
      next(e);
    }
  }

  public async visits(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;

      await User.findOneAndUpdate(
        { _id: userId },
        { $inc: { count: 1 } },
        { upsert: true }
      );

      next();
    } catch (e) {
      next(e);
    }
  }

  public async isAutoShow(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { auto_show } = req.body;

      if (auto_show === undefined || auto_show === null || !auto_show) {
        throw new ApiError("auto_show is required", 404);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
