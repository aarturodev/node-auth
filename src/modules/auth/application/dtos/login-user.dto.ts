export interface LoginUserData {
    email: string;
    password: string;
}

type CreateLoginUserResult =
    | { success: true, data: LoginUserDto }
    | { success: false, error: string }


export class LoginUserDto {
    constructor(
        public readonly email: string,
        public readonly password: string
    ) { }

    static create(input: unknown): CreateLoginUserResult {
        if (typeof input !== "object" || input === null) {
            return {
                success: false,
                error: "Request body must be an object"
            };
        }

        const data = input as Record<string, unknown>;

        if (typeof data.email !== "string" || !data.email.includes("@")) {
            return {
                success: false,
                error: "A valid email is required"
            }
        }

        if (typeof data.password !== "string" || data.password.length < 6) {
            return {
                success: false,
                error: "Password is required"
            }
        }

        return {
            success: true,
            data: new LoginUserDto(
                data.email.trim().toLowerCase(),
                data.password
            )
        }
    }
}