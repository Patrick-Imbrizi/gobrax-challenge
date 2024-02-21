import React from "react";
import animationData from '../lottie/loading.json';
import Lottie from 'react-lottie';
import { Box, Typography } from "@mui/material";

export default function Loading() {
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
        </Box>
    )
}