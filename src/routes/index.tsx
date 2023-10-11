import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from "../pages/LandingPage.tsx";
import NotFound from "../pages/NotFound.tsx";
import SignIn from "../pages/SignIn.tsx";
import Register from "../pages/Register.tsx";

function Router() {
    return(<BrowserRouter>
        <Routes>
            <Route path={'/landing'} element={<LandingPage/>}/>
            <Route path={'/signIn'} element={<SignIn/>}/>
            <Route path={'/register'} element={<Register/>}/>
            <Route path={'/*'} element={<NotFound/>}/>
        </Routes>
    </BrowserRouter>)
}

export default Router