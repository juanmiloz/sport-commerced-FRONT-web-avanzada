import axios from "axios";

export const LOGIN: string = "auth/login"
export const SIGN_UP: string = "auth/signUp"
export const PRODUCTS: string = "products"
export const BRANDS: string = "brands"
export const REVIEWS: string = "reviews"

const instance = axios.create({
    baseURL: "http://localhost:3000/"
})

export default instance

let store

export const injectStore = _store => {
    store = _store
}

instance.interceptors.request.use(config => {
    config.headers.authorization = store.getState().auth.token
    return config
})

export class CRUDService {

    static getAll(serviceRoute: string) {
        const config = this.getHeaderConfig();

        return instance.get(serviceRoute, config).then(res => res.data)
    }

    static getOne(serviceRoute: string, itemId: string) {

        const url = serviceRoute + '/' + itemId
        const config = this.getHeaderConfig();

        return axios.get(
            url, config
        ).then(res => res.data);
    }

    static post(newItem: object, serviceRoute: string) {

        const config = this.getHeaderConfig();


        return axios.post(serviceRoute, newItem, config)
            .then(res => res.data);
    }


    static getHeaderConfig() {

        const webToken = this.currentUser?.access_token;

        const config = {
            headers: {Authorization: 'Bearer ' + webToken}
        };
        return config;
    }

}