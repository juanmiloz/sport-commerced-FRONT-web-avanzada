import React, {useEffect, useState} from "react";
import {BRANDS, CRUDService, PRODUCTS} from "../config/axios.ts";
import {ProductInterfaces} from "../interfaces/Product/product.interfaces.ts";
import Swal from "sweetalert2";
import {BrandInterface} from "../interfaces/Brand/brand.interface.ts";
import {useNavigate} from "react-router-dom";

const ProductManagerView = () => {
    const [isModified, setIsModified] = useState<boolean>(false)
    const [products, setProducts] = useState<ProductInterfaces[]>();
    const [brands, setBrands] = useState<BrandInterface[]>();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        subtitle: "",
        description: "",
        price: 0,
        calification: 0,
        brand_id: 0,
        image_url: "",
    })

    useEffect(() => {
        getProducts()
    }, [isModified]);

    const getProducts = () => {
        CRUDService.getAll(PRODUCTS).then((products) => {
            products.sort((a: ProductInterfaces, b: ProductInterfaces) => a.product_id - b.product_id)
            setProducts(products)
        }).catch((e) => console.log(e))
    }

    const deleteProduct = (productId: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                CRUDService.delete(PRODUCTS, productId.toString()).then((res) => {
                    Swal.fire({
                        title: "Deleted!",
                        text: res.message,
                        icon: "success"
                    });
                    setIsModified(!isModified)
                })
            }
        });
    }

    const updateProduct = (product_id: number) => {
        navigate("./" + product_id)
    }

    const getAllBrands = () => {
        CRUDService.getAll(BRANDS).then((brandsList) => {
            setBrands(brandsList)
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: (name === 'price' || name === 'calification') ? Number(value) : value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        CRUDService.post(PRODUCTS, formData).then((res) => {
            if (res.status === 201) {
                Swal.fire({
                    icon: "success",
                    title: "Your product has been saved",
                    showConfirmButton: false,
                    timer: 2000
                });
                setIsModified(!isModified)
            }
        }).catch((e) => {
            console.log(e)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: e.message,
            });
        })
    }

    const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = parseInt(e.target.value);
        setFormData({
            ...formData,
            brand_id: selectedValue,
        });
    };


    return (
        <div>
            <div className={'flex flex-col gap-4 items-center justify-center m-3'}>
                <div className="stats shadow">
                    <div className="stat place-items-center">
                        <div className="stat-title">PRODUCTS</div>
                        <div className="stat-value text-app-200">{products?.length}</div>
                        <div className="stat-desc">Total Products</div>
                    </div>
                </div>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-xs">
                        <thead>
                        <tr>
                            <th>Product_id</th>
                            <th>Name</th>
                            <th>Subtitle</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Qualification</th>
                            <th>Brand_id</th>
                            <th>Image_url</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {products?.map((product: ProductInterfaces, index: number) =>
                            <tr key={index}>
                                <th>{product.product_id}</th>
                                <td>{product.name}</td>
                                <td>{product.subtitle}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.calification}</td>
                                <td>{product.brand_id}</td>
                                <td>{product.image_url}</td>
                                <td>
                                    <button className="btn btn-error btn-xs text-white rounded-lg"
                                            onClick={() => deleteProduct(product.product_id)}>delete
                                    </button>
                                </td>
                                <td>
                                    <button className="btn bg-app-200 btn-xs text-white"
                                            onClick={() => updateProduct(product.product_id)}>edit
                                    </button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={'flex justify-center'}>
                {/* The button to open modal */}
                <a href="#my_modal_8" className="btn btn-primary bg-app-100 text-white border-0 rounded-lg"
                   onClick={getAllBrands}>open modal</a>
                {/* Put this part before </body> tag */}
                <div className="modal" role="dialog" id="my_modal_8">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">New Product!</h3>
                        <form onSubmit={handleSubmit}>
                            <div className={'grid grid-cols-4 gap-4 my-3'}>
                                <input type="text" placeholder="Name" name={'name'} onChange={handleChange}
                                       className="input input-bordered max-w-xs col-span-2"/>
                                <input type="text" placeholder="Subtitle" name={'subtitle'} onChange={handleChange}
                                       className="input input-bordered max-w-xs col-span-2"/>
                                <input type="text" placeholder="Description" name={'description'}
                                       onChange={handleChange}
                                       className="input input-bordered max-w-xs col-span-2"/>
                                <input type="text" placeholder="Price" name={'price'} onChange={handleChange}
                                       className="input input-bordered max-w-xs col-span-2"/>
                                <input type="text" placeholder="Qualification" name={'calification'}
                                       onChange={handleChange}
                                       className="input input-bordered max-w-xs col-span-2"/>
                                <select className="select select-bordered w-full max-w-xs col-span-2"
                                        onChange={handleBrandChange}>
                                    {brands?.map((brand, index) =>
                                        (index !== 1) ?
                                            <option key={brand.brand_id} value={brand.brand_id}> {brand.name} </option>
                                            :
                                            <option key={brand.brand_id} value={brand.brand_id}
                                                    selected> {brand.name} </option>
                                    )}
                                </select>
                            </div>
                            <input type="text" placeholder="Image url" name={'image_url'} onChange={handleChange}
                                   className="input input-bordered w-full "/>
                            <div className="modal-action flex gap-x-4">
                                <button type={'submit'}
                                        className="btn bg-app-300 text-white border-0 rounded-3xl hover:bg-app-300">
                                    create
                                </button>
                                <a href="#" className="btn btn-error text-white border-0 rounded-3xl">Close!</a>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductManagerView;
