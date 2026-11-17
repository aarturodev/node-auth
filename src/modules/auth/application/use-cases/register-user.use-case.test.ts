import { describe, expect, it } from "vitest";
import {
  AuthRepository,
  type LoginUserData,
  type RegisterUserData,
} from "../../domain/repositories/auth.repository.js";
import { UserEntity } from "../../domain/entities/user.entity.js";
import { TokenService } from "../../domain/services/token.service.js";
import { RegisterUserUseCase } from "./register-user.use-case.js";

class FakeAuthRepository extends AuthRepository {
  register(data: RegisterUserData): Promise<UserEntity> {
    const user = new UserEntity({
      id: "User-1",
      name: data.name,
      email: data.email,
      password: data.password,
      roles: ["USER_ROLE"],
    });

    return Promise.resolve(user);
  }

  login(data: LoginUserData): Promise<UserEntity> {
    throw new Error("Method not implemented.");
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

describe("RegisterUserUseCase", () => {
  it("should regiter a user and return an authenticated token", async () => {
    const repository = new FakeAuthRepository();
    const tokenService = new FakeTokenService();

    const useCase = new RegisterUserUseCase(repository, tokenService);

    const result = await useCase.execute({
      name: "Juan",
      email: "juan@gmail.com",
      password: "123456",
    });

    expect(result).toEqual({
      token: "fake-token",
      user: {
        id: "User-1",
        name: "Juan",
        email: "juan@gmail.com",
        roles: ["USER_ROLE"],
      },
    });
  });
});
