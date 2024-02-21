import { Button, Grid } from '@mui/material';
import React from 'react';
import Logo from '../../assets/gobrax.png';

export default function Header() {
    return (
        <Grid container justifyContent='space-between' alignItems='center' marginBottom={4} backgroundColor='white' width='100%'>
            <Grid item xs justifyContent={'flex-start'} sx={{ display: { xs: 'none', md: 'block' } }}>
                <Button
                    href='/driver'
                    variant='text'
                    style={{ color: 'black', textTransform: 'none', fontWeight: '700', letterSpacing: 'normal' }}
                >
                    Motoristas
                </Button>
                <Button
                    href='/vehicle'
                    variant='text'
                    style={{ color: 'black', textTransform: 'none', fontWeight: '700', letterSpacing: 'normal' }}
                >
                    Veículos
                </Button>
            </Grid>
            <Grid item xs={8}>
                <img src={Logo} height={50} />
            </Grid>
            <Grid item xs style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    href='https://www.linkedin.com/in/pimbrizi/'
                    target='_blank'
                    variant='contained'
                    style={{ backgroundColor: '#1323B0', color: 'white', letterSpacing: 'normal', textTransform: 'none', fontWeight: '700' }}
                >
                    LinkedIn
                </Button>
            </Grid>
        </Grid>
    )
}