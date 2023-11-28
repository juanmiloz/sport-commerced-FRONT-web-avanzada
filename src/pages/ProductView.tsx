import '../App.css';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ProductInterfaces, StateSchemaProduct} from "../interfaces/Product/product.interfaces.ts";
import {CRUDService, PRODUCTS} from "../config/axios.ts";
import {setProductState} from "../features/product/productSlice.ts";
import SimilarProductCard from "../components/SimilarProductsCard.tsx";
import {insertProduct} from "../features/shoppingCar/shoppingCarSlice.ts";

import Swal from "sweetalert2";

const ProductView = () => {

    const [product, setProduct] = useState<ProductInterfaces>();
    const [similarProducts, setSimilarProducts] = useState<ProductInterfaces[]>()
    const [isChange, setIsChange] = useState(false)
    const productState: ProductInterfaces | null = useSelector((state: StateSchemaProduct) => state.product.value);
    const dispatch = useDispatch()

    useEffect(() => {
        getCurrentProduct()
        getProducts()
    }, [isChange]);

    const getCurrentProduct = () => {
        productState && setProduct(productState)
    }

    const getProducts = () => {
        CRUDService.getAll(PRODUCTS).then((productsList) => {
            setSimilarProducts(productsList.sort(() => Math.random() - 0.5).slice(0, 7))
        });
    }

    const loadProduct = async (product: ProductInterfaces) => {
        dispatch(setProductState(product))
        setIsChange(!isChange)
    }

    if (!product) return (<div>No hay producto</div>)

    const onAddToCart = (product: ProductInterfaces) => {
        dispatch(insertProduct(product))
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Tu producto ha sido añadido al carrito!",
            showConfirmButton: false,
            timer: 1000
        });
    }

    return (
        <div className="flex flex-col p-6 bg-white rounded-lg shadow-md">
            <div className="flex">
                <div className="w-1/2">
                    <img src={product.image_url} className="w-full h-auto rounded-lg" alt={product.name}/>
                </div>
                <div className="w-1/2 ml-6">
                    <h1 className="text-3xl font-semibold mb-4 text-app-700">{product.name}</h1>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <div className="text-2xl font-bold mb-4  text-app-700">{new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    }).format(product.price)}</div>

                    <p className="text-sm text-gray-500 mb-2">{product.subtitle}</p>
                    <div className="star-rating">
                        <span className="star">&#9733;</span>
                        <span className="rating">{product.calification}</span>
                    </div>
                    <button
                        className="bg-app-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                        onClick={() => onAddToCart(product)}>
                        Añadir al carrito
                    </button>
                </div>
            </div>
            <div className="border-dotted  border-t border-gray-300 my-6"></div>
            <div className="mt-1">
                <h2 className="text-lg font-semibold mb-2 text-app-700">Productos Similares</h2>
                <div className="similar-products-carousel flex overflow-x-auto justify-center">
                    {similarProducts && similarProducts.map((similarProduct: ProductInterfaces, index) => (
                        <SimilarProductCard product={similarProduct} loadProduct={loadProduct} key={index}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductView;
