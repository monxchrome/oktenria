import { model, Schema, Types } from "mongoose";

import {
  EBodyType,
  ECarBrand,
  ECarColor,
  ECarCountry,
  ECarFuel,
  ECarPrice,
  ECarState,
  ECarType,
  ETransportType,
} from "../enums";
import { ICar } from "../types";
import { User } from "./User.model";

export const carSchema = new Schema(
  {
    type: {
      type: String,
      enum: ECarType,
      default: ECarType.new,
    },
    VINCode: {
      type: Boolean,
      default: true,
    },
    stateNumber: {
      type: Boolean,
      default: true,
    },
    transportType: {
      type: String,
      enum: ETransportType,
      required: [true, "transport type is required"],
    },
    bodyType: {
      type: String,
      enum: EBodyType,
      required: [true, "body is required"],
    },
    countryCar: {
      type: String,
      enum: ECarCountry,
      required: [true, "country is required"],
    },
    brand: {
      type: String,
      enum: ECarBrand,
      required: [true, "brand is required"],
    },
    year: {
      type: Number,
      required: [true, "year is required"],
    },
    price: {
      type: String,
      enum: ECarPrice,
      required: [true, "price is required"],
    },
    currency: {
      type: Number,
      required: [true, "currency is required"],
    },
    country: {
      type: String,
      required: [true, "country is required"],
    },
    city: {
      type: String,
      required: [true, "city is required"],
    },
    state: {
      type: String,
      enum: ECarState,
      required: [true, "state is required"],
    },
    credit: {
      type: Boolean,
      required: [true, "credit is required"],
    },
    fuel_consumption_per_100_km: {
      type: Number,
      required: [true, "fuel_consumption_per_100_km is required"],
    },
    engine_capacity: {
      type: Number,
      required: [true, "engine_capacity is required"],
    },
    power: {
      type: Number,
      required: [true, "power is required"],
    },
    mileage: {
      type: Number,
      required: [true, "mileage is required"],
    },
    number_of_doors: {
      type: Number,
      required: [true, "number_of_doors is required"],
    },
    number_of_seats: {
      type: Number,
      required: [true, "number_of_seats is required"],
    },
    fuel: {
      type: String,
      enum: ECarFuel,
      required: [true, "fuel is required"],
    },
    color: {
      type: String,
      enum: ECarColor,
      required: [true, "color is required"],
    },
    user: {
      type: Types.ObjectId,
      required: [true, "REF: User is required"],
      ref: User,
    },
    photo: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

export const Car = model<ICar>("car", carSchema);
