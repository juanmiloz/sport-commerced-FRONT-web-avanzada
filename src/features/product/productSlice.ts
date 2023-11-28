import {createSlice} from "@reduxjs/toolkit";
import {ProductState} from "../../interfaces/Product/product.interfaces.ts";


const initialState : ProductState = {
    value: null
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        insertProduct: (state, action) => {
            state.value = {
                product_id: action.payload.product_id,
                name: action.payload.name,
                subtitle: action.payload.subtitle,
                description: action.payload.description,
                price: action.payload.price,
                calification: action.payload.calification,
                brand_id: action.payload.brand_id,
                image_url: action.payload.image_url,
                brand: action.payload.brand,
            }
        },
        deleteProduct: (state) => {
            state.value = null
        },
    }
})

export const {insertProduct, deleteProduct}= productSlice.actions

export default productSlice.reducer