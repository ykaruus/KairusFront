import axios from 'axios';
import { api } from './routes/apiRoutes';

const student_route = api.students.STUDENTS_ROUTE;

export const getAllStudents = async () => {
    try {
        const response = await axios.get(student_route, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            params: {
                param: "all"
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
};

export const getStudentsById = async (id : string) => {
    try {
        const response = await axios.get(student_route, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            params: {
                param: id
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
};