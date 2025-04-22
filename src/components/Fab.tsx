import React from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function FAB({ props }: { props: any }) {
  return (
    <Fab 
      color="primary" 
      aria-label="add" 
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1000
      }}
    >
      {props}
    </Fab>
  );
}
