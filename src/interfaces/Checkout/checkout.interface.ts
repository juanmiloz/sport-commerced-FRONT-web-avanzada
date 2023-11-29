import {UserData} from "../User/user.interfaces.ts";

export interface CheckoutInterface {
    checkout_id?: number,
    user_id?: number,
    user?: UserData,
    payment?: number,
    total: number
}