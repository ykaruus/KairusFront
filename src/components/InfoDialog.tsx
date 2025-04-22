import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Typography,
    Divider,
    Stack
} from '@mui/material';














export default function InfoDialog({ open, setOpen, data, title }: { open: boolean, setOpen: any, data: any, title : string }) {
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>

                <Stack spacing={1}>
                    {Object.entries(data as any).map(([key, value] : any) => (

                        <Typography key={key} component="div">
                            <Typography color="textSecondary" variant="subtitle2">{key}</Typography>
                            <Divider />
                            <Typography variant="body1" >{value}</Typography>
                        </Typography>
                    ))}
                </Stack>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} variant="contained">Fechar</Button>
            </DialogActions>
        </Dialog>
    );
}
