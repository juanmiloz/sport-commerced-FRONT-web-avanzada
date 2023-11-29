import React, {useEffect, useState} from 'react';
import {BRANDS, CRUDService, PRODUCTS} from "../config/axios.ts";
import Swal from "sweetalert2";
import {ProductFormInterfaces, ProductInterfaces} from "../interfaces/Product/product.interfaces.ts";
import {BrandInterface} from "../interfaces/Brand/brand.interface.ts";
import {useNavigate, useParams} from "react-router-dom";

const EditProductPage = () => {

    const [brands, setBrands] = useState<BrandInterface[]>();
    const [product, setProduct] = useState<ProductInterfaces>()
    const {id} = useParams()
    const [isExist, setIsExist] = useState<boolean>(false)
    const navigate = useNavigate();
    const [formData, setFormData] = useState<ProductFormInterfaces>({
        name: (product?.name)?product.name:"",
        subtitle: (product?.subtitle)?product.subtitle:"",
        description: (product?.description)?product.description:"",
        price: (product?.price)?product.price:0,
        calification: (product?.calification)?product.calification:0,
        brand_id: (product?.brand_id)?product.brand_id:0,
        image_url: (product?.image_url)?product.image_url:"",
    })


    useEffect(() => {
        getAllBrands()
        getProduct()
    }, []);

    const getAllBrands = () => {
        CRUDService.getAll(BRANDS).then((brandsList) => {
            setBrands(brandsList)
        })
    }

    const getProduct = () => {
        id && CRUDService.getOne(PRODUCTS, id).then((productFound: ProductInterfaces) => {
            setProduct(productFound)
            setIsExist(true)
            const { name, subtitle, description, price, calification, brand_id, image_url } = productFound
            setFormData({ name, subtitle, description, price, calification, brand_id, image_url })
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>): void => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: (name === 'price' || name === 'calification' || name === 'brand_id' ) ? Number(value) : value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(formData)
        if (product?.product_id !== undefined) {
            CRUDService.update(PRODUCTS, product?.product_id.toString(), formData).then((res) => {
                if (res.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Your product has been updated",
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => navigate('./'));
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
    }

    if (!isExist) return <div>producto no existente</div>
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={'grid grid-cols-6 gap-4 my-3'}>
                    <input type="text" placeholder="Name" name={'name'} onChange={handleChange}
                           className="input input-bordered max-w-xs col-span-2" defaultValue={product?.name}/>
                    <input type="text" placeholder="Subtitle" name={'subtitle'} onChange={handleChange}
                           className="input input-bordered max-w-xs col-span-2" defaultValue={product?.subtitle}/>
                    <input type="text" placeholder="Description" name={'description'}
                           onChange={handleChange}
                           className="input input-bordered max-w-xs col-span-2" defaultValue={product?.description}/>
                    <input type="text" placeholder="Price" name={'price'} onChange={handleChange}
                           className="input input-bordered max-w-xs col-span-2" defaultValue={product?.price}/>
                    <input type="text" placeholder="Qualification" name={'calification'}
                           onChange={handleChange}
                           className="input input-bordered max-w-xs col-span-2" defaultValue={product?.calification}/>
                    <select className="select select-bordered w-full max-w-xs col-span-2" name={'brand_id'}
                            onChange={handleChange} defaultValue={0}>
                        {brands?.map((brand) =>
                            (brand.brand_id === product?.brand_id) ?
                                <option key={brand.brand_id} value={brand.brand_id} selected> {brand.name} </option>
                                :
                                <option key={brand.brand_id} value={brand.brand_id}> {brand.name} </option>
                        )}
                    </select>
                </div>
                <input type="text" placeholder="Image url" name={'image_url'} onChange={handleChange}
                       className="input input-bordered w-full " defaultValue={product?.image_url}/>

                <div className="flex justify-center">
                    <button type={'submit'} className="btn bg-app-300 text-white border-0 rounded-3xl hover:bg-app-300">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProductPage;
