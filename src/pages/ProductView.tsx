const ProductView = () => {

    const testjson = {
        name: "Nike running",
        description: "Los mejores nike para vivir aventuras extremas, correr en las superficies mas complicadas",
        price: 200000,
        image: "/images/products/guantes.jpg",
    }

    return (
        <div className={'flex p-6'}>
            <div className={'m-3 w-2/4 bg-green-200'}>
                <img src={testjson.image} className={'w-full'}/>
            </div>
            <div className={'m-6 bg-red-200 w-full'}>
                <div className={'text-3xl font-bold'}>{testjson.name}</div>
                <div className="flex flex-col w-full">
                    <div className="divider"></div>
                </div>
                <div className={''}>{testjson.description}</div>
                <div className={''}>{testjson.price}</div>
            </div>
        </div>
    );
};

export default ProductView;
