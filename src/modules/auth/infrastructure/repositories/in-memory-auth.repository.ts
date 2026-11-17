import { randomUUID } from "node:crypto";
import { UserEntity } from "../../domain/entities/user.entity.js";
import type {
  AuthRepository,
  LoginUserData,
  RegisterUserData,
} from "../../domain/repositories/auth.repository.js";
import { AuthError } from "../../domain/errors/auth.error.js";
import type { PasswordHasher } from "../../domain/services/password-hasher.service.js";

export class InMemoryAuthRepository implements AuthRepository {
  constructor(private readonly passwordHasher: PasswordHasher) {}

  private readonly user: UserEntity[] = [];

  async register(data: RegisterUserData): Promise<UserEntity> {
    const useAlreadyExist = this.user.some((user) => user.email == data.email);

    if (useAlreadyExist) {
      throw AuthError.userAlreadyExist();
    }

    const user = new UserEntity({
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: await this.passwordHasher.hash(data.password),
      roles: ["USER_ROLE"],
    });
    this.user.push(user);

    return Promise.resolve(user);
  }

  async login(data: LoginUserData): Promise<UserEntity> {
    const user = this.user.find((user) => user.email == data.email);

    if (!user) throw AuthError.userNotFound();

    const passwordMatches = await this.passwordHasher.compare(
      data.password,
      user.password,
    );

    if (!passwordMatches) throw AuthError.invalidCredentials();

    return Promise.resolve(user);
  }
}
