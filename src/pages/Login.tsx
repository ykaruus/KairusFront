// src/pages/Formulario.jsx
import { useEffect, useState } from 'react';
import { TextField, Button, Typography, Stack, Box, Alert, IconButton, keyframes, Slide, Snackbar } from '@mui/material';
import logo from "../assets/logoTop.png"
import CloseIcon from '@mui/icons-material/Close';
import { login, set_token } from '../services/login';
import LoadingButton from "@mui/material/Button"
import style from "../css/img.module.css";
import { useNavigate } from 'react-router-dom';

const shake_animation = keyframes`
  0% { transform: translateX(0); }
  20% { transform: translateX(-5px); }
  40% { transform: translateX(5px); }
  60% { transform: translateX(-5px); }
  80% { transform: translateX(5px); }
  100% { transform: translateX(0); }
`;




export default function Login() {
    const [showAlert, setShowAlert] = useState(false);
    const [shake, setShake] = useState(false);
    const [form, setForm] = useState({
        nome: '',
        senha: ''
    });
    const navigate = useNavigate();

    const [severity, setSeverity] = useState<"error" | "success" | "warning" | "info">("success");
    const [message, setMessage] = useState("success");
    const [Loading, setLoading] = useState(false);

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    const handleShowOk = (severityParam : "error" | "success" | "warning" | "info", message : string) => {
        setSeverity(severityParam);
        setMessage(message)
        setShowAlert(false);
        setShake(false);
        setTimeout(() => setShowAlert(true), 30); // pequeno delay pra re-render
    };
    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setShake(severity == "error" || severity == "warning");
            }, 300);

            return () => clearTimeout(timer);
        }

    }, [showAlert])


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if(form.nome.length == 0 || form.nome.length > 15 || form.senha.length == 0 || form.senha.length > 15 )
        {
            handleShowOk("error", "Preencha todos os campos")
        } else {
            setLoading(true);
            try {
                const response = await login({username : form.nome, password: form.senha});


                if(response.status == 200)
                {
                    handleShowOk("success", "Login efetuado com sucesso!, redirecionando para a pagina principal..");

                    setLoading(false);

                    set_token(response.token);


                    setTimeout(() => navigate("/"), 5000);

                }

                if(response.status == 404)
                {
                    handleShowOk("error", "Usuario não encontrado.");
                    
                    setLoading(false);
                }
            } catch (err : any)
            {
                handleShowOk("error", "Ocorreu um erro ao logar, verifique seu nome e senha e tente novamente")
                console.log(err)
                setLoading(false);
            }
        }

        
    };

    const slide_props = (props : any) => { 
        return <Snackbar open={showAlert} autoHideDuration={4000} onClose={() => setShowAlert(false)}>
            <Alert severity={severity} sx={{
                width : "100%",
                animation: shake ? `${shake_animation} 0.3s ease` : "none"
            }} action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => setShowAlert(false)}
                    sx={{ ml: 2 }} // espaço à esquerda do botão
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
            }>
                {props.message}
            </Alert>
        </Snackbar>
    }

    return (

        <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            minWidth={"100vw"}
            minHeight={"100vh"}
            sx={
                {
                    animation: shake ? `${shake_animation} 0.5s ease` : "none"
                }
            }
        >
            <Box
                width={"600px"}
                height={"600px"}
                maxWidth={"600"}
                p={4}
                boxShadow={3}
                borderRadius={2}
                bgcolor={"#343a40"}>
                <Box textAlign={"center"} mb={4}>
                    <img src={logo} alt="" style={{
                        maxWidth: "300px",
                        height: "auto"
                    }}/>
                </Box>
                <Box width={"100%"} height={"90%"} textAlign={"center"}>

                    <form onSubmit={handleSubmit}>
                        <Typography variant='h4' >Sistema Esplay</Typography>
                        <Typography variant="subtitle2" mb={4} color="text.secondary">
                            Faça login com suas credênciais para acessar o sistema interno:
                        </Typography>

                        <Stack spacing={3} width={"100%"}>
                            <TextField
                                label="Nome"
                                variant="outlined"
                                fullWidth
                                name="nome"
                                value={form.nome}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Senha"
                                variant="outlined"
                                fullWidth
                                name="senha"
                                type="password"
                                value={form.senha}
                                onChange={handleChange}
                            />
                            <LoadingButton type='submit' loading={Loading} variant="contained" >
                                Login
                            </LoadingButton>
                        </Stack>

                    </form>

                </Box>

                {/* <Slide direction='up' in={showAlert}>
                    <Alert severity='error' sx={{
                        animation: shake ? `${shake_animation} 0.3s ease` : "none"
                    }} action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => setShowAlert(false)}
                            sx={{ ml: 2 }} // espaço à esquerda do botão
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }>
                        Dados Inválidos, cheque os dados e tente novamente!!
                    </Alert>
                </Slide> */}

            
                {slide_props({ message : message})}

            </Box>
        </Box >
    );
}
