import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import NuevoPago from "../../components/pagos/NuevoPago";
import Router, { useRouter } from "next/router";
import { confirmAlert } from "react-confirm-alert"; // Import
import axios from "axios";
import moment from "moment";
import toastr from "toastr";
import { ip } from '../../config/config'

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
            .get(`${ip}api/servicios/servicio/${id}`)
            .then((res) => {
                guardarServicio(res.data);
                console.log(res.data);

                axios
                    .get(
                        `${ip}api/clientes/cliente/${res.data.idcliente}`
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
            .post(`${ip}api/pagos/nuevo`, pago)
            .then((res) => {
                if (res.status === 200) {
                    toastr.success("El pago se registro correctamente", "ATENCION")


                    if (servicio.pago === 0) {
                        const param = {
                            estado: estado,
                            deuda: pago.deuda,
                            pago: pago.importe
                        }
                        axios
                            .put(`${ip}api/servicios/putestado/${servicio.idservicio}`, param)
                            .then(res => { console.log(res.status) })
                            .catch(error => {
                                console.log(error)
                            })
                    } else if (servicio.pago > 0) {
                        const param = {
                            estado: estado,
                            deuda: pago.deuda,
                            pago: parseInt(pago.importe) + parseInt(servicio.pago)
                        }
                        axios
                            .put(`${ip}api/servicios/putestado/${servicio.idservicio}`, param)
                            .then(res => { console.log(res.status) })
                            .catch(error => {
                                console.log(error)
                            })
                    }

                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const calcDeuda = () => {
        if (servicio.estado === 3) {
            let pago = document.getElementById('importe').value
            let deuda = servicio.importe - pago;
            guardarDeuda(deuda);
        } else if (servicio.estado === 2) {
            let pago = document.getElementById('importe').value
            let deuda = servicio.deuda - pago;
            guardarDeuda(deuda);
        }


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

                            setTimeout(() => {
                                Router.push({
                                    pathname: `/factura/imprimir`,
                                    query: { id: servicio.idservicio }

                                });
                            }, 200);
                        },
                    },
                    {
                        label: "No",
                        onClick: () => {


                            Router.push({
                                pathname: `/clientes/listado`
                            });


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
                        onClick: () => {

                            Router.push({
                                pathname: `/factura/imprimir`,
                                query: { id: servicio.idservicio }

                            });
                        },
                    },
                    {
                        label: "No",
                        onClick: () => {


                            Router.push({
                                pathname: `/servicios/servicioscliente`,
                                query: { id: cliente.idcliente }

                            });


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
