import {useDispatch, useSelector} from "react-redux";
import {StateSchema as ShoppingCarStateSchema} from "../interfaces/ShoppingCar/shopping-car.interfaces.ts";
import {MdDeleteForever} from "react-icons/md";
import {ProductInterfaces} from "../interfaces/Product/product.interfaces.ts";
import {deleteProduct} from "../features/shoppingCar/shoppingCarSlice.ts";

export const SummaryCard = () => {

    const {products} = useSelector((state: ShoppingCarStateSchema) => state.shoppingCarState.value)

    const dispatch = useDispatch()

    const onDeleteProduct = (product: ProductInterfaces) => {
        dispatch(deleteProduct(product))
    }


    return (
        <div className="card shadow-lg p-6 bg-white">
            <p className="text-app-700 text-xl">Resumen de la orden</p>
            <div className="divider"></div>
            <div className="overflow-x-auto">
                <table className="table text-app-700">
                    {/* head */}
                    <thead className={"text-app-700 font-bold"}>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {products && products.map((product, idx) => (
                        <tr key={idx}>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={product.product.image_url}
                                                 alt={product.product.name}/>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{product.product.name}</div>
                                        <div className="text-sm opacity-50">{product.product.subtitle}</div>
                                    </div>
                                </div>
                            </td>

                            <td>{new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD'
                            }).format(product.product.price)}</td>
                            <td>{product.quantity}</td>
                            <td>{new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD'
                            }).format(product.product.price * product.quantity)}</td>
                            <td>
                                <button className="btn btn-ghost btn-circle" onClick={() => {
                                    onDeleteProduct(product.product)
                                }}>
                                    <MdDeleteForever color={'red'} className={'h-7 w-7'}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>

                </table>
            </div>

        </div>
    )
}

export default SummaryCard;