export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}

type CreateRegisterUserResult =
  | { success: true; data: RegisterUserDto }
  | { success: false; error: string };

export class RegisterUserDto {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) {}

  static create(input: unknown): CreateRegisterUserResult {
    if (typeof input !== "object" || input === null) {
      return {
        success: false,
        error: "Request body must be an object",
      };
    }

    const data = input as Record<string, unknown>;

    if (typeof data.name !== "string" || data.name.trim().length === 0) {
      return {
        success: false,
        error: "Name is required",
      };
    }

    if (typeof data.email !== "string" || !data.email.includes("@")) {
      return {
        success: false,
        error: "A valid email is required",
      };
    }

    if (typeof data.password !== "string" || data.password.length < 6) {
      return {
        success: false,
        error: "Password must contain at least 6 characters",
      };
    }

    return {
      success: true,
      data: new RegisterUserDto(
        data.name.trim(),
        data.email.trim().toLowerCase(),
        data.password,
      ),
    };
  }
}
