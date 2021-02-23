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
            .get(`http://190.231.32.232:5010/api/servicios/servicio/${id}`)
            .then((res) => {
                guardarServicio(res.data);
                console.log(res.data);

                axios
                    .get(
                        `http://190.231.32.232:5010/api/clientes/cliente/${res.data.idcliente}`
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

    const registrarPagos = async (pago, estado) => {
        await axios
            .post(`http://190.231.32.232:5010/api/pagos/nuevo`, pago)
            .then((res) => {
                if (res.status === 200) {
                    toastr.success("El pago se registro correctamente", "ATENCION")

                    const param = {
                        estado: estado,
                        deuda: pago.deuda
                    }

                    axios
                        .put(`http://190.231.32.232:5010/api/servicios/putestado/${servicio.idservicio}`, param)
                        .then(res => { console.log(res.status) })
                        .catch(error => {
                            console.log(error)
                        })
                }
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
            total: servicio.importe,
            fecha: moment().format("YYYY-MM-DD"),
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
                            registrarPagos(pago, 2);
                        },
                    },
                    {
                        label: "No",
                        onClick: () => {

                            setTimeout(() => {
                                Router.push({
                                    pathname: `/clientes/listado`
                                });
                            }, 300);

                        },
                    },
                ],
            });
        } else if (deuda === 0) {
            toastr.success("El Servicio se pago completamente", "ATENCION");

            registrarPagos(pago, 1);

            confirmAlert({
                title: "ATENCION!!",
                message: "Generar Factura?",
                buttons: [
                    {
                        label: "Si",
                        onClick: () => { },
                    },
                    {
                        label: "No",
                        onClick: () => {

                            setTimeout(() => {
                                Router.push({
                                    pathname: `/servicios/servicioscliente`,
                                    query: { id: cliente.idcliente }

                                });
                            }, 300);

                        },
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
