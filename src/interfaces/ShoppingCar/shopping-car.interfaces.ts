import {ProductInterfaces} from "../Product/product.interfaces.ts";


export interface ShoppingCarProductInterface {
    product: ProductInterfaces,
    quantity: number
}


export interface ShoppingCarInterface {
    products: ShoppingCarProductInterface[],
    total: number
}

export interface ShoppingCarState  {
    value:{
        products: ShoppingCarProductInterface[],
        total: number
    };
}

export interface StateSchema  {
    shoppingCar: {
        value:{
            products: ShoppingCarProductInterface[]
            total: number
        }
    }
}