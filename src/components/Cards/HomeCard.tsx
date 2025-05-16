
import { Box, ButtonBase, Card, CardContent, IconButton, Typography } from "@mui/material"






function PainelCards({ HandlerCard, title, text, icon, disabled }: { HandlerCard: () => void, title: string, text: string, icon: any, disabled: boolean }) {
    return (
        <ButtonBase onClick={() => HandlerCard()} sx={{ minWidth: 350, minHeight: 200 }} disabled={disabled}>
            <Card sx={{
                maxWidth: "100%", maxHeight: "100%", p: 2, boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.31)',
                transition: 'transform 0.2s ease',
                '&:hover': {
                    transform: 'scale(1.03)',

                }
            }}>
                <CardContent sx={{ display: "flex", flexDirection: "row" }}>
                    <IconButton disableRipple disableFocusRipple size="large" color={'primary'} disabled={disabled} edge="start">
                        {icon}
                    </IconButton>
                    <Box sx={{ textAlign: "start" }}>
                        <Typography color={disabled ? 'text.disabled' : 'text.primary'} variant="h6">{title}</Typography>
                        <Typography color={disabled ? 'text.disabled' : 'text.primary'} variant="body2">{text}</Typography>
                    </Box>
                </CardContent>
            </Card>
        </ButtonBase>
    )
}




export default PainelCards;