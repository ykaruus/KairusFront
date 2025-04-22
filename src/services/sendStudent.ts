import axios from "axios"
import { api } from "./routes/apiRoutes";




const endpoint = api.students.STUDENTS_ROUTE;


export const sendScheduled = async (students : any) =>{
    try {

        const response = await axios.post(endpoint, JSON.stringify(students), {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });





        return response;
    } catch (err) {
        throw err;
    }
}