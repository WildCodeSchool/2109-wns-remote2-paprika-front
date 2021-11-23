import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <div className="navigation">
            <NavLink exact to="/" activeClassName="nav-active">
                <img src="./pictures/paprika2.png" alt="logo"/>Accueil
            </NavLink>
            <NavLink exact to="/calendar" activeClassName="nav-active">
                <img src="./pictures/paprika2.png" alt="logo"/>Calendar
            </NavLink>
            <NavLink exact to="/listproject" activeClassName="nav-active">
                <img src="./pictures/paprika2.png" alt="logo"/>All projects
            </NavLink>
            <NavLink exact to="/settings" activeClassName="nav-active">
                <img src="./pictures/paprika2.png" alt="logo"/>Settings
            </NavLink>
            <NavLink exact to="tasksproject" activeClassName="nav-active">
                <img src="./pictures/paprika2.png" alt="logo"/>All tasks 
            </NavLink>
            <NavLink exact to="/notifications" activeClassName="nav-active">
                <img src="./pictures/paprika2.png" alt="logo"/>Notifications
            </NavLink>
            <NavLink exact to="/documentation" activeClassName="nav-active">
                <img src="./pictures/paprika2.png" alt="logo"/>Documentation
            </NavLink>
        </div>
    )
}

export default Navigation;