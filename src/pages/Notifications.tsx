import React from "react";

import CssBaseline from '@mui/material/CssBaseline';
import Box, { BoxProps } from '@mui/material/Box';
import Container from '@mui/material/Container';

import Navigation from "../components/Navigation";
import ContainerComment from "../components/notifications/ContainerComment";



const Notifications = () => {
    return (
        <div className="notifications">
            <Navigation />
            <h1>Notifications page</h1>
            <ContainerComment />
        </div>
    )
}

export default Notifications;