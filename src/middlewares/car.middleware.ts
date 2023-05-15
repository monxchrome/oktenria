import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString, Types } from "mongoose";

import { ApiError } from "../errors";
import { Car, User } from "../models";
import { ITokenPayload, IUser } from "../types";
import { CarValidator } from "../validators";

let postCounter = 0;
let putCounter = 0;
class CarMiddleware {
  public async isValidCreate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { _id } = req.res.locals.jwtPayload as ITokenPayload;
      const { error, value } = CarValidator.create.validate(req.body);

      if (error) {
        return next(new ApiError(error.message, 405));
      }

      const user = (await User.findOne({
        _id: new Types.ObjectId(_id),
      })) as IUser;

      if (req.method === "POST" && user.account === "base") {
        if (postCounter >= 1) {
          throw new ApiError(
            "You have limit for post this car, buy a premium",
            403
          );
        }
        postCounter++;
      }

      req.body = value;
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
      const { _id } = req.res.locals.jwtPayload as ITokenPayload;
      const { error, value } = CarValidator.update.validate(req.body);

      if (error) {
        return next(new ApiError(error.message, 405));
      }

      const user = (await User.findOne({
        _id: new Types.ObjectId(_id),
      })) as IUser;

      if (req.method === "PUT" && user.account === "base") {
        if (putCounter >= 3) {
          throw new ApiError("You have limit for edit this car", 403);
        }
        putCounter++;
      }

      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isIdValid(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!isObjectIdOrHexString(req.params.carId)) {
        return next(new ApiError("Car id is not valid", 422));
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
      const { carId } = req.params;

      const car = await Car.findById(carId);

      if (!car) {
        throw new ApiError("Car not found!", 404);
      }

      res.locals.car = car;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const carMiddleware = new CarMiddleware();
