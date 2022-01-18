import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Avatar from '@mui/material/Avatar'

const Input = styled('input')({
    display: 'none',
})

export default function ProfilForm() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Profil Picture
            </Typography>
            <Grid container justifyContent="center">
                <Grid style={{ padding: 20 }}>
                    <Avatar
                        style={{ width: 200, height: 200 }}
                        src="/broken-image.jpg"
                    />
                </Grid>
                <Grid container justifyContent="center">
                    <label htmlFor="contained-button-file">
                        <Input
                            accept="image/*"
                            id="contained-button-file"
                            multiple
                            type="file"
                        />
                        <Button variant="contained" component="span">
                            Upload
                        </Button>
                    </label>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
