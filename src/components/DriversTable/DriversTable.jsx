import React, { useState } from 'react';
import { DataGrid, useGridApiContext } from '@mui/x-data-grid';
import { Box, Grid, Typography } from '@mui/material';


const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Nome', flex: 1 },
    { field: 'documentNumber', headerName: 'Documento', flex: 1, sortable: false },
    { field: 'linked', headerName: 'Vínculo', flex: 1 }
]

const rows = [
    {
        "id": 1,
        "name": "Imbrizi",
        "documentNumber": "123.345.123-10",
        "linked": true,
        "vehicle": "PAD-9339"
    },
    {
        "id": 2,
        "name": "Patrick",
        "documentNumber": "321.323.123-22",
        "linked": false,
        "vehicle": "PAD-9339"
    },
    {
        "id": 3,
        "name": "Nome 3",
        "documentNumber": "456789012-34",
        "linked": true,
        "vehicle": "PAD-9339"
    },
    {
        "id": 4,
        "name": "Nome 4",
        "documentNumber": "123456789-56",
        "linked": false,
        "vehicle": "PAD-9339"
    },
    {
        "id": 5,
        "name": "Nome 5",
        "documentNumber": "987654321-78",
        "linked": true,
        "vehicle": "PAD-9339"
    },
    {
        "id": 6,
        "name": "Nome 6",
        "documentNumber": "135792468-90",
        "linked": false,
        "vehicle": "PAD-9339"
    },
    {
        "id": 7,
        "name": "Nome 7",
        "documentNumber": "246810357-92",
        "linked": true,
        "vehicle": "PAD-9339"
    },
    {
        "id": 8,
        "name": "Nome 8",
        "documentNumber": "357924681-04",
        "linked": false,
        "vehicle": "PAD-9339"
    },
    {
        "id": 9,
        "name": "Nome 9",
        "documentNumber": "468103579-26",
        "linked": true,
        "vehicle": "PAD-9339"
    },
    {
        "id": 10,
        "name": "Nome 10",
        "documentNumber": "579246810-38",
        "linked": false,
        "vehicle": "PAD-9339"
    },
    {
        "id": 11,
        "name": "Nome 11",
        "documentNumber": "681035792-50",
        "linked": true,
        "vehicle": "PAD-9339"
    },
    {
        "id": 12,
        "name": "Nome 12",
        "documentNumber": "792468103-72",
        "linked": false,
        "vehicle": "PAD-9339"
    },
    {
        "id": 13,
        "name": "Nome 13",
        "documentNumber": "803579246-84",
        "linked": true,
        "vehicle": "PAD-9339"
    },
    {
        "id": 14,
        "name": "Nome 14",
        "documentNumber": "914681035-96",
        "linked": false,
        "vehicle": "PAD-9339"
    },
    {
        "id": 15,
        "name": "Nome 15",
        "documentNumber": "203579246-08",
        "linked": true,
        "vehicle": "PAD-9339"
    },
    {
        "id": 16,
        "name": "Nome 16",
        "documentNumber": "314681035-20",
        "linked": false,
        "vehicle": "PAD-9339"
    },
    {
        "id": 17,
        "name": "Nome 17",
        "documentNumber": "425792468-32",
        "linked": true,
        "vehicle": "PAD-9339"
    },
    {
        "id": 18,
        "name": "Nome 18",
        "documentNumber": "536810357-44",
        "linked": false,
        "vehicle": "PAD-9339"
    },
    {
        "id": 19,
        "name": "Nome 19",
        "documentNumber": "647924681-56",
        "linked": true,
        "vehicle": "PAD-9339"
    },
]

export default function DriversTable() {
    const [selectionModel, setSelectionModel] = useState([]);
    const handleSelectionChange = (newSelection) => {
        setSelectionModel(newSelection.slice(-1));
    }
    const selectedRow = rows.filter((row) => row.id == selectionModel[0])
    console.log(selectedRow, "SELECTED")

    return (
        <Box sx={{ color: 'black', width: '100%' }}>
            <Grid container justifyContent='flex-end'>
                <Grid item textAlign='left'>
                    <Typography>
                        Selecionado:
                    </Typography>
                    <Typography fontWeight={700}>
                        Motorista: <span style={{ fontWeight: 400 }}>{selectedRow[0]?.name || "-"}</span>
                    </Typography>
                    <Typography fontWeight={700}>
                        Veículo: <span style={{ fontWeight: 400 }}>{selectedRow[0]?.vehicle || "-"}</span>
                    </Typography>
                </Grid>
            </Grid>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                rowSelectionModel={selectionModel}
                onRowSelectionModelChange={handleSelectionChange}
            />
        </Box>
    )
}