import jwt from "jsonwebtoken";
import { TokenService } from "../../domain/services/token.service.js";
import { envs } from "../../../../shared/config/envs.js";

export class JwtTokenService extends TokenService {
  async generate(payload: { userId: string }): Promise<string> {
    return jwt.sign(payload, envs.JWT_SECRET, { expiresIn: "2h" });
  }

  async verify(token: string): Promise<{ userId: string } | null> {
    try {
      const payload = jwt.verify(token, envs.JWT_SECRET);

      if (
        typeof payload === "object" &&
        payload !== null &&
        "userId" in payload &&
        typeof payload.userId === "string"
      ) {
        return {
          userId: payload.userId,
        };
      }
      return null;
    } catch (error) {
      return null;
    }
  }
}
