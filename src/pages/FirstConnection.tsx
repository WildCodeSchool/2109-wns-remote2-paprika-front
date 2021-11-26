import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import InformationsForm from '../components/FirstConnection/InformationsForm'
import ProfilForm from '../components/FirstConnection/ProfilForm'
import Confidential from '../components/FirstConnection/Confidential'

function Copyright(props: any) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {'Copyright © '}
            Paprika Website created with Love
        </Typography>
    )
}

const steps = ['Personal ', 'Profil', 'Confidential ']

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <InformationsForm />
        case 1:
            return <ProfilForm />
        case 2:
            return <Confidential />
        default:
            throw new Error('Unknown step')
    }
}

const theme = createTheme()

export default function Checkout() {
    const [activeStep, setActiveStep] = React.useState(0)

    const handleNext = () => {
        setActiveStep(activeStep + 1)
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1)
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            ></AppBar>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper
                    variant="outlined"
                    sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <img
                            src="./pictures/Logo.svg"
                            alt="logo"
                            width="200"
                            height="200"
                        />
                    </Box>
                    <Typography
                        component="h1"
                        variant="h4"
                        align="center"
                        gutterBottom
                    >
                        Welcome, Thomas Ode
                    </Typography>
                    <Typography component="h1" variant="body1" align="center">
                        Personalize your account, in less than 5 minutes, to
                        guarantee security and take advantage of the Paprika
                        services in the best way.
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <React.Fragment>
                        {getStepContent(activeStep)}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            {activeStep !== 0 && (
                                <Button
                                    onClick={handleBack}
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    Back
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                sx={{ mt: 3, ml: 1 }}
                            >
                                {activeStep === steps.length - 1
                                    ? 'Submit'
                                    : 'Next'}
                            </Button>
                        </Box>
                    </React.Fragment>
                </Paper>
                <Copyright />
            </Container>
        </ThemeProvider>
    )
}
