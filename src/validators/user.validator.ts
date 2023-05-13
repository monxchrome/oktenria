import Joi from "joi";

import { regexConstants } from "../config/constants";
import { EUserAccount, EUserStatus } from "../enums";

export class UserValidator {
  private static firstName = Joi.string().max(25).trim();
  private static surname = Joi.string().max(30).trim();
  private static patronymic = Joi.string().max(40).trim();
  private static age = Joi.number().max(150);
  private static email = Joi.string()
    .regex(regexConstants.EMAIL)
    .lowercase()
    .trim();
  private static phone = Joi.string().regex(regexConstants.PHONE);
  private static password = Joi.string().regex(regexConstants.PASSWORD);
  private static status = Joi.valid(...Object.values(EUserStatus));
  private static account = Joi.valid(...Object.values(EUserAccount));

  static create = Joi.object({
    firstName: this.firstName.required(),
    surname: this.surname.required(),
    patronymic: this.patronymic.required(),
    age: this.age.required(),
    email: this.email.required(),
    phone: this.phone.required(),
    password: this.password.required(),
    status: this.status,
    account: this.account,
  });

  static update = Joi.object({
    password: this.password,
    phone: this.phone,
    email: this.email,
  });

  static changePassword = Joi.object({
    oldPassword: this.password,
    newPassword: this.password,
  });

  static changeEmail = Joi.object({
    oldEmail: this.email,
    newEmail: this.email,
    password: this.password,
  });

  static forgotPassword = Joi.object({
    password: this.password,
  });
}
