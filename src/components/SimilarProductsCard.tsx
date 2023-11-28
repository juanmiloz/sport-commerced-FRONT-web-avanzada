import React from 'react';
import {ProductInterfaces} from "../interfaces/Product/product.interfaces.ts";


interface Props {
    product: ProductInterfaces;
    loadProduct: (product:ProductInterfaces) => void;
}

const SimilarProductCard: React.FC<Props> = ({product, loadProduct}) => {

    const handleClick = () => {
        loadProduct(product);
    };

    return (
        <div className="similar-product-card p-2 flex-none w-48 h-64 border border-dashed border-gray-300" onClick={handleClick}>
            <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-32 object-cover mb-2 rounded-md"
            />
            <div className="text-sm font-semibold">{product.name}</div>
            <div className="text-gray-700">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}</div>
            <div className="star-rating">
                <span className="star">&#9733;</span>
                <span className="rating">{product.calification}</span>
            </div>
        </div>
    );
};

export default SimilarProductCard;
