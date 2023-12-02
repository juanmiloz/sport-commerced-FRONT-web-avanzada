import React, {useEffect, useState} from "react";
import {BRANDS, CRUDService} from "../config/axios.ts";
import Swal from "sweetalert2";
import {BrandInterface} from "../interfaces/Brand/brand.interface.ts";
import {useNavigate} from "react-router-dom";

const BrandManagerView = () => {
    const [isModified, setIsModified] = useState<boolean>(false)
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
        getBrands()
    }, [isModified]);

    const getBrands = () => {
        CRUDService.getAll(BRANDS).then((brands) => {
            brands.sort((a: BrandInterface, b: BrandInterface) => a.brand_id - b.brand_id)
            setBrands(brands)
        }).catch((e) => console.log(e))
    }

    const deleteProduct = (brand_id: number) => {
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
                CRUDService.delete(BRANDS, brand_id.toString()).then((res) => {
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

    const updateProduct = (brand_id: number) => {
        navigate("./" + brand_id)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        CRUDService.post(BRANDS, formData).then((res) => {
            if (res.status === 201) {
                Swal.fire({
                    icon: "success",
                    title: "Your brand has been saved",
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    return (
        <div>
            <div className={'flex flex-col gap-4 items-center justify-center m-3'}>
                <div className="stats shadow">
                    <div className="stat place-items-center">
                        <div className="stat-title">MARCAS</div>
                        <div className="stat-value text-app-200">{brands?.length}</div>
                        <div className="stat-desc">Total marcas</div>
                    </div>
                </div>
            </div>
            <div>
                <div className="overflow-x-auto flex justify-center">
                    <table className="table table-xs max-w-lg ">
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>Nombre</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {brands?.map((brand: BrandInterface, index: number) =>
                            <tr key={index}>
                                <th>{brand.brand_id}</th>
                                <td>{brand.name}</td>
                                <td>
                                    <button className="btn btn-error btn-xs text-white rounded-lg"
                                            onClick={() => deleteProduct(brand.brand_id)}>borrar
                                    </button>
                                </td>
                                <td>
                                    <button className="btn bg-app-200 btn-xs text-white"
                                            onClick={() => updateProduct(brand.brand_id)}>editar
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
                <a href="#my_modal_8" className="btn btn-primary bg-app-100 text-white border-0 rounded-lg mt-3">Create Brand</a>
                {/* Put this part before </body> tag */}
                <div className="modal" role="dialog" id="my_modal_8">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">New Brand</h3>
                        <form onSubmit={handleSubmit}>
                            <div className={'grid grid-cols-4 gap-4 my-3'}>
                                <input type="text" placeholder="Name" name={'name'} onChange={handleChange}
                                       className="input input-bordered max-w-xs col-span-2"/>
                            </div>
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

export default BrandManagerView;

