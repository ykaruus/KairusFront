// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#D84343', // Vermelho Esplay
    },
    secondary: {
      main: '#3AA6FF', // Branco gelo
    },
    background: {
      default: '#0B0F23', // Fundo geral
      paper: '#222426',   // Fundo dos cards
    },
    text: {
      primary: '#F2F2F2', // Texto branco gelo
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontWeight: 700,
    },
  },
});

export default theme;
