export interface AuthState  {
    value:{
        username: string;
        password: string;
        access_token: string;
    } | null;
}

export interface StateSchema  {
    auth: {
        value:{
            username: string;
            password: string;
            access_token: string;
        } | null;
    }
}