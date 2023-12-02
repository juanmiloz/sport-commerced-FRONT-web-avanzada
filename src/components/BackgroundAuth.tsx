import React, {ReactNode} from 'react';
import {Link} from "react-router-dom";

interface Props {
    children: ReactNode,
    typeAuth: string
}

const BackgroundAuth: React.FC<Props> = ({children, typeAuth}) => {
    return (
        <div className={'w-screen h-screen bg-gradient-to-r from-black to-app-600 flex items-center justify-center relative'}>
            <Link to={"/landing"}><img src={'/images/svg/sport-commerce.svg'} className={'absolute left-2 top-2 w-20'} alt={'logo'}/></Link>
            <div className={'text-white md:absolute sm:static top-0 right-0 flex py-2 px-4'}>
                <p>{(typeAuth === "SignIn") ? 'No tiene una cuenta aun?' : (typeAuth === "Register") ? ' Ya tiene una cuenta?' : ''}</p>
                <Link to={(typeAuth === "SignIn") ? '/register' : (typeAuth === "Register") ? '/signIn' : ''}>
                    <p className={'underline ml-2'}>{(typeAuth === "SignIn") ? 'Registrate' : (typeAuth === "Register") ? 'Ingresa' : ''}</p>
                </Link>
            </div>
            <div className={'bg-white rounded-lg flex relative'}>
                <div className={'p-14'}>
                    {children}
                </div>
                <img src={'/images/AuthImg.png'} alt={"imagen deportiva"} className={'rounded-r-lg'}/>
                {/*<div className={'absolute bg-app-100/80 h-[70vh] w-[70vh] rounded-full -left-1/2 -bottom-10'}/>*/}
                {/*<div className={'absolute bg-app-100/80 h-[55vh] w-[30vh] -right-36 -bottom-10 rounded-lg'}/>*/}
                {/*<div className={'absolute bg-app-100/80 h-[25vh] w-[25vh] -right-1/2 top-0 rounded-full'}/>*/}
            </div>
        </div>
    );
};

export default BackgroundAuth;
