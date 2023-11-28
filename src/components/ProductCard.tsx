import React from 'react';
import {ProductInterfaces} from "../interfaces/Product/product.interfaces.ts";


interface Props {
    product: ProductInterfaces;
    loadProduct: (product:ProductInterfaces) => void;
}

const ProductCard: React.FC<Props> = ({product, loadProduct}) => {

    const handleClick = () => {
        loadProduct(product);
    };


    return (
        <div>
            <div className="card card-compact bg-base-100 shadow-xl" onClick={handleClick}>
                <figure><img src={product.image_url} alt="Shoes" className={'h-52 w-full'}/></figure>
                <div className="card-body">
                    <h2 className="card-title">{product.name}</h2>
                    <p className={'line-clamp-2'}>{product.description}</p>
                    <div className="card-actions justify-end">
                        <h3 className={'font-semibold text-xl'}>$ {product.price}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
