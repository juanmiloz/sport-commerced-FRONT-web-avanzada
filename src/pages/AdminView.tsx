import AdminBar from "../components/AdminBar.tsx";
import {Outlet} from "react-router-dom";

const AdminView = () => {
    return (
        <div>
            <AdminBar/>
            <Outlet/>
        </div>
    );
};

export default AdminView;
