import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import Router, { useRouter } from "next/router";
import { confirmAlert } from "react-confirm-alert"; // Import
import axios from "axios";
import moment from "moment";
import toastr from "toastr";
import HistorialPagos from "../../components/pagos/HistorialPagos";
import Spinner from "../../components/layouts/Spinner";
import { ip } from '../../config/config'

const historial = () => {

    const [historial, guardarHistorial] = useState(null)
    const [cliente, guardarCliente] = useState(null)
    const [servicio, guardarServicio] = useState(null)

    const router = useRouter()

    useEffect(() => {
        let id = router.query.id;

        traerServicio(id);
        traerPagos(id)
    }, []);

    const traerServicio = async (id) => {
        await axios
            .get(`${ip}api/servicios/servicio/${id}`)
            .then((res) => {
                guardarServicio(res.data);

                axios
                    .get(
                        `${ip}api/clientes/cliente/${res.data.idcliente}`
                    )
                    .then((res2) => {
                        guardarCliente(res2.data);
                        console.log(res2.data);
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
            .get(`${ip}api/pagos/historial/${id}`)
            .then((res) => {
                guardarHistorial(res.data);

            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Layout>
            {servicio ? (
                <>
                    {cliente ? (
                        <div className="mt-4 container border border-dark alert alert-primary">
                            <h2><strong><u>Historial de pagos cliente</u>: {cliente.apellido}, {cliente.nombre}</strong></h2>
                            <h4><strong><u>Servicio</u>: {servicio.detalle}</strong></h4>

                        </div>
                    ) : <Spinner />}


                    <HistorialPagos listado={historial} />
                </>

            ) : <Spinner />}

        </Layout>
    )
}

export default historial
