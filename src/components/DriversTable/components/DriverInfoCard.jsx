import React from "react";
import { Grid, Typography } from "@mui/material";

export default function DriverInfoCard({ driverName, vehicle }) {
    return (
        <Grid container justifyContent='flex-end'>
            <Grid item textAlign='left' style={{ minWidth: 250 }}>
                <Typography>
                    Selecionado:
                </Typography>
                <Typography fontWeight={700}>
                    Motorista: <span style={{ fontWeight: 400 }}>{driverName || "-"}</span>
                </Typography>
                <Typography fontWeight={700}>
                    Veículo: <span style={{ fontWeight: 400 }}>{vehicle.length !== 0 ? vehicle?.vehicleBrand + ' - ' + vehicle?.vehiclePlate : "-"}</span>
                </Typography>
            </Grid>
        </Grid>
    )
}