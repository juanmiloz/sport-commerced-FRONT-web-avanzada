import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../../features/auth/authSlice.ts";
import productReducer from "../../features/product/productSlice.ts"


export const store = configureStore({
    reducer:{
        auth: authReducer,
        product: productReducer
    }
})