import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItem, ListItemText, Box, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';



export default function MenuSlider() {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (state: boolean) => () => {
        setOpen(state);
    };

    return (
        <>
            {/* Botão de abrir o menu */}
            <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon sx={{ color: 'white' }} />
            </IconButton>

            {/* Drawer (menu lateral) */}
            <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 400, paddingTop: 2, height: "100%", padding: "5px"}} role="presentation" onClick={toggleDrawer(false)}>
                    <Typography variant='h4' >Sistema Esplay</Typography>
                    <List className=''>
                        <ListItem component="button">
                            <ListItemText primary="Início" />
                        </ListItem>
                        <ListItem component="button">
                            <ListItemText primary="Criar Aula" />
                        </ListItem>
                        <ListItem component="button">
                            <ListItemText primary="Agendamentos" />
                        </ListItem>
                        <ListItem component="button">
                            <ListItemText primary="Sair" />
                        </ListItem>
                    </List>
                </Box>


                <Typography variant="subtitle1" textAlign={"center"} sx={{padding: "10px"}} color="textSecondary">Desenvolvidor por Icaro Gagarin</Typography>
            </Drawer>
        </>
    );
}
