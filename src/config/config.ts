import { config } from "dotenv";

config();

export const configs = {
  PORT: process.env.PORT || 5001,
  DB_URL: process.env.DB_URL,
  FRONT_URL: process.env.FRONT_URL,

  PASSWORD_SALT: process.env.PASSWORD_SALT,

  ACCESS_SECRET: process.env.ACCESS_SECRET,
  ACCESS_EXPIRES_IN: process.env.ACCESS_EXPIRES_IN,
  REFRESH_SECRET: process.env.REFRESH_SECRET,
  REFRESH_EXPIRES_IN: process.env.REFRESH_EXPIRES_IN,

  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
  NO_REPLY_PASSWORD: process.env.NO_REPLY_PASSWORD,

  ACTIVATE_SECRET: process.env.ACTIVATE_SECRET,
  FORGOT_SECRET: process.env.FORGOT_SECRET,

  PRIVAT_BANK_API: process.env.PRIVAT_BANK_API,
};
