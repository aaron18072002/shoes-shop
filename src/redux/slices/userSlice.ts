import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UserState {
    name: string;
    email: string;
    avatar_img: string;
    role: number;
    gender: string;
    access_token: string;
    refresh_token: string;
}

const initialState: UserState = {
    name: '',
    email: '',
    avatar_img: '',
    role: 2,
    gender: 'male',
    access_token: '',
    refresh_token: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: initialState,
    },
    reducers: {
        updateUser: (state, action: PayloadAction<UserState>) => {
            const { name, email, access_token, avatar_img, role, refresh_token, gender } =
                action.payload;
            state.user.name = name;
            state.user.email = email;
            state.user.avatar_img = avatar_img;
            state.user.role = role;
            state.user.gender = gender;
            state.user.access_token = access_token;
            state.user.refresh_token = refresh_token;
        },
        resetUser: (state) => {
            (state.user.name = ''),
                (state.user.email = ''),
                (state.user.avatar_img = ''),
                (state.user.role = 2),
                (state.user.gender = '');
            state.user.access_token = '';
            state.user.refresh_token = '';
        },
    },
});

export const { updateUser, resetUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
