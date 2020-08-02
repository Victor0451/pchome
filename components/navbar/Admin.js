import React from "react";

const Admin = () => {
  return (
    <ul className="navbar-nav">
      <li className="nav-item dropdown ">
        <a
          href="#"
          role="button"
          data-toggle="dropdown"
          className="nav-link dropdown-toggle"
        >
          Clientes
        </a>
        <ul className="dropdown-menu">
          <li>
            <a href="/clientes/nuevo" className="dropdown-item text-dark">
              Nuevo
            </a>
          </li>
          <hr />
          <li>
            <a href="/clientes/listado" className="dropdown-item text-dark">
              Listado
            </a>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default Admin;
