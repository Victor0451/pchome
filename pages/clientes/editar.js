import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import Router, { useRouter } from "next/router";
import toastr from "toastr";
import axios from "axios";
import EditarCliente from "../../components/clientes/EditarCliente";
import { confirmAlert } from "react-confirm-alert"; // Import
import { ip } from '../../config/config'

const editar = () => {
    const [errores, guardarErrores] = useState(null);
    const [cliente, guardarCliente] = useState(null);

    let nombreRef = React.createRef();
    let apellidoRef = React.createRef();
    let aliasRef = React.createRef();
    let dniRef = React.createRef();
    let telefonoRef = React.createRef();
    let domicilioRef = React.createRef();

    const router = useRouter();

    useEffect(() => {
        let id = router.query.id;

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

    const editarCliente = (e) => {
        e.preventDefault();

        guardarErrores(null);

        const client = {
            apellido: apellidoRef.current.value,
            nombre: nombreRef.current.value,
            alias: aliasRef.current.value,
            dni: dniRef.current.value,
            telefono: telefonoRef.current.value,
            domicilio: domicilioRef.current.value,
        };

        if (client.apellido === "") {
            guardarErrores("El apellido es obligatorio");
        } else if (client.nombre === "") {
            guardarErrores("El nombre es obligatorio");
        } else {

            confirmAlert({
                title: "ATENCION!!",
                message: "¿Estas seguro de editar al cliente?",
                buttons: [
                    {
                        label: "Si",
                        onClick: async () => {
                            await axios
                                .put(`${ip}api/clientes/editar/${cliente.idcliente}`, client)
                                .then((res) => {
                                    if (res.status === 200) {
                                        toastr.success("El cliente se edito con exito", "ATENCION");

                                        setTimeout(() => {
                                            Router.push({
                                                pathname: `/clientes/listado`
                                            });
                                        }, 300);

                                    }
                                })
                                .catch((error) => {
                                    console.log(error);
                                    toastr.error(
                                        "Ocurrio un error, contacte al administrador",
                                        "ATENCION"
                                    );
                                });


                        },
                    },
                    {
                        label: "No",
                        onClick: () => { },
                    },
                ],
            });


        }
    };

    return (
        <Layout>
            <EditarCliente
                cliente={cliente}
                nombreRef={nombreRef}
                apellidoRef={apellidoRef}
                dniRef={dniRef}
                telefonoRef={telefonoRef}
                domicilioRef={domicilioRef}
                aliasRef={aliasRef}
                errores={errores}
                editarCliente={editarCliente}
            />
        </Layout>
    );
};

export default editar;
