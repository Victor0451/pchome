import React from "react";
import ReactTable from "react-table";
import matchSorter from "match-sorter";
import Link from "next/link";
import Spinner from "../layouts/Spinner";

const HistorialPagos = ({ listado }) => {
    if (!listado) return <Spinner />

    return (
        <div className="container mt-4 p-4 border border-dark alert alert-primary">

            <h2 className=" mb-4">
                <strong>
                    <u>Historial de Pagos</u>:
                </strong>
            </h2>

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
                                    Header: "Servicio",
                                    id: "idservicio",
                                    accessor: (d) => d.idservicio,
                                    filterMethod: (filter, rows) =>
                                        matchSorter(rows, filter.value, { keys: ["idservicio"] }),
                                    filterAll: true,

                                },
                                {
                                    Header: "Importe",
                                    id: "total",
                                    accessor: (d) => d.total,
                                    filterMethod: (filter, rows) =>
                                        matchSorter(rows, filter.value, { keys: ["total"] }),
                                    filterAll: true,

                                },
                                {
                                    Header: "Pago",
                                    id: "importe",
                                    accessor: (d) => d.importe,
                                    filterMethod: (filter, rows) =>
                                        matchSorter(rows, filter.value, { keys: ["importe"] }),
                                    filterAll: true,

                                },
                                {
                                    Header: "Deuda",
                                    id: "deuda",
                                    accessor: (d) => d.deuda,
                                    filterMethod: (filter, rows) =>
                                        matchSorter(rows, filter.value, { keys: ["deuda"] }),
                                    filterAll: true,

                                },
                                {
                                    Header: "Fecha",
                                    id: "fecha",
                                    accessor: (d) => d.fecha,
                                    filterMethod: (filter, rows) =>
                                        matchSorter(rows, filter.value, { keys: ["fecha"] }),
                                    filterAll: true,

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
                                                    pathname: "/pagos/nuevo",
                                                    query: {
                                                        id: `${row.original.idservicio}`,
                                                    },
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
            <div className="mt-4 d-flex justify-content-end">
                <a className="btn btn-danger " href="/clientes/listado" >Listado de Clientes</a>
            </div>
        </div>
    );
};

export default HistorialPagos;
