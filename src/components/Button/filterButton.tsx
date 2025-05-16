
import {Chip } from '@mui/material';


















function FilterChip ({value, onDelete}:{value : any, onDelete : () => void})
{
    return (<Chip label={value} color="default" onDelete={onDelete}></Chip>);
}





export default FilterChip;