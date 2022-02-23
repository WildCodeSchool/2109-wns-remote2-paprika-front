import * as React from 'react'
import { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useLoginMutation } from '../generated/graphql'

import Modal from '../components/modaux/ForgetPassword'
import imgLogo from "../assets/pictures/Logo.svg";
import Calendar from './Calendar';


function Copyright(props: any) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {'Copyright © '}
            Paprika Website created with Love !
        </Typography>
    )
}

const theme = createTheme()

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [incorrectStyle, setIncorrectStyle] = useState(false);
    const history = useHistory();

  
    function validateForm() {
      return email.length > 0 && password.length > 0;
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
    }

    const [mutationLogin, { data: user }] = useLoginMutation();
    async function login() {
      await mutationLogin({ variables: {userLoginInput: {email, password}}})
      if ( user?.login.token ) {
        history.push("/calendar");

    } else {
        setIncorrectStyle(true);
      }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        paddingTop: 8,
                    }}
                >
                    <img
                        src={imgLogo}
                        alt="logo"
                        width="300"
                        height="300"
                    />
                    <Typography variant="h4" component="div" gutterBottom>
                        Sign In
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            disabled={!validateForm()}
                            onClick={login}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Modal />
                            </Grid>
                            <Grid item>
                                <Link to="/register">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    )
}