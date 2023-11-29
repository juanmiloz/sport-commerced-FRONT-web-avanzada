import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {CRUDService, PRODUCTS, USERS} from "../config/axios.ts";
import Swal from "sweetalert2";
import {UserInterface} from "../interfaces/User/user.interfaces.ts";

const UserManagerView = () => {
    const [isModified, setIsModified] = useState<boolean>(false)
    const [users, setUsers] = useState<UserInterface[]>();
    const navigate = useNavigate();


    useEffect(() => {
        getClients()
    }, [isModified]);

    const getClients = () => {
        CRUDService.getAll(USERS).then((users) => {
            users
            setUsers(users)
        }).catch((e) => console.log(e))
    }

    const deleteProduct = (productId: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                CRUDService.delete(PRODUCTS, productId.toString()).then((res) => {
                    Swal.fire({
                        title: "Deleted!",
                        text: res.message,
                        icon: "success"
                    });
                    setIsModified(!isModified)
                })
            }
        });
    }

    const updateProduct = (product_id: number) => {
        navigate("./" + product_id)
    }


    return (
        <div>
            <div className={'flex flex-col gap-4 items-center justify-center m-3'}>
                <div className="stats shadow">
                    <div className="stat place-items-center">
                        <div className="stat-title">USERS</div>
                        <div className="stat-value text-app-200">{users?.length}</div>
                        <div className="stat-desc">Total Users</div>
                    </div>
                </div>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-xs">
                        <thead>
                        <tr>
                            {/*<th>Product_id</th>*/}
                            <th>Email</th>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Password</th>
                            <th>role</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {users?.map((user: UserInterface, index: number) =>
                            <tr key={index}>
                                <th>{user.user_id}</th>
                                <th>{user.email}</th>
                                <td>{user.username}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.phone}</td>
                                <td>{user.address}</td>
                                <td>{user.password}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button className="btn btn-error btn-xs text-white rounded-lg"
                                            onClick={() => deleteProduct(user.user_id)}>delete
                                    </button>
                                </td>
                                <td>
                                    <button className="btn bg-app-200 btn-xs text-white"
                                            onClick={() => updateProduct(user.user_id)}>edit
                                    </button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserManagerView;
