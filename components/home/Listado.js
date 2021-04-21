import React, { useState } from "react";
import ReactTable from "react-table";
import matchSorter from "match-sorter";
import Link from "next/link";
import Spinner from "../layouts/Spinner";

const ListadoServicioCliente = ({ listado }) => {



    return (
        <div className="container mt-4 p-4 border border-dark alert alert-primary">


            {!listado ? (
                <Spinner />
            ) : (
                    <div className=" mt-4 border border-dark list">
                        <ReactTable
                            data={listado}
                            filterable
                            defaultFilterMethod={(filter, row) =>
                                row[filter.id] === filter.value
                            }
                            columns={[
                                {
                                    Header: "Listado de Servicios",
                                    columns: [

                                        {
                                            Header: "Fecha",
                                            id: "fecha",
                                            accessor: (d) => d.fecha,
                                            filterMethod: (filter, rows) =>
                                                matchSorter(rows, filter.value, { keys: ["fecha"] }),
                                            filterAll: true,
                                            width: 110
                                        },

                                        {
                                            Header: "Empresa",
                                            id: "empresa",
                                            accessor: (d) => d.empresa,
                                            filterMethod: (filter, rows) =>
                                                matchSorter(rows, filter.value, { keys: ["empresa"] }),
                                            filterAll: true,
                                            width: 100
                                        },
                                        {
                                            Header: "Detalle",
                                            id: "detalle",
                                            accessor: (d) => d.detalle,
                                            filterMethod: (filter, rows) =>
                                                matchSorter(rows, filter.value, { keys: ["detalle"] }),
                                            filterAll: true,
                                            width: 300
                                        },
                                        {
                                            Header: "Importe",
                                            id: "importe",
                                            accessor: (d) => d.importe,
                                            filterMethod: (filter, rows) =>
                                                matchSorter(rows, filter.value, { keys: ["importe"] }),
                                            filterAll: true,
                                            width: 90
                                        },
                                        {
                                            Header: "Estado",
                                            width: 100,
                                            Cell: (row) => (
                                                <div>
                                                    {row.original.estado === 1 ? (
                                                        <div>Pagado</div>
                                                    ) : row.original.estado === 2 ? (
                                                        <div>Pagado Con Saldo Restante</div>
                                                    ) : row.original.estado === 3 ? (
                                                        <div>Sin Pagar</div>
                                                    ) : null}
                                                </div>
                                            ),

                                        },
                                        {
                                            Header: "Acciones",
                                            id: "idcliente",
                                            accessor: (d) => d.idcliente,
                                            filterMethod: (filter, rows) =>
                                                matchSorter(rows, filter.value, { keys: ["idcliente"] }),
                                            filterAll: true,

                                            Cell: (row) => (
                                                <div>
                                                    {row.original.estado === 2 ||
                                                        row.original.estado === 3 ? (
                                                            <Link
                                                                href={{
                                                                    pathname: "/pagos/nuevo",
                                                                    query: {
                                                                        id: row.original.idservicio,
                                                                    },
                                                                }}
                                                            >
                                                                <button
                                                                    className="btn btn-success btn-sm mr-1"
                                                                    data-toggle="tooltip"
                                                                    data-placement="top"
                                                                    title="Pagar Servicio"
                                                                >
                                                                    <i
                                                                        className="fa fa-credit-card-alt"
                                                                        aria-hidden="true"
                                                                    ></i>
                                                                </button>
                                                            </Link>
                                                        ) : null}

                                                    <Link
                                                        href={{
                                                            // pathname: "/pagos/nuevo",
                                                            // query: {
                                                            //   id: `${row.original.idservicio}`,
                                                            // },
                                                        }}
                                                    >
                                                        <button
                                                            className="btn btn-warning btn-sm mr-1"
                                                            data-toggle="tooltip"
                                                            data-placement="top"
                                                            title="Editar"
                                                        >
                                                            <i className="fa fa-pencil" aria-hidden="true"></i>
                                                        </button>
                                                    </Link>

                                                    <Link
                                                        href={{
                                                            pathname: "/pagos/historial",
                                                            query: {
                                                                id: `${row.original.idservicio}`,
                                                            },
                                                        }}
                                                    >
                                                        <button
                                                            className="btn btn-primary btn-sm mr-1"
                                                            data-toggle="tooltip"
                                                            data-placement="top"
                                                            title="Historial de Pagos"
                                                        >
                                                            <i className="fa fa-history" aria-hidden="true"></i>
                                                        </button>
                                                    </Link>

                                                    {row.original.estado === 1 || row.original.estado === 2 ? (
                                                        <Link
                                                            href={{
                                                                pathname: "/factura/imprimir",
                                                                query: {
                                                                    id: `${row.original.idservicio}`,
                                                                },
                                                            }}
                                                        >
                                                            <button
                                                                className="btn btn-secondary btn-sm mr-1"
                                                                data-toggle="tooltip"
                                                                data-placement="top"
                                                                title="Imprimir Factura"
                                                            >
                                                                <i className="fa fa-ticket" aria-hidden="true"></i>
                                                            </button>
                                                        </Link>
                                                    ) : null}


                                                    <button
                                                        className="btn btn-danger btn-sm mr-1"
                                                        data-toggle="tooltip"
                                                        data-placement="top"
                                                        title="Eliminar"
                                                    >
                                                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                    </button>
                                                </div>
                                            ),
                                        },
                                    ],
                                },
                            ]}
                            defaultPageSize={10}
                            className="-striped -highlight"
                        />
                    </div>
                )}

            <div className="mt-4 d-flex justify-content-end">
                <a className="btn btn-danger " href="/clientes/listado" >Listado de Clientes</a>
            </div>
        </div>
    );
};

export default ListadoServicioCliente;
