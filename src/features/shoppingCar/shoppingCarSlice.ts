import {createSlice} from "@reduxjs/toolkit";
import {ShoppingCarState} from "../../interfaces/ShoppingCar/shopping-car.interfaces.ts";


const initialState: ShoppingCarState = {
    value: {
        products: [],
        total: 0
    }
}

export const shoppingCarSlice = createSlice({
    name: 'shoppingCar',
    initialState,
    reducers: {
        insertProduct: (state, action) => {

            if (state.value.products.find((item) => item.product.product_id === action.payload.product_id)) {
                state.value = {
                    ...state,
                    products: state.value.products.map((item) => {
                        if (item?.product?.product_id === action.payload.product_id) {
                            return {
                                ...item,
                                quantity: item.quantity + 1
                            }
                        }
                        return item
                    }),
                    total: state.value.total + action.payload.price
                }
            } else {
                const newProduct = {
                    product: action.payload,
                    quantity: 1
                }

                state.value = {
                    ...state,
                    products: [...state.value.products, newProduct],
                    total: state.value.total + action.payload.price
                }
            }
        },
        deleteProduct: (state, action) => {

            const product = state.value.products.find(e => e.product.product_id === action.payload.product_id)

            if (product) {
                state.value = {
                    ...state,
                    total: state.value.total - (product.quantity * product.product.price),
                    products: state.value.products.filter((item) => item.product.product_id !== action.payload.product_id)

                }
            }
        },
        reduceQuantity: (state, action) => {
            const product = state.value.products.find(e => e.product.product_id === action.payload.product_id)
            if (product && product.quantity > 1) {
                state.value = {
                    ...state,
                    products: state.value.products.map((item) => {
                        if (item.product.product_id === action.payload.product_id) {
                            if (item.quantity > 0) {
                                return {
                                    ...item,
                                    quantity: item.quantity - 1
                                }
                            }
                        }
                        return item
                    }),
                    total: state.value.total - action.payload.price
                }
            }
        }
        ,
        clearShoppingCar: (state) => {
            state.value = {
                ...state,
                products: [],
                total: 0
            }
        }
    }
})

export const {insertProduct, deleteProduct, clearShoppingCar, reduceQuantity} = shoppingCarSlice.actions

export default shoppingCarSlice.reducer