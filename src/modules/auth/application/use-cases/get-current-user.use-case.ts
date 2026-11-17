import type { UserEntity } from "../../domain/entities/user.entity.js";
import type { AuthRepository } from "../../domain/repositories/auth.repository.js";

export class GetCurrentUserUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(userId: string): Promise<UserEntity> {
    return this.authRepository.findById(userId);
  }
}
