import type { UserEntity } from "../entities/user.entity.js";

export interface RegisterUserData {
    name: string;
    email: string;
    password: string;
}

export interface LoginUserData {
    email: string;
    password: string;
}

export abstract class AuthRepository {
    abstract register(data: RegisterUserData): Promise<UserEntity>;
    abstract login(data: LoginUserData): Promise<UserEntity>;
}