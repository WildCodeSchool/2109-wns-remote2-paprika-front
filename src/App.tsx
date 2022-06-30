import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@emotion/react';
import { Route, Routes } from 'react-router-dom';
import React from "react";

import client from './graphql.config';
import theme from './theme/theme';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import Projects from './views/Projects';
import Users from './views/Users';

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/users" element={<Users />} />
          <Route path="dashboard/projects" element={<Projects />} />
        </Routes>
        <Login />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
