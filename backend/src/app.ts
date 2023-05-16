import express, { NextFunction, Request, Response } from "express";
import fileUploader from "express-fileupload";
import mongoose from "mongoose";
import * as swaggerUi from "swagger-ui-express";

import { configs } from "./config";
import { cronRunner } from "./cron";
import { authRouter, carRouter, userRouter } from "./router";
import { IError } from "./types";
import * as swaggerJson from "./utils/swagger.json";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUploader());

app.use("/users", userRouter);
app.use("/cars", carRouter);
app.use("/auth", authRouter);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 400;

  return res.status(status).json({
    message: err.message,
    status,
  });
});

const connectionDB = async () => {
  let dbCon = false;

  while (!dbCon) {
    try {
      console.log('Connecting to database. Please wait...')
      await mongoose.connect(configs.DB_URL);
      dbCon = true
    } catch (e) {
      console.log('Database is unaviable, please wait 5 sec.')
      await new Promise(resolve => setTimeout(resolve, 5000))
    }
  }
}

const start = async () => {
  try {
    await connectionDB()
    await app.listen(configs.PORT, () => configs.HOST)

    cronRunner();
    console.log(`Server has started on port: ${configs.PORT}`);
  } catch (e) {
    console.log(e);
  }
}

start();
