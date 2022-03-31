import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <h1>Welcome to the app!</h1>
      <nav>
        <Link to="login">Login</Link>
        <Link to="home">Home</Link>
        <Link to="users">Users</Link>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
