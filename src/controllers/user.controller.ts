import { NextFunction, Request, Response } from "express";

import { userService } from "../services/user.service";
import { ICommonResponse } from "../types/common.types";
import { IQuery } from "../types/pagination.types";
import { IUser } from "../types/user.types";

class UserController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.getPagination(
        req.query as unknown as IQuery
      );

      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const { user } = res.locals;

      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonResponse<IUser>>> {
    try {
      const { params, body } = req;

      await userService.update(params.userId, body);

      return res.json({
        message: "User has been updated!",
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
      const { userId } = req.params;

      const deleteUser = await userService.delete(userId);

      return res.json({
        message: "User has been deleted!",
        data: deleteUser,
      });
    } catch (e) {
      next(e);
    }
  }

  public async getSeller(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonResponse<IUser>>> {
    const { userId } = req.params;

    const sellerUser = await userService.sellerRole(userId);

    return res.json({
      message: "User has seller role",
      data: sellerUser,
    });
  }

  public async getManager(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonResponse<IUser>>> {
    const { userId } = req.params;

    const managerUser = await userService.managerRole(userId);

    return res.json({
      message: "User has manager role",
      data: managerUser,
    });
  }

  public async getAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonResponse<IUser>>> {
    const { userId } = req.params;

    const adminUser = await userService.adminRole(userId);

    return res.json({
      message: "User has admin role",
      data: adminUser,
    });
  }
}

export const userController = new UserController();
