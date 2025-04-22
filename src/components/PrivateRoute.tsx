import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {verify_token} from "../services/authToken"
import { Box, CircularProgress } from '@mui/material';



interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {

    const [logado, setLogado] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();



    useEffect(()=> {
        const checkAuth = async () => {
            try {
                const response = await verify_token();
                console.log(response.validy)


                if(response.validy)
                {
                    setLogado(true);

                } else {
                    setLogado(false);
                }
            } catch (err)
            {
                setLogado(false);
            } finally {
                setLoading(false);
            }
        }
        checkAuth();
    }, [navigate])

    if(loading)
    {
        return <Box sx={{display: "flex", minHeight: "100vh", minWidth:"100vw", alignItems: "center", justifyContent: "center"}}>
            <CircularProgress></CircularProgress>
        </Box>
    }
    return logado ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;