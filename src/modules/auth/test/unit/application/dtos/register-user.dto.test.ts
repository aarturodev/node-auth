import { describe, it, expect } from "vitest";
import { RegisterUserDto } from "../../../../application/dtos/register-user.dto.js";

describe("RegisterUserDto", () => {
  it("should create a valid DTO", () => {
    const result = RegisterUserDto.create({
      name: " Juan ",
      email: "JUAN@GMAIL.COM",
      password: "123456",
    });

    expect(result.success).toEqual(true);

    if (result.success) {
      expect(result.data.name).toBe("Juan");
      expect(result.data.email).toBe("juan@gmail.com");
      expect(result.data.password).toBe("123456");
    }
  });
  it("should reject an empty name", () => {
    const result = RegisterUserDto.create({
      name: "",
      email: "anderson@gmail.com",
      password: "123456",
    });

    expect(result).toEqual({
      success: false,
      error: "Name is required",
    });
  });

  it("should reject an invalid email", () => {
    const result = RegisterUserDto.create({
      name: " Juan ",
      email: "invalid-email",
      password: "123456",
    });

    expect(result).toEqual({
      success: false,
      error: "A valid email is required",
    });
  });

  it("should reject a short password", () => {
    const result = RegisterUserDto.create({
      name: " Juan ",
      email: "anderson@gmail.com",
      password: "123",
    });

    expect(result).toEqual({
      success: false,
      error: "Password must contain at least 6 characters",
    });
  });
});
