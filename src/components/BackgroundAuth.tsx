import React, {ReactNode} from 'react';
import {Link} from "react-router-dom";

interface Props {
    children: ReactNode,
    typeAuth: string
}

const BackgroundAuth: React.FC<Props> = ({children, typeAuth}) => {
    return (
        <div className={'w-screen h-screen bg-app-200 flex items-center justify-center'}>
            <div className={'text-white absolute top-0 right-0 flex py-2 px-4'}>
                <p>{(typeAuth === "SignIn") ? 'Doesn\'t have an account? ' : (typeAuth === "Register") ? 'Do you already have an account? ' : ''}</p>
                <Link to={(typeAuth === "SignIn") ? '/register' : (typeAuth === "Register") ? '/signIn' : ''}>
                    <p className={'underline ml-2'}>{(typeAuth === "SignIn") ? 'Sign up' : (typeAuth === "Register") ? 'Sign in' : ''}</p>
                </Link>
            </div>
            <div className={'bg-white rounded-lg flex relative z-10'}>
                <div className={'p-14'}>
                    {children}
                </div>
                <div className={'bg-app-100 p-4 rounded-r-lg'}>
                    <img src={'/images/AuthImg.png'}/>
                </div>
            </div>
        </div>
    );
};

export default BackgroundAuth;
