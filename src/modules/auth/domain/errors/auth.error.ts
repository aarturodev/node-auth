export class AuthError extends Error {
    constructor(
        message: string,
        public readonly statusCode: number
    ) {
        super(message);
        this.name = "AuthError";
    }

    static userAlreadyExist(): AuthError {
        return new AuthError(
            "User already exist",
            409
        );
    }

    static userNotFound(): AuthError {
        return new AuthError(
            "User not found",
            404
        );
    }

    static invalidCredentials(): AuthError {
        return new AuthError(
            "Invalid credentials",
            401
        );
    }
}