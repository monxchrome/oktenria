import Joi from "joi";

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

export class CarValidator {
  private static type = Joi.valid(...Object.values(ECarType));
  private static VINCode = Joi.boolean();
  private static stateNumber = Joi.boolean();
  private static transportType = Joi.valid(...Object.values(ETransportType));
  private static bodyType = Joi.valid(...Object.values(EBodyType));
  private static countryCar = Joi.valid(...Object.values(ECarCountry));
  private static brand = Joi.valid(...Object.values(ECarBrand));
  private static model = Joi.string().max(255).min(1);
  private static year = Joi.number().min(1990).max(new Date().getFullYear());
  private static price = Joi.valid(...Object.values(ECarPrice));
  private static currency = Joi.number();
  private static country = Joi.string();
  private static city = Joi.string();
  private static state = Joi.valid(...Object.values(ECarState));
  private static credit = Joi.boolean();
  private static fuel_consumption_per_100_km = Joi.number();
  private static engine_capacity = Joi.number();
  private static power = Joi.number();
  private static mileage = Joi.number();
  private static number_of_doors = Joi.number().min(1).max(10);
  private static number_of_seats = Joi.number().min(1);
  private static fuel = Joi.valid(...Object.values(ECarFuel));
  private static color = Joi.valid(...Object.values(ECarColor));

  static create = Joi.object({
    type: this.type,
    VINCode: this.VINCode,
    stateNumber: this.stateNumber,
    transportType: this.transportType.required(),
    bodyType: this.bodyType.required(),
    countryCar: this.countryCar.required(),
    brand: this.brand.required(),
    model: this.model.required(),
    year: this.year.required(),
    price: this.price.required(),
    currency: this.currency.required(),
    country: this.country.required(),
    city: this.city.required(),
    state: this.state.required(),
    credit: this.credit.required(),
    fuel_consumption_per_100_km: this.fuel_consumption_per_100_km.required(),
    engine_capacity: this.engine_capacity.required(),
    power: this.power.required(),
    mileage: this.mileage.required(),
    number_of_doors: this.number_of_doors.required(),
    number_of_seats: this.number_of_seats.required(),
    fuel: this.fuel.required(),
    color: this.color.required(),
  });

  static update = Joi.object({
    bodyType: this.bodyType,
    year: this.year,
    price: this.price,
    currency: this.currency,
    country: this.country,
    city: this.city,
    state: this.state,
    credit: this.credit,
    fuel_consumption_per_100_km: this.fuel_consumption_per_100_km,
    engine_capacity: this.engine_capacity,
    power: this.power,
    mileage: this.mileage,
    color: this.color,
  });
}
