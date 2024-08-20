import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import authSlice from "./features/authSlice";
import productSlice from "./features/productSlice";
import categorySlice from "./features/categorySlice";

const rootReducer = combineReducers({
    auth:authSlice,
    product:productSlice,
    category:categorySlice,
})
const persistConfig = {
    key:'bsstore_redux',
    storage
}
const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer : persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
})

export const persistor = persistStore(store);