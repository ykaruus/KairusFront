import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';




export default function CustomMenu({open, setOpen, items} : {open : boolean, setOpen : any , items : any[]}) {
  // const items = [
  //   {name: "Sair", handler: () => setOpen(false)},
  //   {name: "Sobre", handler: () => setOpen(false)},
  //   {name: "Sair", handler: () => setOpen(false)},
  //   {name: "Sobre", handler: () => setOpen(false)},
  // ]
  return (
    <div>
      <IconButton
        aria-controls={open ? 'menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={() => setOpen(true)}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="menu"
        open={open}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        {items.map((item) => (
          <MenuItem key={item.name} onClick={item.handler}>{item.name}</MenuItem>
        ))}
      </Menu>
    </div>
  );
}