import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { green } from '@mui/material/colors'
import Fab from '@mui/material/Fab'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import CheckIcon from '@mui/icons-material/Check'
import SaveIcon from '@mui/icons-material/Save'

export default function Confidential() {
    const [loading, setLoading] = React.useState(false)
    const [success, setSuccess] = React.useState(false)
    const timer = React.useRef<number>()

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    }

    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current)
        }
    }, [])

    const handleButtonClick = () => {
        if (!loading) {
            setSuccess(false)
            setLoading(true)
            timer.current = window.setTimeout(() => {
                setSuccess(true)
                setLoading(false)
            }, 2000)
        }
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Confidential
            </Typography>
            <Grid item xs={12}>
                <p
                    style={{
                        border: 'solid',
                        padding: '5px',
                        textAlign: 'justify',
                    }}
                >
                    En acceptant les termes, je donne l’autorisation aux
                    personnes administrateurs de Paprika d’accéder à mes
                    informations. Je reconnais avoir lu et compris l’information
                    présentée dans ce formulaire et avoir obtenu, le cas
                    échéant, les explications nécessaires à sa compréhension.
                </p>
            </Grid>
            <Grid container justifyContent="center" padding="10px">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ m: 1, position: 'relative' }}>
                        <Fab
                            aria-label="save"
                            color="primary"
                            sx={buttonSx}
                            onClick={handleButtonClick}
                        >
                            {success ? <CheckIcon /> : <SaveIcon />}
                        </Fab>
                        {loading && (
                            <CircularProgress
                                size={68}
                                sx={{
                                    color: green[500],
                                    position: 'absolute',
                                    top: -6,
                                    left: -6,
                                    zIndex: 1,
                                }}
                            />
                        )}
                    </Box>
                    <Box sx={{ m: 1, position: 'relative' }}>
                        <Button
                            variant="contained"
                            sx={buttonSx}
                            disabled={loading}
                            onClick={handleButtonClick}
                        >
                            Accept terms
                        </Button>
                        {loading && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    color: green[500],
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                }}
                            />
                        )}
                    </Box>
                </Box>
            </Grid>
        </React.Fragment>
    )
}
