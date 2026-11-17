import {
  UserEntity,
  type UserRole,
} from "../../domain/entities/user.entity.js";

interface UserDocument {
  _id: { toString(): string };
  name: string;
  email: string;
  password: string;
  roles: string[];
}

export class UserMapper {
  static toDomain(document: UserDocument): UserEntity {
    return new UserEntity({
      id: document._id.toString(),
      name: document.name,
      email: document.email,
      password: document.password,
      roles: document.roles as UserRole[],
    });
  }
}
