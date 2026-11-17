import type { UserRole } from "../../domain/entities/user.entity.js";

export interface AuthResult {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    roles: UserRole[];
  };
}
