import { Box, Card, CardContent, IconButton, TextField, Typography, useMediaQuery } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export default function ListaProdutosCard({ produtos, onUpdate, onRemove }) {
    const isMobile = useMediaQuery("(max-width: 600px)");

    return (
        <Card sx={{ width: "92%", padding: { xs: 2, md: 3 }, borderRadius: 3 }}>
            <CardContent>

                <Typography variant="h6" fontWeight="bold" mb={2}>
                    Lista de Produtos
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={3}>
                    {produtos.length} produto(s) cadastrado(s)
                </Typography>

                {!isMobile && (
                    <>
                        <Box
                            display="grid"
                            gridTemplateColumns="2fr 1fr 1fr 1fr 80px"
                            columnGap={3}
                            fontWeight="bold"
                            mb={1}
                        >
                            <Typography>Produto</Typography>
                            <Typography>Preço Unit.</Typography>
                            <Typography>Qtd.</Typography>
                            <Typography>Subtotal</Typography>
                            <Typography>Ações</Typography>
                        </Box>
                        <Box sx={{ borderBottom: "1px solid #ccc", mb: 2 }} />
                    </>
                )}

                {produtos.map((p) => (
                    <Box
                        key={p.id}
                        sx={{
                            display: "grid",
                            gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr 1fr 80px",
                            alignItems: "center",
                            border: isMobile ? "1px solid #ddd" : "none",
                            borderRadius: 2,
                            padding: isMobile ? 2 : 0,
                            mb: { xs: 2, md: 1.5 },
                            rowGap: isMobile ? 1.5 : 0,
                            columnGap: 3,
                        }}
                    >

                        <Typography fontSize={{ xs: "1rem", md: "1rem" }} fontWeight={isMobile ? "bold" : "normal"}>
                            {isMobile && "Produto: "}
                            {p.nome}
                        </Typography>

                        <Box>
                            {isMobile && (
                                <Typography fontWeight="bold" fontSize="0.85rem">Preço Unitário:</Typography>
                            )}
                            <TextField
                                type="number"
                                size="small"
                                value={p.preco}
                                onChange={(e) => onUpdate(p.id, "preco", e.target.value)}
                                sx={{
                                    backgroundColor: "#f5f5f5",
                                    width: { xs: "100%", md: "110px" },
                                }}
                            />
                        </Box>

                        <Box>
                            {isMobile && (
                                <Typography fontWeight="bold" fontSize="0.85rem">Quantidade:</Typography>
                            )}
                            <TextField
                                type="number"
                                size="small"
                                value={p.quantidade}
                                onChange={(e) => onUpdate(p.id, "quantidade", e.target.value)}
                                sx={{
                                    backgroundColor: "#f5f5f5",
                                    width: { xs: "100%", md: "80px" },
                                }}
                            />
                        </Box>

                        <Box>
                            {isMobile && (
                                <Typography fontWeight="bold" fontSize="0.85rem">Subtotal:</Typography>
                            )}
                            <Typography
                                sx={{ color: "green", fontWeight: "bold" }}
                                fontSize={{ xs: "1rem", md: "1.1rem" }}
                            >
                                R$ {(p.preco * p.quantidade).toFixed(2)}
                            </Typography>
                        </Box>

                        <Box>
                            {isMobile && (
                                <Typography fontWeight="bold" fontSize="0.85rem">Ações:</Typography>
                            )}
                            <IconButton
                                color="error"
                                onClick={() => onRemove(p.id)}
                                sx={{ mt: isMobile ? 0.5 : 0 }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>

                    </Box>
                ))}

            </CardContent>
        </Card>
    );
}
