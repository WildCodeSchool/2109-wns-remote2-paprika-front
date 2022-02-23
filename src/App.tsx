import React, { useState, useEffect } from 'react';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql,
    HttpLink,
    from
  } from "@apollo/client";
import { onError } from '@apollo/client/link/error';

import Calendar from './pages/Calendar';
import Documentation from './pages/Documentation';
import Home from './pages/Home';
import ListProject from './pages/ListProject';
import NotFound from './pages/NotFound';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import TasksProject from './pages/TasksProject';
import Login from './pages/Login';
import Register from './pages/Register';
import FirstConnection from './pages/FirstConnection';
import Default from './pages/Default';

import '@mui/material';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import '@mui/material';
import GetUsers from './components/request/GetUsers';

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.map(({ message, locations , path }) => {
            alert(`GraphQl error ${message}`);
        })
    }
});
const link = from([
    errorLink,
    new HttpLink({ uri: "http://localhost:4000/" }),
]);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link
  });

  

function App() {
    const [isLogged , setIsLogged] = React.useState("");
    return (
        <ApolloProvider client={client}>
            <GetUsers />
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/home" exact component={Home} />
                    <Route path="/calendar" exact component={Calendar} />
                    <Route path="/listproject" exact component={ListProject} />
                    <Route path="/settings" exact component={Settings} />
                    <Route path="/tasksproject" exact component={TasksProject} />
                    <Route path="/notifications" exact component={Notifications} />
                    <Route path="/documentation" exact component={Documentation} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/firstConnection" exact component={FirstConnection} />
                    <Route component={NotFound} />
                </Switch>
                </BrowserRouter>
            </ApolloProvider>
    )
}

export default App
