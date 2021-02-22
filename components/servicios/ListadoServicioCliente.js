import React from "react";
import ReactTable from "react-table";
import matchSorter from "match-sorter";
import Link from "next/link";
import Spinner from "../layouts/Spinner";

const ListadoServicioCliente = ({ listado, cliente }) => {
  return (
    <div className="container mt-4 p-4 border border-dark alert alert-primary">
      {!cliente ? (
        <Spinner />
      ) : (
        <h2 className=" mb-4">
          <strong>
            <u>Listado de Servicios, Cliente</u>: {cliente.apellido},{" "}
            {cliente.nombre}
          </strong>
        </h2>
      )}

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
                    Header: "Detalle",
                    id: "detalle",
                    accessor: (d) => d.detalle,
                    filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["detalle"] }),
                    filterAll: true,
                  },
                  {
                    Header: "Importe",
                    id: "importe",
                    accessor: (d) => d.importe,
                    filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["importe"] }),
                    filterAll: true,
                  },
                  {
                    Header: "Pagado",

                    Cell: (row) => (
                      <div>
                        {row.original.estado === 1 ? (
                          <div>Pagado</div>
                        ) : row.original.estado === 2 ? (
                          <div>Pagado Con Saldo Restante</div>
                        ) : row.original.estado === 3 ? (
                          <div>Pagado Sin Pagar</div>
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
                                id: row.original.idcliente,
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
      )}
    </div>
  );
};

export default ListadoServicioCliente;
