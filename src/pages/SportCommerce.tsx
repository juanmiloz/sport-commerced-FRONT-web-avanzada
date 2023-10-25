import NavBarCustom from "../components/NavBarCustom.tsx";
import {Outlet} from "react-router-dom";

const SportCommerce = () => {
    return (
        <div>
            <NavBarCustom/>
            <Outlet/>
        </div>
    );
};

export default SportCommerce;
