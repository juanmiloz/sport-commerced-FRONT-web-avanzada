import BackgroundAuth from "../components/BackgroundAuth.tsx";
import React, {useState} from "react";

const SignIn = () => {

    const [formData, setFormData] = useState({
        email: "",
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
        console.log(formData)
    }

    return (
        <BackgroundAuth typeAuth={'SignIn'}>
            <form className={'flex flex-col h-full items-center justify-center'} onSubmit={handleSubmit}>
                <h1 className={'text-4xl font-semibold font-epi'}>Sign In</h1>
                <input name={'email'} type="text" placeholder="email" className="input input-bordered w-full max-w-xs mt-5" onChange={handleChange}/>
                <input name={'password'} type="password" placeholder="password" className="input input-bordered w-full max-w-xs mt-3" onChange={handleChange} />
                <button type={'submit'} className={'btn bg-app-100 text-white border-0 mt-5 rounded-3xl w-full hover:bg-app-300'}>Sign In
                </button>
            </form>
        </BackgroundAuth>
    );
};

export default SignIn;
