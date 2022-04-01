import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Routes, Route } from 'react-router-dom';
import client from './graphql.config';
import { ThemeProvider } from '@emotion/react';
import theme from './theme/theme';

import Login from './views/Login';
import Home from './views/Home';
import Users from './views/Users';

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/">
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/users" element={<Users />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
