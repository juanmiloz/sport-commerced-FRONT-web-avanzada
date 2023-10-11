import BackgroundAuth from "../components/BackgroundAuth.tsx";
import React, {useState} from "react";
import Swal from 'sweetalert2'

const Register = () => {

    const [formData, setFormData] = useState({
        email: "",
        name: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: "",
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        if(formData.password !== formData.confirmPassword){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Passwords do not match, please try again!',
            })
        }
    }


    return (
        <BackgroundAuth typeAuth={'Register'}>
            <form className={'flex flex-col h-full items-center justify-center'} onSubmit={handleSubmit}>
                <h1 className={'text-4xl font-semibold font-epi'}>Register</h1>
                <div className={'grid grid-cols-2 gap-4'}>
                    <input type="text" placeholder="email" name="email" className="input input-bordered w-full max-w-xs mt-5" onChange={handleChange}/>
                    <input type="text" placeholder="name" name="name" className="input input-bordered w-full max-w-xs mt-5" onChange={handleChange}/>
                    <input type="text" placeholder="phone" name="phone" className="input input-bordered w-full max-w-xs mt-3" onChange={handleChange}/>
                    <input type="text" placeholder="address" name="address" className="input input-bordered w-full max-w-xs mt-3" onChange={handleChange}/>
                    <input type="password" placeholder="password" name="password" className="input input-bordered w-full max-w-xs mt-3" onChange={handleChange}/>
                    <input type="password" placeholder="confirm password" name="confirm password" className="input input-bordered w-full max-w-xs mt-3" onChange={handleChange}/>
                </div>
                <button className={'btn bg-app-100 text-white border-0 mt-5 rounded-3xl w-full hover:bg-app-300'}>Register</button>
            </form>
        </BackgroundAuth>
    );
};

export default Register;