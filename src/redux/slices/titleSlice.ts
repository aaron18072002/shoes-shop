import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TitleState = {
    name_title: string;
};

const initialState = {
    name_title: 'lifestyle',
} as TitleState;

export const title = createSlice({
    name: 'title',
    initialState,
    reducers: {
        setTitle: (state, actions: PayloadAction<string>): TitleState => ({
            ...state,
            name_title: actions.payload,
        }),
    },
});

export const { setTitle } = title.actions;
export const titleReducer = title.reducer;
