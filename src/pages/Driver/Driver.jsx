import { Box, Paper, Typography, TextField, Button, Container, FormControl, InputLabel, MenuItem, Select, Autocomplete, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { addDriver, deleteDriver, editDriver } from "../../services/drivers";
import { getVehicleById, getVehicles } from "../../services/vehicles";
import { getDrivers } from "../../services/drivers";
import Header from "../../components/Header/Header"

export default function Driver() {
    const [driver, setDriver] = useState('');
    const [driversList, setDriversList] = useState([])
    const [cpf, setCpf] = useState('');
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [selectedDriverVehicle, setSelectedDriverVehicle] = useState([]);



    const handleVehicleChange = (event) => {
        setSelectedVehicle(event.target.value);
    };
    const handleEditVehicleChange = (event) => {
        setSelectedDriverVehicle(event.target.value);
    };

    const onDriverListChange = async (event, newValue) => {
        setSelectedDriver(newValue);
        try {
            const response = await getVehicleById(newValue.vehicleId);
            if (response.status === 200) {
                setSelectedDriverVehicle(response.data.id)
            } else {
                setSelectedDriverVehicle('')
            }
        } catch (error) {
            console.log(error)
        }

    }

    // add validations here (cpf, unique vehicle id etc)
    const handleSubmit = async () => {
        const model = {
            name: driver,
            documentNumber: cpf,
            vehicleId: selectedVehicle
        }
        try {
            const response = await addDriver(model);
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = async () => {
        const model = {
            id: selectedDriver.id,
            name: selectedDriver.name,
            documentNumber: selectedDriver.documentNumber,
            vehicleId: selectedDriverVehicle,
        }
        try {
            const response = await editDriver(model);
            console.log(response.data, "data")
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async () => {
        try {
            const response = await deleteDriver(selectedDriver.id);
            console.log(response.data, "DELETE DATA")
        } catch (error) {
            console.log(error);
        } finally {
            window.location.reload();
        }
    }


    useEffect(() => {
        getVehicles().then((data) => setVehicles(data.data));
        getDrivers().then((data) => setDriversList(data.data));
    }, [])

    return (
        <>
            <Container style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
                <Typography align='left' variant='h5' fontWeight={700} marginBottom={2}>
                    Cadastro de motorista
                </Typography>
                <Paper style={{ padding: 24, borderRadius: 12 }}>
                    <form onSubmit={handleSubmit}>
                        <Grid container display='flex' flexWrap='wrap' gap={2}>
                            <Grid item xs={12} md={4} style={{ flex: 1 }}>
                                <Typography marginBottom={1} align='left' fontWeight={600}>
                                    Nome do motorista:
                                </Typography>
                                <TextField
                                    required
                                    style={{ minWidth: 200, width: '100%' }}
                                    size="small"
                                    id="driver"
                                    label="Digite o nome completo"
                                    variant="outlined"
                                    value={driver}
                                    onChange={(e) => setDriver(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} style={{ flex: 1 }}>
                                <Typography marginBottom={1} align='left' fontWeight={600}>
                                    Documento (CPF):
                                </Typography>
                                <TextField
                                    required
                                    style={{ minWidth: 200, width: '100%' }}
                                    size="small"
                                    id="documentNumber"
                                    label="Digite o CPF"
                                    variant="outlined"
                                    value={cpf}
                                    onChange={(e) => setCpf(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} style={{ flex: 1 }}>
                                <Box sx={{ minWidth: 200 }}>
                                    <Typography marginBottom={1} align='left' fontWeight={600}>
                                        Vínculo de veículo:
                                    </Typography>
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
                            </Grid>
                            <Grid item xs={12} display='flex' justifyContent='flex-end'>
                                <Button variant="contained" color="primary" type="submit">
                                    Criar
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
                <Typography align='left' variant='h5' fontWeight={700} marginBottom={2} marginTop={4}>
                    Editar motorista
                </Typography>
                <Paper style={{ padding: 24, borderRadius: 12 }}>
                    <Typography marginBottom={1} align='left' fontWeight={600}>
                        Selecione um motorista:
                    </Typography>
                    <Autocomplete
                        id="driversList"
                        size="small"
                        options={driversList}
                        sx={{ minWidth: 200, marginBottom: 4 }}
                        onChange={onDriverListChange}
                        getOptionLabel={(option) => option.name + ' - ' + option.documentNumber}
                        renderInput={(params) => <TextField {...params} label="Pesquise pelo motorista" />}
                    />
                    {selectedDriver ?
                        <form onSubmit={handleEdit}>
                            <Grid container display='flex' flexWrap='wrap' gap={2}>
                                <Grid item xs={12} md={4} style={{ flex: 1 }}>
                                    <Typography marginBottom={1} align='left' fontWeight={600}>
                                        Nome do motorista:
                                    </Typography>
                                    <TextField
                                        required
                                        style={{ minWidth: 200, width: '100%' }}
                                        size="small"
                                        id="driver"
                                        label="Digite o nome completo"
                                        variant="outlined"
                                        value={selectedDriver ? selectedDriver.name : ''}
                                        onChange={(e) => setSelectedDriver({ ...selectedDriver, name: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4} style={{ flex: 1 }}>
                                    <Typography marginBottom={1} align='left' fontWeight={600}>
                                        Documento (CPF):
                                    </Typography>
                                    <TextField
                                        required
                                        style={{ minWidth: 200, width: '100%' }}
                                        size="small"
                                        id="documentNumber"
                                        label="Digite o CPF"
                                        variant="outlined"
                                        value={selectedDriver ? selectedDriver.documentNumber : ''}
                                        onChange={(e) => setSelectedDriver({ ...selectedDriver, documentNumber: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4} style={{ flex: 1 }}>
                                    <Box sx={{ minWidth: 200 }}>
                                        <Typography marginBottom={1} align='left' fontWeight={600}>
                                            Vínculo de veículo:
                                        </Typography>
                                        <FormControl fullWidth disabled={vehicles.length < 1}>
                                            <InputLabel size="small" id="demo-simple-select-label">{selectedDriverVehicle ? "Veículos" : "Sem vínculo"}</InputLabel>
                                            <Select
                                                size="small"
                                                labelId="vehicle-select-label"
                                                id="vehicle-select"
                                                value={selectedDriverVehicle}
                                                label="Vehicles"
                                                onChange={handleEditVehicleChange}
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
                                </Grid>
                                <Grid item xs={12} display='flex' justifyContent='flex-end' gap={2}>
                                    <Button variant="contained" color="warning" onClick={handleDelete}>
                                        Apagar
                                    </Button>
                                    <Button variant="contained" color="primary" type="submit">
                                        Salvar
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                        : <></>
                    }
                </Paper>
            </Container>
        </>
    );
}