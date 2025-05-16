import { AppBar, Box, ButtonBase, Card, Divider, Grid, IconButton, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material"
import { MenuRounded, MoreVertRounded as Menu, Event, AdminPanelSettings } from "@mui/icons-material"
import PainelCards from "../components/Cards/HomeCard"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MenuSlider from "../components/MenuDrawer";
import CustomMenu from "../components/Menu";
import AlertDialog from "../components/Confirm";
import InfoDialog from "../components/Dialog/InfoDialog";




function Home() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const navigator = useNavigate()
    const [menuDrawer, setMenuDrawer] = useState(false);
    const [authAdmin, setAuthAdmin] = useState(false);
    const [menuShow, setMenuShow] = useState(false);
    const about_details = {
        "Criado por": "Icaro Gagarin",
        "Email": "icarogagarincontato@gmail.com",
    }
    const [alertDialog, setAlertDialog] = useState<{
        open: boolean;
        title: string;
        text: string;
        btn_cancel_text: string;
        btn_confirm_text: string;
        onConfirm: () => void
    }>({
        open: false,
        title: "",
        text: "",
        btn_cancel_text: "",
        btn_confirm_text: "",
        onConfirm: () => { }
    });

    const menuActions = [
        {
            name: "Sair", handler: () => {
                setAlertDialog({
                    open: true,
                    title: "Sair do sistema?",
                    text: "Tem certeza que deseja do sistema?",
                    btn_cancel_text: "Não",
                    btn_confirm_text: "Sim, sair",
                    onConfirm: () => {
                        localStorage.removeItem("token");
                        navigator("/login")
                    }
                })
            }
        },
        { name: "Sobre", handler: () => setInfoDialog({ data: about_details, open: true, title: "Sobre" }) },
    ]
    const homeCards = [
        {
            handler: () => navigator("/scheduled"),
            title: "Aulas experimentais",
            text: "Monitore, crie ou delete agendamentos de aulas experimentais do dia",
            icon: (<Event />),
            disabled: false
        },
        {
            handler: () => console.log("Function 1 clicked"),
            title: "Painel admin",
            text: "crie ou delete credênciais de login, mude permissões",
            icon: (<AdminPanelSettings />),
            disabled: true
        }
    ]

    const [infoDialog, setInfoDialog] = useState({
        open: false,
        data: {},
        title: ""
    });
    return (
        <>
            {
                alertDialog && (<AlertDialog open={alertDialog.open} setOpen={setAlertDialog} title={alertDialog.title
                } text={alertDialog.text} handlerConfirm={alertDialog.onConfirm} btn_text_cancel={alertDialog.btn_cancel_text} btn_text_confirm={alertDialog.btn_confirm_text}></AlertDialog>)
            }
            {
                infoDialog.open && (
                    <InfoDialog open={infoDialog.open} setOpen={setInfoDialog} data={infoDialog.data} title={infoDialog.title} />
                )
            }
            <MenuSlider open={menuDrawer} setOpen={setMenuDrawer}></MenuSlider>
            <Box sx={{ p: 4, backgroundColor: '#222831', minHeight: '100vh', color: 'white' }}>
                <AppBar>
                    <Toolbar >
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>Academia Painel</Typography>

                        <IconButton size="large" aria-controls="menu-appbar" edge="end">
                            <CustomMenu open={menuShow} setOpen={setMenuShow} items={menuActions} />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Box sx={{ p: 5, mt: 5 }}>
                    <Typography variant="h4">
                        Bem vindo {
                            (() => {
                                const authDetails = localStorage.getItem("auth_token_details");
                                if (authDetails) {
                                    try {
                                        const parsed = JSON.parse(authDetails);
                                        return parsed.token_config.username || "";
                                    } catch {
                                        return "";
                                    }
                                }
                                return "";
                            })()
                        }
                    </Typography>
                    <Typography variant="h5">Segue suas opções disponiveis:</Typography>

                </Box>
                <Divider></Divider>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>

                    <Grid container spacing={2} justifyContent={"center"} maxWidth={"70%"} gridTemplateColumns={{
                        xs: '1fr',
                        sm: '1fr 1fr',
                        md: '1fr 1fr 1fr'
                    }}>

                        {
                            homeCards.map(item =>
                                (<PainelCards HandlerCard={item.handler} title={item.title} text={item.text} icon={item.icon} disabled={item.disabled}></PainelCards>)
                            )
                        }

                    </Grid>

                </Box>
            </Box >
        </>
    )
}


export default Home

function setAlertDialog(arg0: { open: boolean; title: string; text: string; btn_cancel_text: string; btn_confirm_text: string; onConfirm: () => void; }) {
    throw new Error("Function not implemented.");
}
function setInfoDialog(arg0: { data: { "Criado por": string; Email: string; }; open: boolean; title: string; }) {
    throw new Error("Function not implemented.");
}

