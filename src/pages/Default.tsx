import React from "react";


const Default = () => {
    return (
        <div className="default wrapper">
            <nav className="navigation-default-page">
                <ul className="list-navigation-default">
                    <li className="myButton"><a href="/">Home</a></li>
                    <li className="myButton"><a href="/firstConnection">Sign Up</a></li>
                    <li className="myButton"><a href="/login">Sign In</a></li>
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
                <img className="img-default" src="./pictures/defaultPictures.jpg" alt="default pictures"></img>
            </div>
        </div>
    )
}

export default Default