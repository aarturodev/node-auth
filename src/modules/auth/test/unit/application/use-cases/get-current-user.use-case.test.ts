import { describe, expect, it } from "vitest";
import { GetCurrentUserUseCase } from "../../../../application/use-cases/get-current-user.use-case.js";
import { UserEntity } from "../../../../domain/entities/user.entity.js";
import {
  AuthRepository,
  type RegisterUserData,
  type LoginUserData,
} from "../../../../domain/repositories/auth.repository.js";

class FakeAuthRepository extends AuthRepository {
  register(_data: RegisterUserData): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
  login(_data: LoginUserData): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<UserEntity> {
    const user = new UserEntity({
      id: id,
      name: "Juan",
      email: "juan@gmail.com",
      password: "hashed-password",
      roles: ["USER_ROLE"],
    });

    return Promise.resolve(user);
  }
}

describe("GetCurrentUserUseCase", () => {
  it("should get a user", async () => {
    const repository = new FakeAuthRepository();

    const useCase = new GetCurrentUserUseCase(repository);

    const result = await useCase.execute("user-1");

    expect(result).toEqual({
      id: "user-1",
      name: "Juan",
      email: "juan@gmail.com",
      password: "hashed-password",
      roles: ["USER_ROLE"],
    });
  });
});
