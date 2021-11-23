import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <div className="navigation">
            <NavLink exact to="/" activeClassName="nav-active">
                <img src="./pictures/paprika2.png" alt="logo"/>Accueil
            </NavLink>
            <NavLink exact to="/notifications" activeClassName="nav-active">
                <img src="./pictures/hpsound.png" alt="logo"/>Notifications
            </NavLink>
            <NavLink exact to="/listproject" activeClassName="nav-active">
                <img src="./pictures/salade.png" alt="logo"/>Tout les projets
            </NavLink>
            <NavLink exact to="tasksproject" activeClassName="nav-active">
                <img src="./pictures/oignon.png" alt="logo"/>Tâches projets
            </NavLink>
            <NavLink exact to="/calendar" activeClassName="nav-active">
                <img src="./pictures/tomate.png" alt="logo"/>Calendrier
            </NavLink>
            <NavLink exact to="/documentation" activeClassName="nav-active">
                <img src="./pictures/piment.png" alt="logo"/>Documentation
            </NavLink>
            <NavLink exact to="/settings" activeClassName="nav-active">
                <img src="./pictures/gingembre.png" alt="logo"/>Options
            </NavLink>
        </div>
    )
}

export default Navigation;