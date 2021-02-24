import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import NuevoPago from "../../components/pagos/NuevoPago";
import Router, { useRouter } from "next/router";
import { confirmAlert } from "react-confirm-alert"; // Import
import axios from "axios";
import moment from "moment";
import toastr from "toastr";
import ImprimirFactura from "../../components/factura/ImprimirFactura";
import DetalleFactura from "../../components/factura/DetalleFactura";


const imprimir = () => {
  const [servicio, guardarServicio] = useState(null);
  const [cliente, guardarCliente] = useState(null);
  const [historial, guardarHistorial] = useState(null)

  let router = useRouter();

  useEffect(() => {
    let id = router.query.id;

    traerServicio(id);

    traerPagos(id)
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

  const traerPagos = async (id) => {
    await axios
      .get(`http://190.231.32.232:5010/api/pagos/historial/${id}`)
      .then((res) => {
        guardarHistorial(res.data);

      })
      .catch((error) => {
        console.log(error);
      });
  }

  const imprimir = () => {
    let contenido = document.getElementById("print").innerHTML;
    let contenidoOrg = document.body.innerHTML;

    document.body.innerHTML = contenido;

    window.print();

    document.body.innerHTML = contenidoOrg;
  };

  return (
    <Layout>
      <div className="mt-4 mb-4 container alert alert-primary border border-dark p-4 list" id="print">
        <h2>
          <strong>
            <u>PC-HOME: Servicio Tecnico</u>
          </strong>
        </h2>
        <ImprimirFactura servicio={servicio} cliente={cliente} historial={historial} />
        <DetalleFactura historial={historial} />
      </div>
      <div className="mt-4 container border border-dark alert alert-primary">
        <h2>
          <strong>
            <u>Opciones</u>
          </strong>
        </h2>
        <div className="mt-4 d-flex justify-content-center">
          <button className="btn btn-primary " onClick={imprimir}>Imprimir</button>
          <a className="btn btn-danger ml-1 " href="/clientes/listado" >Listado de Clientes</a>

        </div>

      </div>

    </Layout>
  );
};

export default imprimir;
