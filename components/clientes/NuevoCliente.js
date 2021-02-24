import React from "react";

const NuevoCliente = ({
  nombre,
  apellido,
  dni,
  telefono,
  domicilio,
  alias,
  errores,
  handleChange,
  handleSubmit,
  handleBlur,
}) => {
  return (
    <div className="container alert alert-primary border border-dark mt-4 mb-4 p-4">
      <h2>
        <strong>
          <u>Nuevo Cliente</u>
        </strong>
      </h2>
      <form className="mt-4 border border-dark p-4" onSubmit={handleSubmit}>
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
              value={apellido}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errores.apellido && (
              <div className="mt-2 form-group  alert alert-danger">
                {errores.apellido}
              </div>
            )}
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
              value={nombre}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errores.nombre && (
              <div className="mt-2 form-group  alert alert-danger">
                {errores.nombre}
              </div>
            )}
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
              value={alias}
              onChange={handleChange}
              onBlur={handleBlur}
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
              type="number"
              className="form-control"
              name="dni"              
              value={dni}
              onChange={handleChange}
              onBlur={handleBlur}
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
              value={domicilio}
              onChange={handleChange}
              onBlur={handleBlur}
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
              type="number"
              className="form-control"
              name="telefono"
              value={telefono}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <div className="form-group col-md-4">
            <button className="btn btn-primary btn-block mt-4" type="submit">
              Registrar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NuevoCliente;
