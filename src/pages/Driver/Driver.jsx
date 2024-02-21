import { Box, Paper, Typography, TextField, Button, Container, FormControl, InputLabel, MenuItem, Select, Autocomplete } from "@mui/material";
import React, { useEffect, useState } from "react";
import { addDriver } from "../../services/drivers";
import { getVehicles } from "../../services/vehicles";
import { getDrivers } from "../../services/drivers";

export default function Driver() {
    const [driver, setDriver] = useState('');
    const [driversList, setDriversList] = useState([])
    const [cpf, setCpf] = useState('');
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState('');


    const handleVehicleChange = (event) => {
        setSelectedVehicle(event.target.value);
    };


    // add validations here (cpf, unique vehicle id etc)
    const handleSubmit = async (e) => {
        const model = {
            name: driver,
            documentNumber: cpf,
            vehicleId: selectedVehicle
        }
        try {
            const response = await addDriver(model);
            console.log(response.data,)
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getVehicles().then((data) => setVehicles(data.data));
        getDrivers().then((data) => setDriversList(data.data))
    }, [])

    return (
        <>
            <Container style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
                <Autocomplete
                    id="driversList"
                    size="small"
                    options={driversList}
                    sx={{ width: 300 }}
                    getOptionLabel={(option) => option.name + ' - CPF: ' + option.documentNumber}
                    renderInput={(params) => <TextField {...params} label="Selecione o motorista" />}
                />
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
                                Cadastro de Motorista
                            </Typography>
                            <TextField
                                required
                                size="small"
                                id="driver"
                                label="Nome completo"
                                variant="outlined"
                                value={driver}
                                onChange={(e) => setDriver(e.target.value)}
                            />
                            <TextField
                                required
                                size="small"
                                id="documentNumber"
                                label="Número do CPF"
                                variant="outlined"
                                value={cpf}
                                type="number"
                                onChange={(e) => setCpf(e.target.value)}
                            />
                            <>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth disabled={vehicles.length < 1}>
                                        <InputLabel size="small" id="demo-simple-select-label">Veículos</InputLabel>
                                        <Select
                                            size="small"
                                            labelId="vehicle-select-label"
                                            id="vehicle-select"
                                            value={selectedVehicle}
                                            label="Veículos"
                                            onChange={handleVehicleChange}
                                        >
                                            <MenuItem value="">Selecione um veículo</MenuItem>
                                            {vehicles && vehicles.map((vehicle) => (
                                                <MenuItem key={vehicle.id} value={vehicle.id}>
                                                    {vehicle.vehicleBrand} - {vehicle.vehiclePlate}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </>
                            <Button style={{ maxWidth: '390px' }} variant="contained" color="primary" type="submit">
                                Criar
                            </Button>
                        </Paper>
                    </form>
                </Container>
            </Container>
        </>
    );
}