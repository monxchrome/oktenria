import { Types } from "mongoose";

import { IUser } from "./user.types";

export interface ICar {
  _id?: Types.ObjectId;
  type: string;
  VINCode: boolean;
  stateNumber: boolean;
  transportType: string;
  bodyType: string;
  countryCar: string;
  brand: string;
  model: string;
  year: number;
  price: string;
  currency: number;
  country: string;
  city: string;
  state: string;
  credit: boolean;
  fuel_consumption_per_100_km: number;
  engine_capacity: number;
  power: number;
  mileage: number;
  number_of_doors: number;
  number_of_seats: number;
  fuel: number;
  color: string;
  photo?: string;
  avg_price?: number;
  user: IUser | Types.ObjectId;
}
