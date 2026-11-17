import type {
  AuthRepository,
  LoginUserData,
} from "../../domain/repositories/auth.repository.js";
import type { TokenService } from "../../domain/services/token.service.js";
import type { AuthResult } from "../models/auth-result.js";

export class LoginUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly tokenService: TokenService,
  ) {}

  async execute(data: LoginUserData): Promise<AuthResult> {
    const user = await this.authRepository.login(data);

    const token = await this.tokenService.generate({ userId: user.id });

    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles,
      },
    };
  }
}
