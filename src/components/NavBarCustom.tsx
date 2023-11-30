import {Link, useNavigate} from "react-router-dom";
import {MdDehaze, MdSearch, MdShoppingCartCheckout} from "react-icons/md"
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../features/auth/authSlice.ts";
import {StateSchema} from "../interfaces/Auth/auth.interfaces.ts";

const NavBarCustom = () => {

    const user = useSelector((state: StateSchema) => state.authState.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutAccount = () => {
        dispatch(logout())
        navigate('/landing')
    }

    return (
        <div>
            <div className="navbar bg-app-200 p-0">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <MdDehaze color={'white'} className="h-7 w-7"/>
                        </label>
                        <ul tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link to={'/sport-commerce/home'}>Página de inicio</Link></li>
                            <li><Link to={'/landing'}>Landing</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="navbar-center" onClick={() => {
                    if (user === null) {
                        navigate('/signIn')
                    }
                }}>
                    <a className="btn btn-ghost normal-case text-xl text-white">Sport-Commerce</a>
                </div>
                <div className="navbar-end">
                    <button className="btn btn-ghost btn-circle">
                        <MdSearch color={'white'} className={'h-7 w-7'}/>
                    </button>
                    {(user !== null) ?
                        <button className="btn btn-ghost btn-circle">
                            <label className="indicator drawer-button cursor-pointer" htmlFor="my-drawer-4">
                                <MdShoppingCartCheckout color={'white'} className={'h-7 w-7'}/>
                            </label>
                        </button>
                        :
                        <></>
                    }
                </div>
                <div className="dropdown dropdown-end mx-3">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={(user !== null) ? "/images/avatar/avatar.jpg" : "/images/avatar/logged_out.png"}/>
                        </div>
                    </label>
                    {(user !== null) ?
                        <ul tabIndex={0}
                            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Perfil
                                    <span className="badge">Nuevo</span>
                                </a>
                            </li>
                            <li><a>Configuración</a></li>
                            <li onClick={logoutAccount}><a>Logout</a></li>
                        </ul>
                        :
                        <ul tabIndex={0}
                            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li><a onClick={() => {navigate("/signIn")}}>signIn</a></li>
                            <li><a onClick={() => {navigate("/register")}}>Register</a></li>
                        </ul>
                    }
                </div>
            </div>
        </div>
    )
        ;
};

export default NavBarCustom;
