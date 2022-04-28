import React from 'react';
import styled from 'styled-components';
import { Box, Stack, Typography, Paper } from '@mui/material';
import Page from '../components/Page';
import LoginForm from '../components/LoginForm';

const LeftSide = styled.div`
  width: 40%;
  padding: 10px;
`;

const LoginImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 15px;
`;

const RightSide = styled(Box)`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Login = () => {
  return (
    <Page sx={{ display: 'flex', height: '100vh' }} title="Se connecter">
      <LeftSide>
        <Paper elevation={3} sx={{ borderRadius: '15px', height: '100%' }}>
          <LoginImg src="/static/login-img.jpeg" alt="login" />
        </Paper>
      </LeftSide>
      <RightSide>
        <Stack sx={{ mb: 5, textAlign: 'left' }}>
          <Typography variant="h4" fontWeight="bold">
            Se connecter à Paprikazerrrr
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Entrez vos informations de connexion ci-dessous
          </Typography>
        </Stack>

        <LoginForm />
      </RightSide>
    </Page>
  );
};

export default Login;
