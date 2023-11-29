import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "../../features/auth/authSlice.ts";
import shoppingCarReducer from "../../features/shoppingCar/shoppingCarSlice.ts";
import thunk from "redux-thunk";
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['authState','shoppingCarState']
}

const rootReducer = combineReducers({
    authState: authReducer,
    shoppingCarState: shoppingCarReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware: [thunk]
})