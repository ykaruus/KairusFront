
import { Fab } from '@mui/material';

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
