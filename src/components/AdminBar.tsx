import {Link, useNavigate} from "react-router-dom";
import {logout} from "../features/auth/authSlice.ts";
import {useDispatch} from "react-redux";

const AdminBar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutAccount = () => {
        dispatch(logout())
        navigate('/landing')
    }

    return (
        <div>
            <div className="navbar bg-app-100 text-white">
                <div className="flex-1">
                    <a className="text-xl font-bold">Admin Manager</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to={'users'} className={'hover:text-app-400 hover:bg-app-400/10'}>Users</Link></li>
                        <li><Link to={'products'} className={'hover:text-app-400 hover:bg-app-400/10'}>Products</Link>
                        </li>
                        <li><Link to={'brands'} className={'hover:text-app-400 hover:bg-app-400/10'}>Brands</Link></li>
                        <li>
                            <button onClick={logoutAccount}
                                    className={'hover:text-app-400 hover:bg-app-400/10'}>Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminBar;
