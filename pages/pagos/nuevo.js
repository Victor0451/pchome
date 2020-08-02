import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import NuevoPago from '../../components/pagos/NuevoPago'
import Router, { useRouter } from "next/router";
import { confirmAlert } from "react-confirm-alert"; // Import
import axios from "axios";
import moment from "moment";
import toastr from "toastr";

import useValidacion from "../../hooks/useValidacion";
import validarPago from "../../validacion/validarPago";

const STATE_INICIAL = {
    importe: "",
};

const nuevo = () => {

    const [servicio, guardarServicio] = useState(null)
    const [cliente, guardarCliente] = useState(null);
    const [deuda, guardarDeuda] = useState(null);
    const [error, guardarError] = useState(null)


    let fecha = moment().format('DD/MM/YYYY')

    let router = useRouter()

    useEffect(() => {
        let id = router.query.id;
        console.log(id);

        traerServicio(id);
    }, []);

    const traerServicio = async (id) => {
        await axios
            .get(`http://192.168.1.102:5010/api/servicios/servicio/${id}`)
            .then((res) => {
                guardarServicio(res.data);
                console.log(res.data);

                axios
                    .get(`http://192.168.1.102:5010/api/clientes/cliente/${res.data.idcliente}`)
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


    }

    const registrarPagos = async (pago) => {

        console.log(pago)

        await axios
            .get(`http://192.168.1.102:5010/api/pagos/nuevo`, pago)
            .then((res) => {
                guardarCliente(res.data);
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const {
        valores,
        errores,
        handleChange,
        handleSubmit,
        handleBlur,
    } = useValidacion(STATE_INICIAL, validarPago, nuevoPago);

    const { importe } = valores;

    async function nuevoPago() {

        let deuda = servicio.importe - importe

        let pago = {
            idservicio: servicio.idservicio,
            idcliente: servicio.idcliente,
            importe: importe,
            deuda: deuda,
            fecha: moment().format('YYYY-MM-DD')
        }

        if (servicio.importe < importe) {
            guardarError("Los que se pago es mayor a valor del servicio")
        } else if (servicio.importe > importe) {
            guardarError(`El cliente aun debe pagar ${deuda}`)

            confirmAlert({
                title: "ATENCION!!",
                message: `Aun resta pagar ${deuda}. ¿va a continuar con el pago?`,
                buttons: [
                    {
                        label: "Si",
                        onClick: () => {
                            registrarPagos(pago)
                        },
                    },
                    {
                        label: "No",
                        onClick: () => {

                        },
                    },
                ],
            });

        } else if (deuda === 0) {
            toastr.success("El Servicio se pago completamente", "ATENCION")

            registrarPagos(pago)

            confirmAlert({
                title: "ATENCION!!",
                message: "Generar Factura?",
                buttons: [
                    {
                        label: "Si",
                        onClick: () => {

                        },
                    },
                    {
                        label: "No",
                        onClick: () => {

                        },
                    },
                ],
            });
        }


        guardarDeuda(servicio.importe - importe)




    }

    return (
        <Layout>
            <NuevoPago
                servicio={servicio}
                cliente={cliente}
                fecha={fecha}
                errores={errores}
                deuda={deuda}
                error={error}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleSubmit={handleSubmit}
            />
        </Layout>
    )
}

export default nuevo
