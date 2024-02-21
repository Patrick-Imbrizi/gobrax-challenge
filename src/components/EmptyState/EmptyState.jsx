import React from "react";
import animationData from '../lottie/not-found.json';
import Lottie from 'react-lottie';
import { Box, Typography } from "@mui/material";

export default function EmptyState() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <Box style={{ marginTop: 24, padding: 24 }}>
            <Lottie
                options={defaultOptions}
                height={200}
                width={200}
            />
            <Typography color="#9f9f9f" fontStyle="italic">
                Nenhum dado foi encontrado. Cadastre ao menos um motorista para poder visualizar a tabela.
            </Typography>
        </Box>
    )
}