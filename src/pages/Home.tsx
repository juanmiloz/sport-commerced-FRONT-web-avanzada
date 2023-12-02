import ProductCard from "../components/ProductCard.tsx";
import CarouselOffers from "../components/CarouselOffers.tsx";
import {useEffect, useState} from "react";
import {ProductInterfaces} from "../interfaces/Product/product.interfaces.ts";
import {CRUDService, PRODUCTS} from "../config/axios.ts";
import {useNavigate} from "react-router-dom";

const Home = () => {

    const [products, setProducts] = useState<ProductInterfaces[]>();
    const navigate = useNavigate();

    useEffect(() => {
        getProducts()
    }, []);


    const getProducts = () =>{
        CRUDService.getAll(PRODUCTS).then((productsList) => {
            setProducts(productsList)
        });
    }

    const loadProduct =  async (product:ProductInterfaces) =>{
        navigate('../product-view/'+product.product_id)
    }


    const images = ["https://ciconceptstore.com/cdn/shop/files/BROWN_BAD_BUNNY_COMPUTER_SIZE.png?v=1699724484&width=1600",
        "https://ciconceptstore.com/cdn/shop/files/BANNER_WEB_COMPUTER_SIZE_SAMBA_OG.png?v=1700046579&width=1600","/images/offers/carrousel3.jpg","/images/offers/carrousel4.jpg"]

    return (
        <div>
            <div className={"mb-4"}><CarouselOffers images={images}/></div>
            <div className={'grid grid-cols-5 gap-3 mx-10 p-5'}>
                {products && products.map((product:ProductInterfaces) =>
                    <ProductCard product={product} key={product.product_id} loadProduct={loadProduct}></ProductCard>
                )}
            </div>
        </div>
    );
};

export default Home;
