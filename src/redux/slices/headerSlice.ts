import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type HeaderState = {
    sticky: boolean;
};

const initialState = {
    sticky: false,
} as HeaderState;

export const header = createSlice({
    name: 'header',
    initialState,
    reducers: {
        setFixed: (state, actions: PayloadAction<boolean>) => ({
            ...state,
            sticky: actions.payload,
        }),
    },
});

export const { setFixed } = header.actions;
export default header.reducer;
