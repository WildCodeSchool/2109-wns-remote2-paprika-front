import React from "react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="notfound">
            <h1>Oups :&apos;)</h1>
            <h2>Erreur 404 not found</h2>

            <p>
                Something was broken, please sure you&apos;r enter a good url.
            </p>
            <p>For back in home
                <div className="container-back">
                    <NavLink to="/">
                        Back
                    </NavLink>
                </div>
            </p>
        </div>
    )
}

export default NotFound;