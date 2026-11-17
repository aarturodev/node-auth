import bcrypt from "bcryptjs";
import { PasswordHasher } from "../../domain/services/password-hasher.service.js";

export class BcryptPasswordHasher extends PasswordHasher {
  private readonly salt: number = 10;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.salt);
  }
  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
