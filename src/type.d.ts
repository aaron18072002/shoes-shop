interface DetailProduct {
    id: string;
    name: string;
    size: string;
    color: string;
    price: string;
    image: string;
    quantity: number;
}

interface UpdateUser {
    name: string;
    gender: string;
}

interface ChangePassword {
    old_password: string;
    password: string;
    confirm_password: string;
}

interface ResetPasswordType {
    password: string;
    confirm_password: string;
}

type UserDecodedType = {
    exp: number;
    iat: number;
    role: number;
    userId: string;
};
