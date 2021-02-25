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
  alias: "",
};

const nuevo = () => {
  const telefonoRef = React.createRef()
  const dniRef = React.createRef()

  const {
    valores,
    errores,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useValidacion(STATE_INICIAL, validarNuevoCliente, nuevoCliente);

  const { nombre, apellido, domicilio, alias } = valores;

  async function nuevoCliente() {
    const cliente = {
      nombre: nombre,
      apellido: apellido,
      dni: dniRef.current.value,
      domicilio: domicilio,
      telefono: telefonoRef.current.value,
      alias: alias,
    };

    await axios
      .post("http://190.231.32.232:5010/api/clientes/nuevo", cliente)
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
        dni={dniRef}
        telefono={telefonoRef}
        domicilio={domicilio}
        alias={alias}
        errores={errores}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleBlur={handleBlur}
      />
    </Layout>
  );
};

export default nuevo;
