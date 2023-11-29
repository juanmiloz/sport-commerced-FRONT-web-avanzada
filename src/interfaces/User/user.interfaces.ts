export interface UserData {
    email?: string,
    username?: string,
    firstName?: string,
    lastName?: string,
    phone?: string,
    address?: string,
    password?: string,
    confirmPassword?: string,
}

export interface UserInterface {
    "user_id": number,
    "email": string,
    "username": string,
    "firstName": string,
    "lastName": string,
    "phone": string,
    "address": string,
    "password": string,
    "role": string
}
export interface UserFormInterface {
    "email": string,
    "username": string,
    "firstName": string,
    "lastName": string,
    "phone": string,
    "address": string,
    "password": string,
    "role": string
}