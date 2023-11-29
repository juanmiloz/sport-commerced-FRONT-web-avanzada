import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import React from "react";
import {StateSchema, UserState} from "../interfaces/Auth/auth.interfaces.ts";

interface Props {
    children: React.ReactNode
}

const RequireAuthAdmin: React.FC<Props> = ({children}) => {

    const location = useLocation();
    const user: UserState | null = useSelector((state: StateSchema) => state.authState.value)
    if (user === null || user.role !== "superadmin") {
        return (<Navigate to={"/landing"} state={{from: location}} replace/>);
    }

    return children;
}

export default RequireAuthAdmin