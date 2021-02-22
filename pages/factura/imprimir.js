import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import NuevoPago from "../../components/pagos/NuevoPago";
import Router, { useRouter } from "next/router";
import { confirmAlert } from "react-confirm-alert"; // Import
import axios from "axios";
import moment from "moment";
import toastr from "toastr";
import ImprimirFactura from "../../components/factura/ImprimirFactura";

const imprimir = () => {
  const [servicio, guardarServicio] = useState(null);
  const [cliente, guardarCliente] = useState(null);

  let router = useRouter();

  useEffect(() => {
    let id = router.query.id;

    traerServicio(id);
  }, []);

  const traerServicio = async (id) => {
    await axios
      .get(`http://192.168.1.102:5010/api/servicios/servicio/${id}`)
      .then((res) => {
        guardarServicio(res.data);
        console.log(res.data);

        axios
          .get(
            `http://192.168.1.102:5010/api/clientes/cliente/${res.data.idcliente}`
          )
          .then((res) => {
            guardarCliente(res.data);
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout>
      <ImprimirFactura servicio={servicio} cliente={cliente} />
    </Layout>
  );
};

export default imprimir;
