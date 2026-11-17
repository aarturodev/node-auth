import type { Request, Response } from "express";
import type { RegisterUserUseCase } from "../../../application/use-cases/register-user.use-case.js";
import { RegisterUserDto } from "../../../application/dtos/register-user.dto.js";
import { LoginUserUseCase } from "../../../application/use-cases/login-user.use-case.js";
import { LoginUserDto } from "../../../application/dtos/login-user.dto.js";
import { AuthError } from "../../../domain/errors/auth.error.js";
import type { GetCurrentUserUseCase } from "../../../application/use-cases/get-current-user.use-case.js";

export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly getCurrentUserUseCase: GetCurrentUserUseCase,
  ) {}

  getCurrentUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req.auth?.userId;
    if (!userId) {
      res.status(401).json({
        error: "User is not authenticated",
      });
      return;
    }

    try {
      const user = await this.getCurrentUserUseCase.execute(userId);
      res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles,
      });
    } catch (error) {
      this.handleError(error, res);
    }
  };

  register = async (req: Request, res: Response): Promise<void> => {
    const result = RegisterUserDto.create(req.body);

    if (!result.success) {
      res.status(400).json({
        error: result.error,
      });

      return;
    }

    try {
      const user = await this.registerUserUseCase.execute(result.data);

      res.status(201).json(user);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    const result = LoginUserDto.create(req.body);

    if (!result.success) {
      res.status(400).json({
        error: result.error,
      });
      return;
    }

    try {
      const user = await this.loginUserUseCase.execute(result.data);

      res.status(200).json(user);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  private handleError(error: unknown, res: Response): void {
    if (error instanceof AuthError) {
      res.status(error.statusCode).json({
        error: error.message,
      });

      return;
    }

    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
