import React from "react";
import imgHome from "../assets/pictures/defaultPictures.jpg";
import { NavLink } from "react-router-dom";


const Default = () => {
    return (
        <div className="default wrapper">
            <nav className="navigation-default-page">
                <ul className="list-navigation-default">
                    <NavLink to="/" className="myButton btnHome" activeClassName="nav-active">
                        <li>Home</li>
                    </NavLink>
                    <NavLink to="/firstConnection" className="myButton btnHome" activeClassName="nav-active">
                        <li>Sign Up</li>
                    </NavLink>
                    <NavLink to="/login" className="myButton btnHome" activeClassName="nav-active">
                        <li>Sign In</li>
                    </NavLink>
                </ul>
            </nav>
            <h1>Get the paprika software</h1>
            <div className="default-contenaire">
                <div className="default-content">
                    <h2>The ultimate software</h2>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores voluptatum iusto, dignissimos accusamus quam temporibus vero quas aperiam repudiandae odio porro ipsa necessitatibus aliquid facilis odit. Iure culpa quod autem.

                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores voluptatum iusto, dignissimos accusamus quam temporibus vero quas aperiam repudiandae odio porro ipsa necessitatibus aliquid facilis odit. Iure culpa quod autem.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores voluptatum iusto, dignissimos accusamus quam temporibus vero quas aperiam repudiandae odio porro ipsa necessitatibus aliquid facilis odit. Iure culpa quod autem.
                </div>
                <img className="img-default" src={imgHome} alt="default pictures"></img>
            </div>
        </div>
    )
}

export default Default