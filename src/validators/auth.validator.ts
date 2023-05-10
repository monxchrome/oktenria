import Joi from "joi";

import { regexConstants } from "../config/constants/regex.constants";

export class AuthValidator {
  private static email = Joi.string()
    .regex(regexConstants.EMAIL)
    .lowercase()
    .trim();
  private static password = Joi.string().regex(regexConstants.PASSWORD);

  static loginUser = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
}
