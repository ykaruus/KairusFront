import {
     Grid,
     Card,
     CardContent,
     Box,
     Typography,
     Stack,
     Tooltip,
     CardActions,
     IconButton,
     Chip
     


 } from "@mui/material";
import {
    Visibility as VisibilityIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    ContentCopy as ContentCopyIcon
} from "@mui/icons-material"


function CardScheduled({ modality, horario, date, name, local, status_name, status, handlers, userId }: { modality: string, horario: string, date: string, name: string, local: string, status_name: string, status: string, handlers: any, userId: string }) {
    return (
        <Card  sx={{ background:"#2C2F33", color: "#fff", maxHeight: 350, maxWidth: "100%" }}>
            <CardContent>
                <Box height={"100%"}>
                    <Typography variant="h6" fontWeight="bold">
                        {name}
                    </Typography>
                </Box>
                <Stack spacing={0.5}>
                    <Typography variant="body2">Local: {local}</Typography>
                    <Typography variant="body2">Modalidade: {modality}</Typography>
                    <Typography variant="body2">Horário: {horario}</Typography>
                    <Typography variant="body2">Data: {date}</Typography>
                    <Typography variant="body2" component={"div"}>Status: <Chip label={status_name} color={status as "error" | "success" | "warning" | "info" | "default" | "primary" | "secondary"} size="small"  ></Chip></Typography>
                    <Typography variant='body2' component={"div"}>
                        ID: <Typography variant="body2" color="textSecondary" component="span">
                            {userId}
                        </Typography>
                    </Typography>
                </Stack>
            </CardContent>
            <CardActions>
                <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                    {/* Grupo da esquerda */}
                    <Box>
                        <Tooltip title="Ver Agendamento">
                            <IconButton onClick={() => handlers.handlerSee(userId)} color="secondary">
                                <VisibilityIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Editar Agendamento">
                            <IconButton onClick={() => handlers.edit(name)} color="warning">
                                <EditIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Deletar Agendamento">
                            <IconButton onClick={() => handlers.handlerDelete(userId, name)} color="error">
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    {/* Botão da direita */}
                    <Box sx={{ marginLeft: 'auto' }}>
                        <Tooltip title="Copiar mensagem de agendamento">
                            {/* local: string, name: string, modality: string, time : string */}
                            <IconButton onClick={() => handlers.handlerCopy(local, name, modality, horario, userId, date)} color="primary">
                                <ContentCopyIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </CardActions>
        </Card>);

}



export default CardScheduled