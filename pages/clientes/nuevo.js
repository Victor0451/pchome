import React, { useState } from "react";
import Layout from "../../components/layouts/Layout";
import NuevoCliente from "../../components/clientes/NuevoCliente";
import toastr from "toastr";
import axios from "axios";

import useValidacion from "../../hooks/useValidacion";
import validarNuevoCliente from "../../validacion/validarNuevoCliente";

const STATE_INICIAL = {
  nombre: "",
  apellido: "",
  dni: "",
  domicilio: "",
  telefono: "",
};

const nuevo = () => {
  const {
    valores,
    errores,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useValidacion(STATE_INICIAL, validarNuevoCliente, nuevoCliente);

  const { nombre, apellido, dni, domicilio, telefono } = valores;

  async function nuevoCliente() {
    const cliente = {
      nombre: nombre,
      apellido: apellido,
      dni: dni,
      domicilio: domicilio,
      telefono: telefono,
    };

    await axios
      .post("http://192.168.1.104:5010/api/clientes/nuevo", cliente)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toastr.success("Cliente Registrado!", "ATENCION");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Layout>
      <NuevoCliente
        nombre={nombre}
        apellido={apellido}
        dni={dni}
        telefono={telefono}
        domicilio={domicilio}
        errores={errores}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleBlur={handleBlur}
      />
    </Layout>
  );
};

export default nuevo;
