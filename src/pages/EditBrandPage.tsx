import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {BRANDS, CRUDService} from "../config/axios.ts";
import Swal from "sweetalert2";
import {BrandFormInterface, BrandInterface} from "../interfaces/Brand/brand.interface.ts";

const EditBrandPage = () => {
    const [brand, setBrand] = useState<BrandInterface>()
    const {id} = useParams()
    const [isExist, setIsExist] = useState<boolean>(false)
    const navigate = useNavigate();
    const [formData, setFormData] = useState<BrandFormInterface>({
        name: (brand?.name)||""
    })


    useEffect(() => {
        getBrand()
    }, []);


    const getBrand = () => {
        id && CRUDService.getOne(BRANDS, id).then((brandFound: BrandInterface) => {
            setBrand(brandFound)
            setIsExist(true)
            const { name } = brandFound
            setFormData({ name  })
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>): void => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: (name === 'brand_id') ? Number(value) : value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(formData)
        if (brand?.brand_id !== undefined) {
            CRUDService.update(BRANDS, brand?.brand_id.toString(), formData).then((res) => {
                if (res.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Your brand has been updated",
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => navigate('/admin/brands'));
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

    if (!isExist) return <div>The brand doesn't exist</div>
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={'grid grid-cols-6 gap-4 my-3'}>
                    <input type="text" placeholder="Name" name={'name'} onChange={handleChange}
                           className="input input-bordered max-w-xs col-span-2" defaultValue={brand?.name}/>
                </div>

                <div className="flex justify-center">
                    <button type={'submit'} className="btn bg-app-300 text-white border-0 rounded-3xl hover:bg-app-300">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBrandPage;
