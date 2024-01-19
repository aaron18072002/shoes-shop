import { UserLoginType, UserType } from '@/types/users.type';
import http from '@/utils/http';

export const registerUser = (data: UserType) => {
    return http.post('/users/register', data);
};

export const login = (data: UserLoginType) => {
    return http.post('/users/login', data);
};

export const updateUser = (data: UpdateUser, user_id: string) => {
    return http.patch(`/users/update_user/${user_id}`, data);
};

export const changePassword = (data: ChangePassword, user_id: string) => {
    return http.put(`/users/change_password/${user_id}`, data);
};

export const resetPassword = (data: ResetPasswordType, user_id: string) => {
    return http.post(`/users/reset-password/${user_id}`, data);
};

export const logout = (access_token: string, refresh_token: string) => {
    return http.post('/users/log-out', refresh_token, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
};

export const getUserById = (id: string, refresh_token: string) => {
    const data = http.get(`/users/${id}`, {
        headers: {
            Authorization: `Bearer ${refresh_token}`,
        },
    });
    return data;
};

export const getNewAccessToken = (refresh_token: string) => {
    const data = http.get('/refresh_token', {
        headers: {
            Authorization: `Bearer ${refresh_token}`,
        },
    });
    return data;
};
