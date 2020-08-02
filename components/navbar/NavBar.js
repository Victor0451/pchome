import React from "react";
import Admin from "./Admin";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a href={"/"} className="navbar-brand">
       | PC Home - Servicio Tecnico |
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor02"
        aria-controls="navbarColor02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <Admin />
    </nav>
  );
};

export default NavBar;
