import bcrypt from "bcrypt";

import { configs } from "../config";

class OAuthService {
  public async hash(password: string): Promise<string> {
    return bcrypt.hash(password, +configs.PASSWORD_SALT);
  }

  public async compare(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}

export const oauthService = new OAuthService();
