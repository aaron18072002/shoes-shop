export interface UserType {
    name: string;
    email: string;
    password: string;
    gender: string;
    role?: string;
}

export interface UserLoginType {
    email: string;
    password: string;
}
