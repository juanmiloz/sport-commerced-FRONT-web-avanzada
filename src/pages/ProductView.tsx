import '../App.css';
const ProductView = () => {

    const testjson = {
        name: "Zapatos CB-X Para Mujer",
        subtitle: "Zapatos Deportivos",
        description: "Zapatos muy cómodos para tu comfort con un diseño hecho para deportistas",
        price: 250000,
        calification: "4,5",
        brand_id: 1, 
        image_url: 'https://i.pinimg.com/originals/e6/16/50/e61650efc5d6acff4c558aab0830d07a.jpg', 
        quantity: 5

    }
    const similarProducts = [
        {
          id: 1,
          name: 'ZL-1 Para Hombre',
          price: 500000,
          calification: "4,5",
          image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D',
        },
        {
          id: 2,
          name: 'Biohazard-T Para Hombre',
          price: 430000,
          calification: "4,5",
          image_url: 'https://www.shutterstock.com/image-photo/fresno-united-states-sep-01-260nw-1828085057.jpg',
        },
        {
          id: 3,
          name: 'ART-BM Para Bebe',
          price: 390000,
          calification: "4,5",
          image_url: 'https://media1.popsugar-assets.com/files/thumbor/ZwjISsV6jfYk1LhTNguyL1qXGcA=/fit-in/792x792/filters:format_auto():quality(70):extract_cover():upscale()/2023/03/30/850/n/1922564/bfd95e7384565772_Product_Press_7.jpeg',
        },
        {
          id: 4,
          name: 'Raiden C Para Mujer',
          price: 180000,
          calification: "4,5",
          image_url:'https://brunswickbowling.com/uploads/bowler_products/Products/Shoes/Womens/_600x600_crop_center-center_none/Brunswick_Twisted_Knit_Steel-Blue_Outside_Right_1600x1600.png' 
         },
        {
          id: 5,
          name: 'Holiwis Para Mujer',
          price: 120000,
          
          image_url: 'https://photopro.bg/wp-content/uploads/2021/03/2021-03-19_17h21_20.png',
        }


      ];

    return (
        <div className="flex flex-col p-6 bg-white rounded-lg shadow-md">
        <div className="flex">
          <div className="w-1/2">
            <img src={testjson.image_url} className="w-full h-auto rounded-lg" alt={testjson.name} />
          </div>
          <div className="w-1/2 ml-6">
            <h1 className="text-3xl font-semibold mb-4 text-app-700">{testjson.name}</h1>
            <p className="text-gray-700 mb-4">{testjson.description}</p>
            <div className="text-2xl font-bold mb-4  text-app-700">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(testjson.price)}</div>
            
            <p className="text-sm text-gray-500 mb-2">{testjson.subtitle}</p>
            <div className="star-rating">
                <span className="star">&#9733;</span>
                <span className="rating">{testjson.calification}</span>
            </div>
            <button
              className="bg-app-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
              onClick={() => alert(`¡Has añadido ${testjson.name} a tu carrito!`)}>
              Añadir al carrito
            </button>
          </div>
        </div>
        <div className="border-dotted  border-t border-gray-300 my-6"></div>
  <div className="mt-1">
  <h2 className="text-lg font-semibold mb-2 text-app-700">Productos Similares</h2>
  <div className="similar-products-carousel flex overflow-x-auto justify-center">
          {similarProducts.map((similarProduct) => (
            <div key={similarProduct.id} className="similar-product-card p-2 flex-none w-48 h-64 border border-dashed border-gray-300">
              <img
                src={similarProduct.image_url}
                alt={similarProduct.name}
                className="w-full h-32 object-cover mb-2 rounded-md"
              />
              <div className="text-sm font-semibold">{similarProduct.name}</div>
              <div className="text-gray-700">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(similarProduct.price)}</div>
              <div className="star-rating">
                <span className="star">&#9733;</span>
                <span className="rating">{similarProduct.calification}</span>
                </div>
           
            </div>
          ))}
        </div>
      </div>
    </div>
    );
};

export default ProductView;
