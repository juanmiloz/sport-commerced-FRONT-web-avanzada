import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from "../pages/LandingPage.tsx";
import NotFound from "../pages/NotFound.tsx";
import SignIn from "../pages/SignIn.tsx";
import Register from "../pages/Register.tsx";
import Home from "../pages/Home.tsx";
import SportCommerce from "../pages/SportCommerce.tsx";
import ProductView from "../pages/ProductView.tsx";
import AdminView from "../pages/AdminView.tsx";
import UserManagerView from "../pages/UserManagerView.tsx";
import ProductManagerView from "../pages/ProductManagerView.tsx";
import BrandManagerView from "../pages/BrandsManagerView.tsx";

function Router() {
    return(<BrowserRouter>
        <Routes>
            <Route path={'/landing'} element={<LandingPage/>}/>
            <Route path={'/signIn'} element={<SignIn/>}/>
            <Route path={'/register'} element={<Register/>}/>
            <Route path={'/sport-commerce'} element={<SportCommerce/>}>
                <Route path={'home'} element={<Home/>}/>
                <Route path={'product-view'} element={<ProductView/>}/>
            </Route>
            <Route path={'/admin'} element={<AdminView/>}>
                <Route path={'users'} element={<UserManagerView/>}/>
                <Route path={'products'} element={<ProductManagerView/>}/>
                <Route path={'brands'} element={<BrandManagerView/>}/>
            </Route>
            <Route path={'/*'} element={<NotFound/>}/>
        </Routes>
    </BrowserRouter>)
}

export default Router