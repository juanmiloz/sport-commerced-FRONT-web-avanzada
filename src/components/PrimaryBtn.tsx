import React from "react";

interface Props {
    content: string,
    onClick?: () => void,
    type: string
}

const PrimaryBtn: React.FC<Props> = ({content, onClick, type}) => {
    return (
            <button className={`btn rounded-3xl font-bold border-0 text-white hover:bg-app-300  ${(type==='primary')?'bg-app-200':(type==='secundary')?'bg-app-100':''}`} onClick={onClick}>{content}</button>
    );
};

export default PrimaryBtn;
