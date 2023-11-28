import instance from "../config/axios.ts";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {StateSchema} from "../interfaces/Auth/auth.interfaces.ts";
import {HeaderInterface} from "../interfaces/config/header.interface.ts";
import {ProductInterfaces} from "../interfaces/Product/product.interfaces.ts";


const useAxiosHook = () => {

    const [authHeader, setAuthHeader] = useState<HeaderInterface>()

    useEffect(() => {
        getHeaderConfig()
    }, []);

    const getAll = async (
        serviceRoute: string
    ):Promise<ProductInterfaces[]> => {
        return instance.get(serviceRoute, authHeader).then(res => res.data)
    }

    const getHeaderConfig = () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const userInfo = useSelector((state: StateSchema) => state.auth.value)

        const config:HeaderInterface = {
            headers: {Authorization: 'Bearer ' + userInfo?.access_token}
        };
        setAuthHeader(config)
    }

    return { getAll }

}

export default useAxiosHook;