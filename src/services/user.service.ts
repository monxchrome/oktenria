import { ApiError } from "../errors/api.error";
import { User } from "../models/User.model";
import { IPaginationResponse, IQuery } from "../types/pagination.types";
import { IUser } from "../types/user.types";

class UserService {
  public async getPagination(
    query: IQuery
  ): Promise<IPaginationResponse<IUser>> {
    try {
      // regular
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
      const users = await User.find(searchObject)
        .limit(limit)
        .skip(skip)
        .sort(sort)
        .lean(); // clear errors code
      const usersCount = await User.count();

      return {
        page: +page,
        perPage: +limit,
        valueCount: usersCount,
        valueFound: users.length,
        data: users,
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async update(userId: string, data: Partial<IUser>): Promise<void> {
    try {
      return User.findByIdAndUpdate(userId, data, { new: true });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async delete(userId: string): Promise<void> {
    try {
      await User.deleteOne({ _id: userId });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async sellerRole(userId: string): Promise<void> {
    try {
      await User.updateOne({ _id: userId }, { $set: { role: "seller" } });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async managerRole(userId: string, body: IUser): Promise<void> {
    try {
      const { auto_show } = body;

      await User.updateOne(
        { _id: userId },
        { $set: { role: "manager", auto_show: auto_show } }
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async adminRole(userId: string): Promise<void> {
    try {
      await User.updateOne({ _id: userId }, { $set: { role: "admin" } });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const userService = new UserService();
