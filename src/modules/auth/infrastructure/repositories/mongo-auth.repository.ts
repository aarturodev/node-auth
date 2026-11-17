import type { UserEntity } from "../../domain/entities/user.entity.js";
import { AuthError } from "../../domain/errors/auth.error.js";
import {
  AuthRepository,
  type LoginUserData,
  type RegisterUserData,
} from "../../domain/repositories/auth.repository.js";
import type { PasswordHasher } from "../../domain/services/password-hasher.service.js";
import { UserModel } from "../database/user.model.js";
import { UserMapper } from "../mappers/user.mapper.js";

export class MongoAuthRepository implements AuthRepository {
  constructor(private readonly passwordHasher: PasswordHasher) {}

  async findById(id: string): Promise<UserEntity> {
    const document = await UserModel.findById(id);

    if (!document) throw AuthError.userNotFound();
    return UserMapper.toDomain(document);
  }

  async register(data: RegisterUserData): Promise<UserEntity> {
    const userAlreadyExists = await UserModel.findOne({ email: data.email });

    if (userAlreadyExists) throw AuthError.userAlreadyExist();

    const hashedPassword = await this.passwordHasher.hash(data.password);

    const document = await UserModel.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      roles: ["USER_ROLE"],
    });

    return UserMapper.toDomain(document);
  }
  async login(data: LoginUserData): Promise<UserEntity> {
    const document = await UserModel.findOne({ email: data.email });

    if (!document) throw AuthError.userNotFound();

    const passwordMatches = await this.passwordHasher.compare(
      data.password,
      document.password,
    );

    if (!passwordMatches) throw AuthError.invalidCredentials();

    return UserMapper.toDomain(document);
  }
}
