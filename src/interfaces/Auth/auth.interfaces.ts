export interface UserState {
    username: string;
    role: string,
    access_token: string;
}

export interface AuthState  {
    value: UserState | null;
}

export interface StateSchema  {
    auth: AuthState
}

export interface JwtPayload {
    username: string;
    user_id: string;
    role: string;
    iat: string;
    exp: string;
}