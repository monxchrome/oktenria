import { model, Schema } from "mongoose";

import { EUserAccount, EUserRole, EUserStatus } from "../enums";
import { IUser } from "../types";

export const userSchema = new Schema(
  {
    count: {
      type: Number,
      default: 0,
    },
    firstName: {
      type: String,
      required: [true, "Name is required"],
    },
    surname: {
      type: String,
      required: [true, "Name is required"],
    },
    patronymic: {
      type: String,
      required: [true, "Patronymic is required"],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    status: {
      type: String,
      enum: EUserStatus,
      default: EUserStatus.inactive,
    },
    account: {
      type: String,
      enum: EUserAccount,
      default: EUserAccount.base,
    },
    role: {
      type: String,
      enum: EUserRole,
      default: EUserRole.buyer,
    },
    premiumExpiration: {
      type: Date,
    },
    auto_show: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

export const User = model<IUser>("user", userSchema);
