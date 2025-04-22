import axios from 'axios';
import { api } from './routes/apiRoutes';

const API_URL = api.students.STUDENTS_UPDATE// Replace with your API base URL

export const updateStudentById = async (id: string, updatedData: Record<string, any>) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
    });
        return response;
    } catch (error) {
        console.error('Error updating student:', error);
        throw error;
    }
};