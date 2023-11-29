import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {CRUDService, USERS} from "../config/axios.ts";
import Swal from "sweetalert2";
import {UserFormInterface, UserInterface} from "../interfaces/User/user.interfaces.ts";

const EditUserPage = () => {
    const [user, setUser] = useState<UserInterface>()
    const {id} = useParams()
    const [isExist, setIsExist] = useState<boolean>(false)
    const navigate = useNavigate();
    const [formData, setFormData] = useState<UserFormInterface>({
        email: (user?.email)?user.email:"",
        username: (user?.username)?user.username:"",
        firstName: (user?.firstName)?user.firstName:"",
        lastName: (user?.lastName)?user.lastName:"",
        phone: (user?.phone)?user.phone:"",
        address: (user?.address)?user.address:"",
        password: (user?.password)?user.password:"",
        role: (user?.role)?user.role :""
    })


    useEffect(() => {
        getUser()
    }, []);


    const getUser = () => {
        id && CRUDService.getOne(USERS, id).then((userFound: UserInterface) => {
            setUser(userFound)
            setIsExist(true)
            const { email, username, firstName, lastName, phone, address, password, role } = userFound
            setFormData({email, username, firstName, lastName, phone, address, password, role  })
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
        if (user?.user_id !== undefined) {
            CRUDService.update(USERS, user?.user_id.toString(), formData).then((res) => {
                if (res.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Your user has been updated",
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => navigate('/admin/users'));
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
                    <input type="text" placeholder="Name" name={'email'} onChange={handleChange}
                           className="input input-bordered max-w-xs col-span-2" defaultValue={user?.email}/>
                    <input type="text" placeholder="Subtitle" name={'username'} onChange={handleChange}
                           className="input input-bordered max-w-xs col-span-2" defaultValue={user?.username}/>
                    <input type="text" placeholder="Description" name={'firstName'}
                           onChange={handleChange}
                           className="input input-bordered max-w-xs col-span-2" defaultValue={user?.firstName}/>
                    <input type="text" placeholder="Price" name={'lastName'} onChange={handleChange}
                           className="input input-bordered max-w-xs col-span-2" defaultValue={user?.lastName}/>
                    <input type="text" placeholder="Qualification" name={'phone'}
                           onChange={handleChange}
                           className="input input-bordered max-w-xs col-span-2" defaultValue={user?.phone}/>
                    <input type="text" placeholder="Price" name={'address'} onChange={handleChange}
                           className="input input-bordered max-w-xs col-span-2" defaultValue={user?.address}/>
                    <input type="text" placeholder="Price" name={'password'} onChange={handleChange}
                           className="input input-bordered max-w-xs col-span-2" defaultValue={user?.password}/>
                    <input type="text" placeholder="Price" name={'role'} onChange={handleChange}
                           className="input input-bordered max-w-xs col-span-2" defaultValue={user?.role}/>
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

export default EditUserPage;
