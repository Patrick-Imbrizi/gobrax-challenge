import { Box, Paper, Typography, TextField, Button, Container, FormControl, InputLabel, MenuItem, Select, Autocomplete, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { addDriver, deleteDriver, editDriver } from "../../services/drivers";
import { getVehicleById, getVehicles } from "../../services/vehicles";
import { getDrivers } from "../../services/drivers";
import { cpfMask } from "../../helper/cpfMask";
import { onlyNumberMask } from "../../helper/onlyNumberMask";
import { plateMask } from "../../helper/plateMask";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function Driver() {
    const [driver, setDriver] = useState('');
    const [driversList, setDriversList] = useState([])
    const [cpf, setCpf] = useState('');
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [selectedDriverVehicle, setSelectedDriverVehicle] = useState([]);
    const [errorText, setErrorText] = useState('');



    const handleSubmit = async (e) => {
        e.preventDefault();
        const model = {
            name: driver,
            documentNumber: onlyNumberMask(cpf),
            vehicleId: selectedVehicle
        }
        try {
            const response = await addDriver(model);
            if (response.status === 200) {
                toast.success("Motorista criado com sucesso!")
            }
        } catch (error) {
            console.log(error);
        } finally {
            toast.success("Motorista criado com sucesso!")
            window.location.reload()
        }
    };

    const handleCpfChange = (e) => {
        const newCpf = e.target.value;
        const formattedCpf = cpfMask(newCpf);

        setCpf(formattedCpf);
    }


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

    const handleCpfEditChange = (e) => {
        const newCpf = e.target.value;
        const formattedCpf = cpfMask(newCpf);
        setSelectedDriver({ ...selectedDriver, documentNumber: formattedCpf })
    }



    const handleEdit = async () => {
        const model = {
            id: selectedDriver.id,
            name: selectedDriver.name,
            documentNumber: onlyNumberMask(selectedDriver.documentNumber),
            vehicleId: selectedDriverVehicle,
        }
        try {
            await editDriver(model);
        } catch (error) {
            console.log(error);
            toast.error("Erro ao editar motorista")
        } finally {
            toast.success("Motorista editado com sucesso!")
        }
    }

    const handleDelete = async () => {
        try {
            await deleteDriver(selectedDriver.id);
        } catch (error) {
            console.log(error);
            toast.error("Erro ao apagar motorista")
        } finally {
            toast.success("Motorista apagado com sucesso!")
            window.location.reload();
        }
    }


    useEffect(() => {
        getVehicles().then((data) => setVehicles(data.data));
        getDrivers().then((data) => setDriversList(data.data));
    }, [])

    return (
        <>
            <ToastContainer />
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
                                    helperText={errorText && errorText}
                                    variant="outlined"
                                    value={cpf}
                                    onChange={handleCpfChange}
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
                                                    {vehicle.vehicleBrand} - {plateMask(vehicle.vehiclePlate)}
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
                        noOptionsText={'Sem opções'}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionKey={(option) => option.id}
                        getOptionLabel={(option) => option.name + ' - ' + cpfMask(option.documentNumber)}
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
                                        value={selectedDriver ? cpfMask(selectedDriver.documentNumber) : ''}
                                        onChange={handleCpfEditChange}
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