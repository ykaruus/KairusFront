import { Drawer, List, ListItemText, Box, Typography, ListItemIcon, Stack, ListItemButton, Divider } from '@mui/material';
import {AdminPanelSettingsOutlined as AdminIcon, HomeOutlined as Home} from "@mui/icons-material"


export default function MenuSlider({open, setOpen} : {open : boolean, setOpen: (open : boolean) => void}) {

    return (
        <>
            {/* Botão de abrir o menu */}

            {/* Drawer (menu lateral) */}
            <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
                <Box  sx={{  backgroundColor: "#1c1c1c", color: "#fff",  maxWidth: 600, paddingTop: 2, height: "100%", padding: "20px"}} role="presentation" onClick={() => setOpen(false)}>
                    <Stack spacing={"10px"}>
                    <Typography variant='h6' textAlign={"center"} >Sistema Esplay</Typography>
                    <List >
                        <ListItemButton>
                            <ListItemIcon>
                                <Home />
                            </ListItemIcon>
                            <ListItemText>Aulas Experimentais</ListItemText>
                        </ListItemButton>
                        <ListItemButton >
                            <ListItemIcon>
                                <AdminIcon />
                            </ListItemIcon>
                            <ListItemText>Admin</ListItemText>
                        </ListItemButton>
                    </List>
                    </Stack>
                    <Divider />
                </Box>


            
            </Drawer>
        </>
    );
}
