import ProductCard from "../components/ProductCard.tsx";
import CarouselOffers from "../components/CarouselOffers.tsx";

const Home = () => {

    const productTest = [
        {
            id: "5ea34e52-d140-410c-bc0d-11a25c337caa",
            name: "Nike running",
            description: "Los mejores nike para vivir aventuras extremas, correr en las superficies mas complicadas",
            price: 200000,
            img: "/images/products/shoes.jpg"
        },
        {
            id: "612a5c9e-6924-4f73-9aa4-58b43e6c7435",
            name: "Guantes UFC",
            description: "Los mejores guantes para romperle la cara a costeños, como por ejemplo al come burra de DANIEL JARABA ",
            price: 223000,
            img: "/images/products/guantes.jpg"
        }]


    const images = ["/images/offers/carrousel1.jpg","/images/offers/carrousel2.jpg","/images/offers/carrousel3.jpg","/images/offers/carrousel4.jpg"]

    return (
        <div>
            <div className={"mb-4"}><CarouselOffers images={images}/></div>
            <div className={'grid grid-cols-5 gap-3 mx-10 p-5'}>
                {productTest.map((product) =>
                    <ProductCard product={product} key={product.id}></ProductCard>
                )}
            </div>
        </div>
    );
};

export default Home;
