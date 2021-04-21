import React from "react";
import Spinner from "../layouts/Spinner";

const EditarCliente = ({
  cliente,
  nombreRef,
  apellidoRef,
  dniRef,
  telefonoRef,
  domicilioRef,
  aliasRef,
  errores,
  editarCliente,
}) => {
  if (!cliente) return <Spinner />;

  return (
    <div className="container alert alert-primary border border-dark mt-4 mb-4 p-4">
      <h2>
        <strong>
          <u>Editar Cliente</u>
        </strong>
      </h2>
      <form className="mt-4 border border-dark p-4">
        <div className="row">
          <div className="form-group col-md-4">
            <label>
              <strong>
                {" "}
                <u> Apellido: </u>
              </strong>
            </label>
            <input
              type="text"
              className="form-control"
              name="apellido"
              defaultValue={cliente.apellido}
              ref={apellidoRef}
            />
          </div>
          <div className="form-group col-md-4">
            <label>
              <strong>
                {" "}
                <u> Nombre: </u>
              </strong>
            </label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              defaultValue={cliente.nombre}
              ref={nombreRef}
            />
          </div>
          <div className="form-group col-md-4">
            <label>
              <strong>
                {" "}
                <u> Alias: </u>
              </strong>
            </label>
            <input
              type="text"
              className="form-control"
              name="alias"
              defaultValue={cliente.alias}
              ref={aliasRef}
            />
          </div>
          <div className="form-group col-md-4">
            <label>
              <strong>
                {" "}
                <u> DNI: </u>
              </strong>
            </label>
            <input
              type="text"
              className="form-control"
              name="dni"
              ref={dniRef}
              defaultValue={cliente.dni}
            />
          </div>
          <div className="form-group col-md-4">
            <label>
              <strong>
                {" "}
                <u> Domicilio: </u>
              </strong>
            </label>
            <input
              type="text"
              className="form-control"
              name="domicilio"
              defaultValue={cliente.domicilio}
              ref={domicilioRef}
            />
          </div>

          <div className="form-group col-md-4">
            <label>
              <strong>
                {" "}
                <u> Telefono: </u>
              </strong>
            </label>
            <input
              type="text"
              className="form-control"
              name="telefono"
              defaultValue={cliente.telefono}
              ref={telefonoRef}
            />
          </div>

          {errores && (
            <div className="mt-2 form-group col-md-12 alert alert-danger text-center text-uppercase">
              {errores}
            </div>
          )}

          <div className="form-group col-md-12">
            <button
              className="btn btn-primary btn-block mt-4"
              onClick={editarCliente}
            >
              Registrar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditarCliente;
