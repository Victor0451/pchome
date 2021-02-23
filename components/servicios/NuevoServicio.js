import React from "react";

const NuevoServicio = ({
  cliente,
  detalle,
  importe,
  fecha,
  empresa,
  handleBlur,
  handleChange,
  handleSubmit,
  errores,
}) => {
  if (!cliente) return <div>CARGANBDO..</div>;

  return (
    <div className="container mt-4 border border-dark alert alert-primary">
      <h1 className="mt-4 mb-4">
        <strong>
          <u>Cargar Servicio</u>
        </strong>
      </h1>
      <form className="border border-dark p-4" onSubmit={handleSubmit}>
        <h2 className=" mb-4 ">
          <strong>
            <u>Cliente</u>
          </strong>
        </h2>

        <div className="row border border-dark p-4 d-flex justify-content-center">
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
              readOnly
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
              readOnly
            />
          </div>
        </div>

        <h2 className="mt-4 mb-4 ">
          <strong>
            <u>Servicio</u>
          </strong>
        </h2>

        <div className="row border border-dark p-4">
          <div className="form-group col-md-12">
            <label>
              <strong>
                {" "}
                <u> Detalle: </u>
              </strong>
            </label>
            <textarea
              rows="3"
              className="form-control"
              name="detalle"
              value={detalle}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errores.detalle && (
              <div className="mt-2 form-group  alert alert-danger">
                {errores.detalle}
              </div>
            )}
          </div>

          <div className="form-group col-md-4">
            <label>
              <strong>
                {" "}
                <u> Empresa Del Servicio: </u>
              </strong>
            </label>
            <select
              className="custom-select"
              name="empresa"
              value={empresa}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option selected>Selecciona la empresa</option>
              <option value="PCHOME">PCHOME</option>
              <option value="SOLUTEC">SOLUTEC</option>
            </select>
            {errores.empresa && (
              <div className="mt-2 form-group  alert alert-danger">
                {errores.empresa}
              </div>
            )}
          </div>

          <div className="form-group col-md-2">
            <label>
              <strong>
                {" "}
                <u> Importe: </u>
              </strong>
            </label>
            <input
              type="number"
              className="form-control"
              name="importe"
              defaultValue={importe}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errores.importe && (
              <div className="mt-2 form-group  alert alert-danger">
                {errores.importe}
              </div>
            )}
          </div>
          <div className="form-group col-md-2">
            <label>
              <strong>
                {" "}
                <u> Fecha: </u>
              </strong>
            </label>
            <input
              type="text"
              className="form-control"
              name="fecha"
              defaultValue={fecha}
            />
          </div>

          <div className="form-group col-md-4">
            <button type="submit" className="btn btn-primary btm-block mt-4">
              Registrar Servicio
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NuevoServicio;
