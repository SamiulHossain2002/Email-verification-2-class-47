import React from "react";
import "./Main.css";
import { Link, Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <nav>
        <Link to="/register"> Register</Link>
        <Link to="/login"> Login</Link>
      </nav>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
