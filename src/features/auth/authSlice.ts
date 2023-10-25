import {createSlice} from "@reduxjs/toolkit";
import {AuthState} from "../../interfaces/Auth/auth.interfaces.ts";


const initialState : AuthState = {
    value: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.value = {
                username: action.payload.username,
                password: action.payload.password,
                access_token: action.payload.access_token
            }
        },
        logout: (state) => {
            state.value = null
        },
    }
})

export const {login, logout}= authSlice.actions

export default authSlice.reducer