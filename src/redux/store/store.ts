import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../../features/auth/authSlice.ts";
import productReducer from "../../features/product/productSlice.ts"
import shoppingCarReducer from "../../features/shoppingCar/shoppingCarSlice.ts";

export const store = configureStore({
    reducer:{
        auth: authReducer,
        product: productReducer
        shoppingCar: shoppingCarReducer,
    }
})