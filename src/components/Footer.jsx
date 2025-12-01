
import { Box, Typography } from "@mui/material";

export default function Footer() {
    return (
        <Box sx={{ textAlign: "center", p: 2, opacity: 0.7 }}>
            <Typography variant="body2">
                Desenvolvido por <strong>Kelves Rodrigues</strong>
            </Typography>
        </Box>
    );
}