import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { carService } from "../services";
import { ICar, ICommonResponse, IQuery, ITokenPayload, IUser } from "../types";

class CarController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICar[]>> {
    try {
      const cars = await carService.getPagination(
        req.query as unknown as IQuery
      );

      return res.json(cars);
    } catch (e) {
      next(e);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonResponse<ICar>>> {
    try {
      const { _id } = req.res.locals.jwtPayload as ITokenPayload;
      const car = await carService.create(req.body, _id);

      return res.status(200).json({
        message: "Car created",
        data: car,
      });
    } catch (e) {
      next(e);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICar>> {
    try {
      const { car } = res.locals;

      return res.json(car);
    } catch (e) {
      next(e);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonResponse<ICar>>> {
    try {
      const { params, body } = req;

      await carService.update(params.carId, body);

      return res.json({
        message: "Car has been updated!",
      });
    } catch (e) {
      next(e);
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonResponse<IUser>>> {
    try {
      const { carId } = req.params;

      const deleteCar = await carService.delete(carId);

      return res.json({
        message: "Car has been deleted!",
        data: deleteCar,
      });
    } catch (e) {
      next(e);
    }
  }
  public async uploadPhoto(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const { carId } = req.params;
      const photo = req.files.photo as UploadedFile;

      const car = carService.uploadPhoto(photo, carId);

      return res.status(201).json(car);
    } catch (e) {
      next(e);
    }
  }
}

export const carController = new CarController();
