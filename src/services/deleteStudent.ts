import axios from "axios"
import { api } from "./routes/apiRoutes";




const endpoint = api.students.STUDENTS_ROUTE;



export const deleteScheduled = async (userId : any) =>{
    try {

        const response = await axios.delete(endpoint,  {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }, 
            params: {
                ids: userId
            }

        });





        return response;
    } catch (err) {
        throw err;
    }
}