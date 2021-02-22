import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import NuevoPago from "../../components/pagos/NuevoPago";
import Router, { useRouter } from "next/router";
import { confirmAlert } from "react-confirm-alert"; // Import
import axios from "axios";
import moment from "moment";
import toastr from "toastr";

const nuevo = () => {
  const importeRef = React.createRef();

  const [servicio, guardarServicio] = useState(null);
  const [cliente, guardarCliente] = useState(null);
  const [deuda, guardarDeuda] = useState(null);
  const [error, guardarError] = useState(null);

  let fecha = moment().format("DD/MM/YYYY");

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

  const registrarPagos = async (pago) => {
    console.log(pago);

    await axios
      .get(`http://192.168.1.102:5010/api/pagos/nuevo`, pago)
      .then((res) => {
        guardarCliente(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const calcDeuda = () => {
    let pago = document.getElementById("importe").value;
    let deuda = servicio.importe - pago;
    guardarDeuda(deuda);
  };

  let nuevoPago = (e) => {
    e.preventDefault();

    let pago = {
      idservicio: servicio.idservicio,
      idcliente: servicio.idcliente,
      importe: importeRef.current.value,
      deuda: deuda,
      fecha: moment().format("YYYY-MM-DD"),
      estado: 3,
    };

    if (servicio.importe < pago.importe) {
      guardarError("Los que se pago es mayor a valor del servicio");
    } else if (servicio.importe > pago.importe) {
      guardarError(`El cliente aun debe pagar ${deuda}`);

      confirmAlert({
        title: "ATENCION!!",
        message: `Aun resta pagar ${deuda}. ¿Continuar con el pago y generar factura?`,
        buttons: [
          {
            label: "Si",
            onClick: () => {
              pago.estado = 2;
              console.log(pago);
              //registrarPagos(pago);
            },
          },
          {
            label: "No",
            onClick: () => {},
          },
        ],
      });
    } else if (deuda === 0) {
      toastr.success("El Servicio se pago completamente", "ATENCION");

      pago.estado = 1;
      console.log(pago);
      //registrarPagos(pago);

      confirmAlert({
        title: "ATENCION!!",
        message: "Generar Factura?",
        buttons: [
          {
            label: "Si",
            onClick: () => {},
          },
          {
            label: "No",
            onClick: () => {},
          },
        ],
      });
    }
  };

  return (
    <Layout>
      <NuevoPago
        servicio={servicio}
        cliente={cliente}
        fecha={fecha}
        deuda={deuda}
        error={error}
        calcDeuda={calcDeuda}
        nuevoPago={nuevoPago}
        importeRef={importeRef}
      />
    </Layout>
  );
};

export default nuevo;
