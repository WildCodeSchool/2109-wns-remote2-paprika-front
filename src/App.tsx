import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Routes, Route } from 'react-router-dom';
import client from './graphql.config';

import Login from './views/Login';
import Home from './views/Home';
import Layout from './views/Layout';

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </ApolloProvider>
  );
}

export default App;
