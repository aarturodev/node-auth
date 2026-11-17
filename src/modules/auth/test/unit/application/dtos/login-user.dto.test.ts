import { expect, it, describe } from "vitest";
import { LoginUserDto } from "../../../../application/dtos/login-user.dto.js";

describe("LoginUserDto", () => {
  it("should create a valid DTO", () => {
    const result = LoginUserDto.create({
      email: "JUAN@GMAIL.COM",
      password: "123456",
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.email).toBe("juan@gmail.com");
      expect(result.data.password).toBe("123456");
    }
  });

  it("should reject an invalid email", () => {
    const result = LoginUserDto.create({
      email: "invalid-email",
      password: "123456",
    });

    expect(result).toEqual({
      success: false,
      error: "A valid email is required",
    });
  });

  it("should reject a short password", () => {
    const result = LoginUserDto.create({
      email: "anderson@gmail.com",
      password: "1234",
    });

    expect(result).toEqual({
      success: false,
      error: "Password is required",
    });
  });
});
