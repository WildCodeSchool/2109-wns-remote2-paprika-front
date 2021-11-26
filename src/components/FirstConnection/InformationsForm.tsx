import * as React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

export default function InformationsForm() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Personal Informations
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        defaultValue="Thomas"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        defaultValue="Ode"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="job"
                        name="job"
                        label="Job"
                        fullWidth
                        autoComplete="job"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="outlined-multiline-static"
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
