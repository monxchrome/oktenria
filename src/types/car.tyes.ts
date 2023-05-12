import { Types } from "mongoose";

import { IUser } from "./user.types";

export interface ICar {
  _id?: string;
  type: string;
  VINCode: boolean;
  stateNumber: boolean;
  transportType: string;
  bodyType: string;
  countryCar: string;
  brand: string;
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
  user: IUser | Types.ObjectId;
}
