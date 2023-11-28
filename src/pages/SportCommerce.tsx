import NavBarCustom from "../components/NavBarCustom.tsx";
import {Outlet} from "react-router-dom";
import ShoppingCar from "../components/ShoppingCar.tsx";

const SportCommerce = () => {
    return (
        <div>

            <ShoppingCar>
                <NavBarCustom/>
                <Outlet/>
            </ShoppingCar>
        </div>
    );
};

export default SportCommerce;
