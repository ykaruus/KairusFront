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

export default function formBox(
  { open,
    setOpen,
    formTitle,
    dataForm,
    handlerSubmit }:
    {
      open: boolean,
      setOpen: (val: boolean) => void,
      formTitle: string,
      dataForm: any,
      setDataForm: (data: any) => void,
      handlerSubmit: (data: any) => void
    }
) {

  const [error, setError] = useState({
    age: false,
    local: false,
    modality: false,
    name: false,
    phoneNumber: false,
    state: false,
    dateScheduled: false,
    timeScheduled: false
  });
  const [data, setData] = useState(dataForm);

  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setData((prev: any) => ({ ...prev, [name]: value }));
    // setError((prev: any) => ({
    //   ...prev,
    //   [name]: (["name", "phoneNumber"]).includes(name) || false
    // }));
  };


  const handler = (formData: any) => {
    const errors = {
      age: formData.age <= 0,
      local: false,
      modality: false,
      name: formData.name.trim() == "",
      phoneNumber: formData.phoneNumber.trim() == "",
      state: false,
      dateScheduled: formData.dateScheduled.trim() == "",
      timeScheduled: formData.timeScheduled.trim() == ""
    }


    setError(errors);


    const hasError = Object.values(errors).some(u => u);

    if (!hasError) {


      handlerSubmit(formData);
      setOpen(false);
    }


  }

  return (
    <>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{formTitle}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField sx={{ mt: 2 }}
            label="Nome"
            name="name"
            value={data.name}
            error={error.name}
            helperText={error.name ? 'Nome invalido!' : ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Idade"
            name="age"
            error={error.age}
            helperText={error.age ? 'Idade Invalida' : ''}
            type="number"
            value={data.age}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Telefone"
            name="phoneNumber"
            error={error.phoneNumber}
            helperText={error.phoneNumber ? 'Telefone invalido!' : ''}
            value={data.phoneNumber}
            onChange={handleChange}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Modalidade</InputLabel>
            <Select
              name="modality"
              value={data.modality}
              label="Modalidade"
              onChange={handleChange}
            // error={error.modality}
            >
              {/* ["Volei de quadra", "Basquete", "Volei de areia", "Musculacao", "Muay Thai"]; */}
              <MenuItem value={0}>Vôlei de quadra</MenuItem>
              <MenuItem value={1}>Basquete</MenuItem>
              <MenuItem value={2}>Volei de areia</MenuItem>
              <MenuItem value={3}>Musculação</MenuItem>
              <MenuItem value={4}>Muay Thai</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Horário"
            name="timeScheduled"
            type="time"
            InputLabelProps={{ shrink: true }}
            value={data.timeScheduled}
            onChange={handleChange}
            error={error.timeScheduled}
            helperText={error.timeScheduled ? 'Horario invalido!' : ''}
            fullWidth
          />
          <TextField
            label="Data"
            name="dateScheduled"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={data.dateScheduled}
            onChange={handleChange}
            error={error.dateScheduled}
            helperText={error.dateScheduled ? "Isso é obrigatorio" : ""}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Situação</InputLabel>
            <Select
              name="state"
              value={data.state}
              label="Situação"
              onChange={handleChange}
              error={error.state}
            >
              <MenuItem value={0}>Reagendou</MenuItem>
              <MenuItem value={1}>Vai fazer matrícula</MenuItem>
              <MenuItem value={2}>Fez matrícula</MenuItem>
              <MenuItem value={3}>Vai pensar</MenuItem>
              <MenuItem value={4}>Fez aula</MenuItem>
              <MenuItem value={5}>Aula experimental agendada</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Local</InputLabel>
            <Select
              name="local"
              value={data.local}
              label="Local"
              onChange={handleChange}
              error={error.local}
            >
              <MenuItem value={0}>Circulo Militar</MenuItem>
              <MenuItem value={1}>Adventista</MenuItem>
              <MenuItem value={2}>Clube Dos Sargentos</MenuItem>
              <MenuItem value={3}>Esplay</MenuItem>
            </Select>
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={() => handler(data)} variant="contained">Salvar</Button>
        </DialogActions>
      </Dialog >
    </>
  );
}


