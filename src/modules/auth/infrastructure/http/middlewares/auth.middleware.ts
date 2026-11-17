import type { NextFunction, Request, Response } from "express";
import type { TokenService } from "../../../domain/services/token.service.js";

export class AuthMiddleware {
  constructor(private readonly tokenService: TokenService) {}

  validate = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const authorization = req.header("Authorization");

    if (!authorization) {
      res.status(401).json({
        error: "Authorization token is required",
      });
      return;
    }

    if (!authorization.startsWith("Bearer ")) {
      res.status(401).json({
        error: "Invalid authorization format",
      });
      return;
    }

    const token = authorization.substring("Bearer ".length).trim();

    if (!token) {
      res.status(401).json({
        error: "Token is required",
      });
      return;
    }

    const payload = await this.tokenService.verify(token);

    if (!payload) {
      res.status(401).json({
        error: "Invalid or expired token",
      });
      return;
    }

    req.auth = {
      userId: payload.userId,
    };

    next();
  };
}
