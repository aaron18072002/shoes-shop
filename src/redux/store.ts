import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

import headerReducer from './slices/headerSlice';
import { titleReducer } from './slices/titleSlice';
import { cartReducer } from './slices/cartSlice';
import { favouriteReducer } from './slices/favouriteSlice';
import { userReducer } from './slices/userSlice';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedFavouriteReducer = persistReducer(persistConfig, favouriteReducer);
const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: {
        header: headerReducer,
        cart: persistedCartReducer,
        favourite: persistedFavouriteReducer,
        title: titleReducer,
        user: persistedUserReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
