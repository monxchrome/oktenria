import { Schema, Types } from "mongoose";

import { EBodyType } from "../enums/car-body-type.enum";
import { ECarBrand } from "../enums/car-brand.enum";
import { ECarColor } from "../enums/car-color.enum";
import { ECarCountry } from "../enums/car-country.enum";
import { ECarFuel } from "../enums/car-fuel.enum";
import { ECarState } from "../enums/car-state.enum";
import { ETransportType } from "../enums/car-transport-type.enum";
import { ECarType } from "../enums/car-type.enum";
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
      type: Number,
      required: [true, "price is required"],
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
  },
  { versionKey: false, timestamps: true }
);
