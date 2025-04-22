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
  FormControl
} from '@mui/material';





export default function FilterDialog({filtros,  handleFiltroChange, handlerLimparFiltro, open, setOpen} : {filtros : any, handleFiltroChange : any, open : boolean, setOpen : (open : any) => void, handlerLimparFiltro: (filtros : any) => void}) {
    
    return  (<>
      
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Filtrar agendamentos</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1}}>
            <TextField
              sx={{ mt: 2 }}
              label="Nome"
              name="name"
              value={filtros.name}
              onChange={handleFiltroChange}
            />
            <TextField
              label="Telefone"
              name="phoneNumber"
              value={filtros.phoneNumber}
              onChange={handleFiltroChange}
            />
            <TextField
              label="Data"
              name="dateScheduled"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={filtros.dateScheduled}
              onChange={handleFiltroChange}
            />
            <TextField
              label="Horário"
              name="timeScheduled"
              type="time"
              InputLabelProps={{ shrink: true }}
              value={filtros.timeScheduled}
              onChange={handleFiltroChange}
            />
            <TextField
              label="ID do Usuário"
              name="userId"
              value={filtros.userId}
              onChange={handleFiltroChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handlerLimparFiltro}>Limpar</Button>
            <Button onClick={() => setOpen(false)}>Fechar</Button>
          </DialogActions>
        </Dialog>
      </>);
}