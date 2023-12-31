import axios from "axios";
import {ToolkitStore} from "@reduxjs/toolkit/dist/configureStore";

export const LOGIN: string = "auth/login"
export const SIGN_UP: string = "auth/signUp"
export const PRODUCTS: string = "products"
export const USERS: string = "users"
export const BRANDS: string = "brands"
export const REVIEWS: string = "reviews"
export const PRODUCT_REVIEWS: string = "reviews/product"

export const CHECKOUTS: string = "checkout"

const instance = axios.create({
    baseURL: "http://localhost:3000/"
})

export default instance

let store: ToolkitStore

export const injectStore = (_store: ToolkitStore) => {
    store = _store
}

instance.interceptors.request.use(config => {
    if (store.getState().authState.value !== null) {
        config.headers.authorization = store.getState().authState.value.access_token
    }
    return config
})

instance.interceptors.response.use(response => {
    return response
}, function (error) {
    if (error.response.status === 401) {
        store.dispatch({type: "auth/logout"})
    }
    return Promise.reject(error);
})


export class CRUDService {
    static getAll(serviceRoute: string) {
        return instance.get(serviceRoute).then(res => res.data)
    }

    static getAllOf(serviceRoute: string, item_id: string) {
        const url: string = serviceRoute + "/" + item_id
        return instance.get(url).then(res => res.data)
    }

    static getOne(serviceRoute: string, itemId: string) {

        const url = serviceRoute + '/' + itemId

        return instance.get(
            url
        ).then(res => res.data);
    }

    static post(serviceRoute: string, newItem: object) {
        console.log(newItem)
        return instance.post(serviceRoute, newItem)
            .then(res => res);
    }

    static update(serviceRoute: string, itemId: string, updateItem: object) {
        const url = serviceRoute + "/" + itemId
        return instance.put(url, updateItem).then(res => res)
    }

    static delete(serviceRoute: string, newItem: string) {
        const url = serviceRoute + '/' + newItem

        return instance.delete(url)
            .then((res) => res.data)
    }
}