import { UploadedFile } from "express-fileupload";
import { Types } from "mongoose";

import { ApiError } from "../errors";
import { Car, User } from "../models";
import { ICar, IPaginationResponse, IQuery, IUser } from "../types";
import { s3Service } from "./s3.service";

class CarService {
  public async getPagination(query: IQuery): Promise<IPaginationResponse<any>> {
    try {
      const queryStr = JSON.stringify(query);
      const queryObj = JSON.parse(
        queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`)
      );

      const {
        page = 1,
        limit = 5,
        sort = "createdAt",
        ...searchObject
      } = queryObj;

      const skip = limit * (page - 1);
      const cars = await Car.find(searchObject)
        .limit(limit)
        .skip(skip)
        .sort(sort)
        .lean();
      const carsCount = await Car.count();

      return {
        page: +page,
        perPage: +limit,
        valueCount: carsCount,
        valueFound: cars.length,
        data: cars,
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(data: ICar, userId: string) {
    try {
      const result_all = await Car.aggregate([
        {
          $addFields: {
            currency: { $toDouble: "$currency" },
          },
        },
        {
          $group: {
            _id: "$model",
            avgPrice: { $avg: "$currency" },
          },
        },
        {
          $addFields: {
            avgPrice: { $round: ["$avgPrice", 2] },
          },
        },
      ]);

      const result_city = await Car.aggregate([
        {
          $addFields: {
            currency: { $toDouble: "$currency" },
          },
        },
        {
          $group: {
            _id: "$city",
            avgPrice: { $avg: "$currency" },
          },
        },
        {
          $addFields: {
            avgPrice: { $round: ["$avgPrice", 2] },
          },
        },
      ]);

      for (const { _id, avgPrice } of result_all) {
        await Car.updateMany(
          { model: _id },
          { $set: { averagePrice: avgPrice } }
        );
      }

      for (const { _id, avgPrice } of result_city) {
        await Car.updateMany(
          { city: _id },
          { $set: { averagePriceCity: avgPrice } }
        );
      }

      return await Car.create({ ...data, user: new Types.ObjectId(userId) });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async update(carId: string, data: Partial<ICar>): Promise<void> {
    try {
      return Car.findByIdAndUpdate(carId, data, { new: true });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async delete(carId: string): Promise<void> {
    try {
      await Car.deleteOne({ _id: carId });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async uploadPhoto(file: UploadedFile, carId: string): Promise<IUser> {
    try {
      const filePath = await s3Service.uploadPhoto(file, "car", carId);

      return await User.findByIdAndUpdate(
        carId,
        { photo: filePath },
        { new: true }
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async avg_price(model: string): Promise<void> {
    const aggregationResult = await Car.aggregate([
      { $match: { model } },
      {
        $group: {
          _id: null,
          totalPrices: { $sum: "$price" },
          count: { $sum: 1 },
        },
      },
    ]);

    const totalPrices = aggregationResult[0]?.totalPrices || 0;
    const count = aggregationResult[0]?.count || 0;

    const avgPrice = count > 0 ? totalPrices / count : 0;

    await Car.updateMany({ model }, { avg_price: avgPrice });
  }
}

export const carService = new CarService();
