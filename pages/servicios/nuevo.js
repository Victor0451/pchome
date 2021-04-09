import React, { useState, useEffect } from "react";
import NuevoServicio from "../../components/servicios/NuevoServicio";
import Layout from "../../components/layouts/Layout";
import Router, { useRouter } from "next/router";
import { confirmAlert } from "react-confirm-alert"; // Import
import axios from "axios";
import moment from "moment";
import toastr from "toastr";
import { ip } from '../../config/config'

import useValidacion from "../../hooks/useValidacion";
import validarServicio from "../../validacion/validarServicio";

const STATE_INICIAL = {
  detalle: "",
  servicio: "",
  empresa: "",
};

const nuevo = () => {
  const [cliente, guardarCliente] = useState(null);

  let fecha = moment().format("DD/MM/YYYY");

  const router = useRouter();

  const traerCliente = async (id) => {
    await axios
      .get(`${ip}api/clientes/cliente/${id}`)
      .then((res) => {
        guardarCliente(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    let id = router.query.id;
    console.log(id);

    traerCliente(id);
  }, []);

  const {
    valores,
    errores,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useValidacion(STATE_INICIAL, validarServicio, nuevoServicio);

  const { detalle, importe, empresa } = valores;

  async function nuevoServicio() {
    const servicio = {
      idcliente: cliente.idcliente,
      detalle: detalle,
      importe: importe,
      fecha: moment().format("YYYY-MM-DD"),
      empresa: empresa,
      estado: 3,
      deuda: importe,
      pago: 0
    };


    await axios
      .post(`{ip}api/servicios/nuevo`, servicio)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toastr.success("Servicio Registrado!", "ATENCION");
          let idserv = res.data.idservicio;
          console.log(idserv, "id");
          confirmAlert({
            title: "ATENCION!!",
            message: "¿Va a pagar el servicio?",
            buttons: [
              {
                label: "Si",
                onClick: () => {
                  Router.push({
                    pathname: `/pagos/nuevo`,
                    query: { id: idserv },
                  });
                },
              },
              {
                label: "No",
                onClick: () => {
                  Router.push({
                    pathname: `/servicios/servicioscliente/`,
                    query: { id: cliente.idcliente },
                  });
                },
              },
            ],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Layout>
      <NuevoServicio
        cliente={cliente}
        fecha={fecha}
        errores={errores}
        detalle={detalle}
        importe={importe}
        empresa={empresa}
        handleBlur={handleBlur}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Layout>
  );
};

export default nuevo;
