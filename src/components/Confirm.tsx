import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText

} from '@mui/material';





export default function AlertDialog({ open, setOpen, handlerConfirm, title, text, btn_text_cancel, btn_text_confirm }: { open: boolean, setOpen: any, handlerConfirm: () => void, title: string, text: string, btn_text_cancel: string, btn_text_confirm: string }) {

  return (<>

    <Dialog open={open} onClose={() => setOpen(true)} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1, minWidth: 350 }}>
        <DialogContentText variant='body2'>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>{btn_text_cancel}</Button>
        <Button onClick={() => handlerConfirm()}>{btn_text_confirm}</Button>
      </DialogActions>
    </Dialog>
  </>);
}