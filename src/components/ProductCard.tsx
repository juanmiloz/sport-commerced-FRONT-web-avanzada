import React from 'react';
import {ProductInterfaces} from "../interfaces/Product/product.interfaces.ts";



interface Props {
    product: ProductInterfaces
}

const ProductCard: React.FC<Props> = ({product}) => {

    const test = () =>{
        console.log(product)
    }

    return (
        <div>
            <div className="card card-compact bg-base-100 shadow-xl" onClick={test}>
                <figure><img src={product.img} alt="Shoes" className={'h-52 w-full'}/></figure>
                <div className="card-body">
                    <h2 className="card-title">{product.name}</h2>
                    <p className={'line-clamp-2'}>{product.description}</p>
                    <div className="card-actions justify-end">
                        <h3 className={'font-semibold text-xl'}>$ {product.price.toLocaleString()}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
