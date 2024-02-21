import { Paper, Typography, TextField, Button, Container, Autocomplete, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { addVehicle, deleteVehicle, editVehicle, getVehicles } from "../../services/vehicles";
import { plateMask } from "../../helper/plateMask";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function Vehicle() {

    const [vehiclesList, setVehiclesList] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [brand, setBrand] = useState('');
    const [plate, setPlate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const model = {
            vehicleBrand: brand,
            vehiclePlate: plate.replace(/\W/g, "").substring(0, 7)
        }
        try {
            await addVehicle(model);
        } catch (error) {
            console.log(error);
            toast.error("Erro ao criar veículo")
        } finally {
            toast.success("Veículo criado com sucesso!")
            window.location.reload();
        }
    };

    const onVehicleListChange = async (event, newValue) => {
        setSelectedVehicle(newValue);
    }



    const handleEdit = async (e) => {
        const model = {
            id: selectedVehicle.id,
            vehicleBrand: selectedVehicle.vehicleBrand,
            vehiclePlate: selectedVehicle.vehiclePlate.replace(/\W/g, "").substring(0, 7)
        }
        try {
            await editVehicle(model);
        } catch (error) {
            console.log(error);
            toast.error("Erro ao editar veículo")
        } finally {
            toast.success("Veículo editado com sucesso!")
        }
    }

    const handleDelete = async () => {
        try {
            await deleteVehicle(selectedVehicle.id);
        } catch (error) {
            console.log(error);
        } finally {
            toast.success("Veículo apagado com sucesso!")
            window.location.reload();
        }
    }


    useEffect(() => {
        getVehicles().then((data) => setVehiclesList(data.data));
    }, [])

    return (
        <>
            <ToastContainer />
            <Container style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
                <Typography align='left' variant='h5' fontWeight={700} marginBottom={2}>
                    Cadastro de veículo
                </Typography>
                <Paper style={{ padding: 24, borderRadius: 12 }}>
                    <form onSubmit={handleSubmit}>
                        <Grid container display='flex' flexWrap='wrap' gap={2}>
                            <Grid item xs={12} md={4} style={{ flex: 1 }}>
                                <Typography marginBottom={1} align='left' fontWeight={600}>
                                    Marca do veículo:
                                </Typography>
                                <TextField
                                    required
                                    style={{ minWidth: 200, width: '100%' }}
                                    size="small"
                                    id="vehicleBrand"
                                    label="Digite a marca"
                                    variant="outlined"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} style={{ flex: 1 }}>
                                <Typography marginBottom={1} align='left' fontWeight={600}>
                                    Placa do veículo:
                                </Typography>
                                <TextField
                                    required
                                    style={{ minWidth: 200, width: '100%' }}
                                    size="small"
                                    id="vehiclePlate"
                                    label="Digite a placa"
                                    variant="outlined"
                                    value={plateMask(plate)}
                                    onChange={(e) => setPlate(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} display='flex' justifyContent='flex-start'>
                                <Button variant="contained" color="primary" type="submit">
                                    Criar
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
                <Typography align='left' variant='h5' fontWeight={700} marginBottom={2} marginTop={4}>
                    Editar veículo
                </Typography>
                <Paper style={{ padding: 24, borderRadius: 12 }}>
                    <Typography marginBottom={1} align='left' fontWeight={600}>
                        Selecione um veículo:
                    </Typography>
                    <Autocomplete
                        id="vehiclesList"
                        size="small"
                        options={vehiclesList}
                        getOptionKey={(option) => option.id}
                        sx={{ minWidth: 200, marginBottom: 4 }}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        onChange={onVehicleListChange}
                        getOptionLabel={(option) => option.vehicleBrand + ' - ' + plateMask(option.vehiclePlate)}
                        renderInput={(params) => <TextField {...params} label="Pesquise pelo veículo" />}
                    />
                    {selectedVehicle ?
                        <form onSubmit={handleEdit}>
                            <Grid container display='flex' flexWrap='wrap' gap={2}>
                                <Grid item xs={12} md={4} style={{ flex: 1 }}>
                                    <Typography marginBottom={1} align='left' fontWeight={600}>
                                        Marca do veículo:
                                    </Typography>
                                    <TextField
                                        required
                                        style={{ minWidth: 200, width: '100%' }}
                                        size="small"
                                        id="vehicle"
                                        label="Digite a marca"
                                        variant="outlined"
                                        value={selectedVehicle ? selectedVehicle.vehicleBrand : ''}
                                        onChange={(e) => setSelectedVehicle({ ...selectedVehicle, vehicleBrand: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4} style={{ flex: 1 }}>
                                    <Typography marginBottom={1} align='left' fontWeight={600}>
                                        Placa do veículo:
                                    </Typography>
                                    <TextField
                                        required
                                        style={{ minWidth: 200, width: '100%' }}
                                        size="small"
                                        id="vehiclePlate"
                                        label="Digite a placa"
                                        variant="outlined"
                                        value={selectedVehicle ? plateMask(selectedVehicle.vehiclePlate) : ''}
                                        onChange={(e) => setSelectedVehicle({ ...selectedVehicle, vehiclePlate: e.target.value })}
                                    />
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