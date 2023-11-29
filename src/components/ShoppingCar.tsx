import React, {ReactNode} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {StateSchema} from "../interfaces/Auth/auth.interfaces.ts";
import {
    ShoppingCarProductInterface,
    StateSchema as ShoppingCarStateSchema
} from "../interfaces/ShoppingCar/shopping-car.interfaces.ts";
import {MdAdd, MdHorizontalRule, MdDeleteForever} from "react-icons/md";
import {ProductInterfaces} from "../interfaces/Product/product.interfaces.ts";
import {deleteProduct, insertProduct, reduceQuantity} from "../features/shoppingCar/shoppingCarSlice.ts";

interface Props {
    children: ReactNode
}

const ShoppingCar: React.FC<Props> = ({children}) => {
    const user = useSelector((state: StateSchema) => state.authState.value)
    const {products, total} = useSelector((state: ShoppingCarStateSchema) => state.shoppingCarState.value)


    const dispatch = useDispatch()

    if (user === null)
        return (children)

    const onDeleteProduct = (product: ProductInterfaces) => {
        dispatch(deleteProduct(product))
    }

    const onDecreaseProductQuantity = (product: ProductInterfaces) => {
        dispatch(reduceQuantity(product))
    }

    const onIncreaseProductQuantity = (product: ProductInterfaces) => {
        dispatch(insertProduct(product))
    }

    return (
        <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle"/>
            <div className="drawer-content">
                {children}
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="w-96 min-h-full bg-gray-200 text-base-content relative">
                    <div className={"sticky top-0 z-10 bg-app-200"}>
                        <h3 className={"normal-case text-2xl text-white text-center py-5"}>Shopping Car</h3>
                    </div>
                    <div className={"flex flex-col gap-3 px-4 mt-4"}>
                        {(products.length > 0) ? products.map((carElement: ShoppingCarProductInterface, idx: number) => {
                            return (
                                <div key={idx} className="card shadow compact bg-white">
                                    <div className="justify-between card-body">
                                        <h2 className="card-title text-app-700">{carElement?.product?.name}</h2>
                                        <p className="text-end text-lg text-app-700/80">{new Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: 'USD'
                                        }).format(carElement?.product?.price)}</p>
                                        <p className="text-end text-lg text-app-700">{`Total: ${new Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: 'USD'
                                        }).format(carElement.quantity * carElement?.product?.price)}`}</p>
                                        <div className="justify-between card-actions">
                                            <div className={"flex items-center"}>
                                                <button
                                                    onClick={() => onDecreaseProductQuantity(carElement?.product)}
                                                    className={"btn btn-ghost btn-circle" + (carElement?.quantity === 1 ? " btn-disabled" : "")}>
                                                    <MdHorizontalRule color={'black'} className={'h-7 w-7'}/>
                                                </button>
                                                <label className={"text-app-700 text-center mx-3"}>{carElement?.quantity}</label>
                                                <button
                                                    onClick={() => onIncreaseProductQuantity(carElement?.product)}
                                                    className={"btn btn-ghost btn-circle"}>
                                                    <MdAdd color={'black'} className={'h-7 w-7'}/>
                                                </button>
                                            </div>
                                            <button className="btn btn-ghost btn-circle"
                                                    onClick={() => onDeleteProduct(carElement?.product)}>
                                                <MdDeleteForever color={'red'} className={'h-7 w-7'}/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : <h1 className={"text-center text-app-700"}>No hay productos en tu carrito de compras</h1>}

                        {products.length > 0 && (
                            <div className={"sticky bottom-0 z-10 bg-gray-200"}>
                                <div className={"flex justify-between mx-3"}>
                                    <h3 className={"normal-case text-2xl text-app-700 pt-5 pb-3"}>Total:</h3>
                                    <h3 className={"normal-case text-2xl text-app-700 pt-5 pb-3"}>{new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD'
                                    }).format(total)}</h3>
                                </div>
                                <div className={"mb-4"}>
                                    <Link to={"/sport-commerce/checkout-middleware"}>
                                        <button className={"btn btn-primary btn-block"} >Checkout</button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCar;
