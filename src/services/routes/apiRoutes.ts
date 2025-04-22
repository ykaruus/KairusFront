





const api_base = import.meta.env.VITE_APP_API_URL;




/*
# Admin
VITE_APP_ROUTE_ADMIN_TOKEN=/api/v1/admin/admin-token
VITE_APP_ROUTE_ADMIN_USER=/api/v1/admin/user

# Auth
VITE_APP_ROUTE_LOGIN=/api/v1/auth/login
VITE_APP_ROUTE_LOGOUT=/api/v1/auth/logout
VITE_APP_ROUTE_VERIFY_TOKEN=/api/v1/auth/verify/check-token

# Server
VITE_APP_ROUTE_SERVER_ALIVE=/api/v1/server/alive

# Students
VITE_APP_ROUTE_STUDENTS=/api/v1/students
VITE_APP_ROUTE_STUDENTS_FILTER=/api/v1/students/filter
VITE_APP_ROUTE_STUDENTS_SCHEDULED=/api/v1/students/scheduled
VITE_APP_ROUTE_STUDENTS_UPDATE=/api/v1/students/update/:userId

# WhatsApp
VITE_APP_ROUTE_WHATSAPP_SEND=/api/v1/whatsapp/send-message

*/


export const api = {
    students: {
        STUDENTS_ROUTE: api_base + "/students",
        STUDENTS_FILTER: api_base + "/students/filter",
        STUDENTS_SCHEDULED: api_base + "/students/scheduled",
        STUDENTS_UPDATE: api_base + "/students/update"
    },
    auth: {
        ROUTE_LOGIN: api_base + "/auth/login",
        ROUTE_CHECK_TOKEN: api_base + "/auth/verify/check-token"
    }
}