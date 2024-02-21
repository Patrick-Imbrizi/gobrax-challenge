import { Box, Paper, Typography, TextField, Button, Container } from "@mui/material";
import React, { useState } from "react";
import { addVehicle } from "../../services/vehicles";

export default function Vehicle() {
    const [marca, setMarca] = useState('');
    const [placa, setPlaca] = useState('');


    // add validations here ()
    const handleSubmit = async () => {
        const model = {
            vehicleBrand: marca,
            vehiclePlate: placa
        }
        try {
            const response = await addVehicle(model);
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
            <form onSubmit={handleSubmit}>
                <Paper
                    style={{
                        padding: 24,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 12,
                    }}
                >
                    <Typography variant="h6" fontWeight={700}>
                        Cadastro de Veículos
                    </Typography>
                    <TextField
                        required
                        size="small"
                        id="marca"
                        label="Marca"
                        variant="outlined"
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                    />
                    <TextField
                        required
                        size="small"
                        id="placa"
                        label="Placa"
                        variant="outlined"
                        value={placa}
                        onChange={(e) => setPlaca(e.target.value)}
                    />
                    <Button style={{ maxWidth: '390px' }} variant="contained" color="primary" type="submit">
                        Criar
                    </Button>
                </Paper>
            </form>
        </Container>
    );
}