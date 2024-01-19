import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface DetailFavoutiteProduct {
    id: string;
    name: string;
    color: string;
    price: number;
    image: string;
}

const productsArr: DetailFavoutiteProduct[] = [];

export const favouriteSlice = createSlice({
    name: 'favourite',
    initialState: {
        favourite: productsArr,
    },
    reducers: {
        addToFavourite: (state, action: PayloadAction<DetailFavoutiteProduct>) => {
            const itemInFavourite = state.favourite.find((item) => item.id === action.payload.id);
            if (itemInFavourite) {
                return;
            }
            state.favourite.push({
                ...action.payload,
            });
        },
        removeItem: (state, action) => {
            const removeItem = state.favourite.filter((item) => item.id !== action.payload);
            state.favourite = removeItem;
        },
    },
});

export const { addToFavourite, removeItem } = favouriteSlice.actions;
export const favouriteReducer = favouriteSlice.reducer;
