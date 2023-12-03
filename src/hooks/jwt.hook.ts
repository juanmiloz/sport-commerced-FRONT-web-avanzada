import {useSelector} from "react-redux";
import {JwtPayload, StateSchema} from "../interfaces/Auth/auth.interfaces.ts";
import {jwtDecode} from "jwt-decode";

const useJwtHook = () =>{

    const payload  = useSelector((state: StateSchema) => state.authState.value)

    const decryptJwt = async ():Promise<JwtPayload|null> =>{
        if(payload?.access_token){
            return jwtDecode(payload.access_token)
        }
        return null;
    }


    return { decryptJwt }
}

export default useJwtHook