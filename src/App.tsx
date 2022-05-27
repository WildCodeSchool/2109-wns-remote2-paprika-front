import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Routes, Route } from 'react-router-dom';
import client from './graphql.config';
import { ThemeProvider } from '@emotion/react';
import theme from './theme/theme';

import Layout from './components/Layout';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import Users from './views/Users';

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
