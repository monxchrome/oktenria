import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { userMiddleware } from "../middlewares/user.middleware";

const router = Router();

export const authRouter = router;

router.post(
  "/register",
  userMiddleware.isValidCreate,
  userMiddleware.getDynamicallyAndThrow("email", "body"),
  authController.register
);

router.post(
  "/login",
  userMiddleware.isValidLogin,
  userMiddleware.getDynamicallyOrThrow("email"),
  authController.login
);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh
);

router.post(
  "/activate",
  userMiddleware.getDynamicallyOrThrow("email"),
  authController.activateEmail
);

router.put(
  "/activate/:token",
  userMiddleware.getDynamicallyOrThrow("email"),
  authController.setActivate
);
