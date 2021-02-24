import React from "react";
import ReactTable from "react-table";
import matchSorter from "match-sorter";
import Link from "next/link";
import Spinner from "../layouts/Spinner";
import { confirmAlert } from "react-confirm-alert"; // Import
import axios from "axios";

const ListadoClientes = ({ list }) => {
  if (!list) return <Spinner />;

  const deleteClient = async (id) => {
    await axios
      .delete(`http://190.231.32.232:5010/api/clientes/eliminarcliente/${id}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toastr.success("Cliente Eliminado!", "ATENCION");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const eliminarCliente = (id) => {
    confirmAlert({
      title: "ATENCION!!",
      message: "¿Estas seguro de eliminar al cliente?",
      buttons: [
        {
          label: "Si",
          onClick: () => {
            deleteClient(id);

            setTimeout(() => {
              window.location.reload();
            }, 300);
          },
        },
        {
          label: "No",
          onClick: () => { },
        },
      ],
    });
  };

  return (
    <div className="container mt-4 p-4 border border-dark alert alert-primary">
      <h2 className=" mb-4">
        <strong>
          <u>Listado de Clientes</u>
        </strong>
      </h2>

      <div className=" mt-4 border border-dark list">
        <ReactTable
          data={list}
          filterable
          defaultFilterMethod={(filter, row) => row[filter.id] === filter.value}
          columns={[
            {
              Header: "Listado Clientes",
              columns: [
                {
                  Header: "Nombre",
                  id: "nombre",
                  accessor: (d) => d.nombre,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["nombre"] }),
                  filterAll: true,
                  width: 150,
                },
                {
                  Header: "Apellido",
                  id: "apellido",
                  accessor: (d) => d.apellido,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["apellido"] }),
                  filterAll: true,
                  width: 150,
                },
                {
                  Header: "Alias",
                  id: "alias",
                  accessor: (d) => d.alias,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["alias"] }),
                  filterAll: true,
                  width: 150,
                },
                {
                  Header: "DNI",
                  id: "dni",
                  accessor: (d) => d.dni,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["dni"] }),
                  filterAll: true,
                  width: 100,
                },

                {
                  Header: "Domicilio",
                  id: "domicilio",
                  accessor: (d) => d.domicilio,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["domicilio"] }),
                  filterAll: true,
                  width: 200,
                },

                {
                  Header: "Telefono",
                  id: "telefono",
                  accessor: (d) => d.telefono,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["telefono"] }),
                  filterAll: true,
                  width: 130,
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
                      <Link
                        href={{
                          pathname: "/servicios/nuevo",
                          query: {
                            id: row.original.idcliente,
                          },
                        }}
                      >
                        <button
                          className="btn btn-info btn-sm mr-1"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Cargar Servicio"
                        >
                          <i className="fa fa-upload" aria-hidden="true"></i>
                        </button>
                      </Link>{" "}
                      <Link
                        href={{
                          pathname: "/servicios/servicioscliente",
                          query: {
                            id: row.original.idcliente,
                          },
                        }}
                      >
                        <button
                          className="btn btn-success btn-sm mr-1"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Ver Servicios"
                        >
                          <i className="fa fa-eye" aria-hidden="true"></i>
                        </button>
                      </Link>
                      <Link
                        href={{
                          pathname: "/clientes/editar",
                          query: {
                            id: `${row.original.idcliente}`,
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
                        onClick={() => eliminarCliente(row.original.idcliente)}
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

    </div>
  );
};

export default ListadoClientes;
