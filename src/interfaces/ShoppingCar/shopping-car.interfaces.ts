import {ProductInterfaces} from "../Product/product.interfaces.ts";


interface ShoppingCarProductInterface {
    product: ProductInterfaces,
    quantity: number
}


export interface ShoppingCarInterface {
    products: ShoppingCarProductInterface[]
}

export interface ShoppingCarState  {
    value:{
        products: ShoppingCarProductInterface[]
    };
}

export interface StateSchema  {
    shoppingCar: {
        value:{
            products: ShoppingCarProductInterface[]
        }
    }
}