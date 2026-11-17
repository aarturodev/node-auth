import { describe, expect, it } from "vitest";
import { LoginUserUseCase } from "../../../../application/use-cases/login-user.use-case.js";
import { UserEntity } from "../../../../domain/entities/user.entity.js";
import {
  AuthRepository,
  type RegisterUserData,
  type LoginUserData,
} from "../../../../domain/repositories/auth.repository.js";
import { TokenService } from "../../../../domain/services/token.service.js";

class FakeAuthRepository extends AuthRepository {
  register(data: RegisterUserData): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
  login(data: LoginUserData): Promise<UserEntity> {
    const user = new UserEntity({
      id: "user-1",
      name: "Juan",
      email: data.email,
      password: "hashed-password",
      roles: ["USER_ROLE"],
    });

    return Promise.resolve(user);
  }

  findById(id: string): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
}

class FakeTokenService extends TokenService {
  generate(payload: { userId: string }): Promise<string> {
    return Promise.resolve("fake-token");
  }
  verify(token: string): Promise<{ userId: string } | null> {
    return Promise.resolve(null);
  }
}

describe("LoginUserUseCase", () => {
  it("should authenticate a user and return a token", async () => {
    const repository = new FakeAuthRepository();
    const tokenService = new FakeTokenService();

    const useCase = new LoginUserUseCase(repository, tokenService);

    const result = await useCase.execute({
      email: "juan@gmail.com",
      password: "123456",
    });

    expect(result).toEqual({
      token: "fake-token",
      user: {
        id: "user-1",
        name: "Juan",
        email: "juan@gmail.com",
        roles: ["USER_ROLE"],
      },
    });
  });
});
