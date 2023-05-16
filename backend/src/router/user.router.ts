import { Router } from "express";

import { userController } from "../controllers";
import { authMiddleware, userMiddleware } from "../middlewares";

const router = Router();

export const userRouter = router;

router.get("/", userController.getAll);

router.get(
  "/:userId",
  userMiddleware.isIdValid,
  userMiddleware.getByIdOrThrow,
  userMiddleware.visits,
  userController.getById
);

router.put(
  "/:userId",
  userMiddleware.isIdValid,
  userMiddleware.isValidUpdate,
  userMiddleware.getByIdOrThrow,
  userController.update
);

router.delete(
  "/:userId",
  userMiddleware.isIdValid,
  userMiddleware.getByIdOrThrow,
  userController.delete
);

router.put(
  "/:userId/seller",
  authMiddleware.checkAccessToken,
  userMiddleware.isIdValid,
  userMiddleware.getByIdOrThrow,
  userController.getSeller
);

router.put(
  "/:userId/manager",
  authMiddleware.checkAccessToken,
  userMiddleware.isIdValid,
  userMiddleware.getByIdOrThrow,
  userMiddleware.isAutoShow,
  userController.getManager
);

router.put(
  "/:userId/admin",
  authMiddleware.checkAccessToken,
  userMiddleware.isIdValid,
  userMiddleware.getByIdOrThrow,
  userController.getAdmin
);

router.put(
  "/:userId/avatar",
  authMiddleware.checkAccessToken,
  userMiddleware.isIdValid,
  userMiddleware.getByIdOrThrow,
  userController.uploadAvatar
);
