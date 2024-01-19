import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DetailProduct {
    id: string;
    product_id: string;
    name: string;
    size: string;
    color: string;
    price: number;
    image: string;
    quantity: number;
}

const productsArr: DetailProduct[] = [];

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: productsArr,
    },
    reducers: {
        addToCart: (state, action: PayloadAction<DetailProduct>) => {
            const itemInCart = state.cart.find((item) => item.id === action.payload.id);
            if (itemInCart) {
                itemInCart.quantity += action.payload.quantity;
            } else {
                state.cart.push({
                    ...action.payload,
                });
            }
        },
        removeItem: (state, action) => {
            const removeItem = state.cart.filter((item) => item.id !== action.payload);
            state.cart = removeItem;
        },
        incrementQuantity: (state, action: PayloadAction<string>) => {
            const item = state.cart.find((item) => item.id === action.payload);
            if (item) {
                item.quantity++;
            }
        },
        decrementQuantity: (state, action: PayloadAction<string>) => {
            const item = state.cart.find((item) => item.id === action.payload);
            if (item?.quantity === 1) {
                item.quantity = 1;
            } else if (item) {
                item.quantity--;
            }
        },
        clearCart: (state) => {
            state.cart = [];
        },
    },
});

export const { addToCart, removeItem, incrementQuantity, decrementQuantity, clearCart } =
    cartSlice.actions;
export const cartReducer = cartSlice.reducer;
