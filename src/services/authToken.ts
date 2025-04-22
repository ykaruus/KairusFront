import axios from "axios";
import { api } from "./routes/apiRoutes";

const API_URL = api.auth.ROUTE_CHECK_TOKEN;


export const verify_token = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        });
        
        return response.data
    } catch (error: any) {
        throw error;
    }
};