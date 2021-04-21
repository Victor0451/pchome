import React, { useState, useEffect } from "react";
import ListadoServicioCliente from "../../components/servicios/ListadoServicioCliente";
import Layout from "../../components/layouts/Layout";
import Router, { useRouter } from "next/router";
import { confirmAlert } from "react-confirm-alert"; // Import
import axios from "axios";
import moment from "moment";
import toastr from "toastr";
import { ip } from '../../config/config'

const servicioscliente = () => {
  const [servicios, guardarServicios] = useState(null);
  const [cliente, guardarCliente] = useState(null);

  const router = useRouter();

  useEffect(() => {
    let id = router.query.id;

    traerServiciosCliente(id);
    traerCliente(id);
  }, []);

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
  const traerServiciosCliente = async (id) => {
    await axios
      .get(`${ip}api/servicios/servicioscliente/${id}`)
      .then((res) => {
        guardarServicios(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout>
      <ListadoServicioCliente listado={servicios} cliente={cliente} />
    </Layout>
  );
};

export default servicioscliente;
