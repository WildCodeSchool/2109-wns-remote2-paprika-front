import React from "react";

import Box from '@mui/material/Box';

import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <div className="navigation">
            <Box className="username-account" display="flex" flexDirection="row" justifyContent="space-evenly">
                <Box>
                    <p style={{ display: "block"}}>welcome <br /> Name</p>
                </Box>
                <Box>
                    <img className="logo-nav arrow" src="./pictures/arrowL.png" alt="logo"/>
                </Box>
            </Box>
            <NavLink exact to="/home" activeClassName="nav-active">
                <img className="logo-nav" src="./pictures/paprika2.png" alt="logo"/>Accueil
            </NavLink>
            <NavLink exact to="/notifications" activeClassName="nav-active">
                <img className="logo-nav" src="./pictures/hpsound.png" alt="logo"/>Notifications
            </NavLink>
            <NavLink exact to="/listproject" activeClassName="nav-active">
                <img className="logo-nav" src="./pictures/salade.png" alt="logo"/>Tout les projets
            </NavLink>
            <NavLink exact to="tasksproject" activeClassName="nav-active">
                <img className="logo-nav" src="./pictures/oignon.png" alt="logo"/>Tâches projets
            </NavLink>
            <NavLink exact to="/calendar" activeClassName="nav-active">
                <img className="logo-nav" src="./pictures/tomate.png" alt="logo"/>Calendrier
            </NavLink>
            <NavLink exact to="/documentation" activeClassName="nav-active">
                <img className="logo-nav" src="./pictures/piment.png" alt="logo"/>Documentation
            </NavLink>
            <NavLink exact to="/settings" activeClassName="nav-active">
                <img className="logo-nav" src="./pictures/gingembre.png" alt="logo"/>Options
            </NavLink>
            <NavLink exact to="/register" activeClassName="nav-active">
                <img src="./pictures/gingembre.png" alt="logo" />
                Register
            </NavLink>
            <NavLink exact to="/firstConnection" activeClassName="nav-active">
                <img src="./pictures/gingembre.png" alt="logo" />
                First Connection
            </NavLink>
        </div>
    )
}

export default Navigation
