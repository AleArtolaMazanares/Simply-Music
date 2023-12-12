import React from "react";
import {  Link, Outlet } from "react-router-dom";
import "../navBarAdmin/style.css"


function NavBarAdmin() {
  return (
    <div className="navbar-admin-container">
      <Link to={"/User"}> view  Users</Link>
      <Link to={"/Artist"}> view  Artist</Link>
        <Outlet />
    </div>
  );
}

export default NavBarAdmin;
