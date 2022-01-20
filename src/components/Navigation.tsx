import React from "react";

import Box from '@mui/material/Box';

import { NavLink } from "react-router-dom";

import arrowL from "../assets/pictures/arrowL.png";
import paprika2 from "../assets/pictures/hpsound.png";
import hpsound from "../assets/pictures/hpsound.png";
import salade from "../assets/pictures/salade.png";
import oignon from "../assets/pictures/oignon.png";
import tomate from "../assets/pictures/tomate.png";
import piment from "../assets/pictures/piment.png";
import gingembre from "../assets/pictures/gingembre.png";
import { TimesOneMobiledataTwoTone } from "@mui/icons-material";



const Navigation = () => {
    return (
        <div className="navigation">
            <Box className="username-account" display="flex" flexDirection="row" justifyContent="space-evenly">
                <Box>
                    <p style={{ display: "block"}}>welcome <br /> Name</p>
                </Box>
                <Box>
                    <img className="logo-nav arrow" src={arrowL} alt="logo"/>
                </Box>
            </Box>
            <NavLink to="/home" activeClassName="nav-active">
                <img className="logo-nav" src={paprika2} alt="logo"/>Accueil
            </NavLink>
            <NavLink to="/notifications" activeClassName="nav-active">
                <img className="logo-nav" src={hpsound} alt="logo"/>Notifications
            </NavLink>
            <NavLink to="/listproject" activeClassName="nav-active">
                <img className="logo-nav" src={salade} alt="logo"/>Tout les projets
            </NavLink>
            <NavLink to="tasksproject" activeClassName="nav-active">
                <img className="logo-nav" src={oignon} alt="logo"/>Tâches projets
            </NavLink>
            <NavLink to="/calendar" activeClassName="nav-active">
                <img className="logo-nav" src={piment} alt="logo"/>Calendrier
            </NavLink>
            <NavLink to="/documentation" activeClassName="nav-active">
                <img className="logo-nav" src={piment} alt="logo"/>Documentation
            </NavLink>
            <NavLink to="/settings" activeClassName="nav-active">
                <img className="logo-nav" src={gingembre} alt="logo"/>Options
            </NavLink>
            <NavLink to="/register" activeClassName="nav-active">
                <img src={gingembre} alt="logo" />
                Register
            </NavLink>
            <NavLink to="/firstConnection" activeClassName="nav-active">
                <img src={gingembre} alt="logo" />
                First Connection
            </NavLink>
        </div>
    )
}

export default Navigation
