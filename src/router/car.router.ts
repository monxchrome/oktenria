import { Router } from "express";

import { carController } from "../controllers/car.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { carMiddleware } from "../middlewares/car.middleware";

const router = Router();

export const carRouter = router;

router.get("/", carController.getAll);

router.post(
  "/",
  authMiddleware.checkAccessToken,
  carMiddleware.isValidCreate,
  carController.create
);

router.get(
  "/:carId",
  authMiddleware.checkAccessToken,
  carMiddleware.getByIdOrThrow,
  carMiddleware.isIdValid,
  carController.getById
);

router.put(
  "/:carId",
  authMiddleware.checkAccessToken,
  carMiddleware.isIdValid,
  carMiddleware.isValidUpdate,
  carMiddleware.getByIdOrThrow,
  carController.update
);

router.delete(
  "/:carId",
  authMiddleware.checkAccessToken,
  carMiddleware.isIdValid,
  carMiddleware.getByIdOrThrow,
  carController.delete
);
