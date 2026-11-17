export type UserRole = "USER_ROLE" | "ADMIN_ROLE";

export interface UserProps {
    id: string;
    name: string;
    email: string;
    password: string;
    roles: UserRole[];
}

export class UserEntity {
    public readonly id: string;
    public readonly name: string;
    public readonly email: string;
    public readonly password: string;
    public readonly roles: UserRole[];

    constructor(props: UserProps) {
        this.id = props.id;
        this.name = props.name;
        this.email = props.email;
        this.password = props.password;
        this.roles = props.roles;
    }
}