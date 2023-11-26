import BackgroundAuth from "../components/BackgroundAuth.tsx";
import React, {useState} from "react";
import axios from "../config/axios.ts";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {useDispatch} from "react-redux";
import {login} from "../features/auth/authSlice.ts";

const SignIn = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        username: "",
        password: ""
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
        axios.post('auth/login', formData).then((res) => {
            if (res.status === 200) {
                const loginInfo = {
                    formData,
                    access_token: res.data.access_token
                };
                dispatch(login(loginInfo))
                navigate('/sport-commerce/home')
            }
        }).catch((e) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: e.response.data.message + ', please verify your information account',
            })
            setFormData({
                username: formData.username,
                password: '',
            })
        })
    }

    return (
        <BackgroundAuth typeAuth={'SignIn'}>
            <form className={'flex flex-col h-full items-center justify-center'} onSubmit={handleSubmit}>
                <h1 className={'text-4xl font-semibold font-epi'}>Sign In</h1>
                <input value={formData.username} name={'username'} type="text" placeholder="username"
                       className="input input-bordered w-full max-w-xs mt-5" onChange={handleChange}/>
                <input value={formData.password} name={'password'} type="password" placeholder="password"
                       className="input input-bordered w-full max-w-xs mt-3" onChange={handleChange}/>
                <button type={'submit'}
                        className={'btn bg-app-100 text-white border-0 mt-5 rounded-3xl w-full hover:bg-app-300'}>Sign
                    In
                </button>
            </form>
        </BackgroundAuth>
    );
};

export default SignIn;
