import { Router } from "express";

import { authController } from "../controllers";
import { authMiddleware, userMiddleware } from "../middlewares";

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

router.post(
  "/password/change",
  authMiddleware.checkAccessToken,
  authMiddleware.isValidChangePassword,
  authController.changePassword
);

router.post(
  "/password/forgot",
  userMiddleware.getDynamicallyOrThrow("email"),
  authController.forgotPassword
);

router.put(
  "/password/forgot/:token",
  authMiddleware.checkActionForgotToken,
  authMiddleware.checkOldPassword,
  authMiddleware.isValidForgotPassword,
  authController.setForgotPassword
);

router.post(
  "/email/change",
  authMiddleware.checkAccessToken,
  authMiddleware.isValidChangeEmail,
  authController.changeEmail
);
