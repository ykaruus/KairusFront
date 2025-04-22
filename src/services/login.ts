import axios, { AxiosError } from "axios";
import { api } from "./routes/apiRoutes";


const API_URL = api.auth.ROUTE_LOGIN;



export const set_token = (token : string) => {
    localStorage.setItem("token", token)
}

export const login = async (credentials: { username: string; password: string }) => {
    try {
        const response = await axios.post(API_URL, credentials, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error: any) {
        throw error;
    }
};


export const removeToken =() => {
    localStorage.removeItem("token")
}

