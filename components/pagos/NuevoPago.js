import React, { useState } from "react";
import Spinner from "../layouts/Spinner";

const NuevoPago = ({
  servicio,
  cliente,
  fecha,
  nuevoPago,
  calcDeuda,
  deuda,
  error,
  importeRef,
}) => {
  if (!servicio || !cliente) return <Spinner />;

  return (
    <div className="container mt-4 border border-dark p-4 alert alert-primary">
      <h1 className="mb-4">
        <strong>
          <u>Registrar Pagos</u>
        </strong>
      </h1>

      <form className="mt-4 border border-dark p-4">
        <h2>
          <strong>
            <u>Detalles del Servicio</u>
          </strong>
        </h2>

        <div className="row border border-dark p-4 ">
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

          <div className="form-group col-md-4">
            <label>
              <strong>
                {" "}
                <u> Fecha Servicio: </u>
              </strong>
            </label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              defaultValue={servicio.fecha}
              readOnly
            />
          </div>

          <div className="form-group col-md-12">
            <label>
              <strong>
                {" "}
                <u> Servicio: </u>
              </strong>
            </label>
            <textarea
              rows="3"
              className="form-control"
              name="nombre"
              defaultValue={servicio.detalle}
              readOnly
            />
          </div>

          {servicio.estado === 2 ? (
            <div className="form-group col-md-4">
              <label>
                <strong>
                  {" "}
                  <u> Importe: </u>
                </strong>
              </label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                defaultValue={servicio.deuda}
                readOnly
              />
            </div>

          ) : (

              <div className="form-group col-md-4">
                <label>
                  <strong>
                    {" "}
                    <u> Importe: </u>
                  </strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  defaultValue={servicio.importe}
                  readOnly
                />
              </div>


            )}
        </div>

        <div className=" mt-4 border border-dark p-4 ">
          <h2 className="mb-4">
            <strong>
              <u>Detalles del pago</u>
            </strong>
          </h2>

          <div className="row">
            <div className="form-group col-md-4">
              <label>
                <strong>
                  {" "}
                  <u> Fecha Pago: </u>
                </strong>
              </label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                defaultValue={fecha}
              />
            </div>


            <div className="form-group col-md-4">
              <label>
                <strong>
                  {" "}
                  <u> Monto a Pagar: </u>
                </strong>
              </label>
              <input
                type="number"
                className="form-control"
                id="importe"
                name="importe"
                ref={importeRef}
                onChange={calcDeuda}
              />
            </div>

            <div className="form-group col-md-4">
              <label>
                <strong>
                  {" "}
                  <u> Deuda: </u>
                </strong>
              </label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                defaultValue={deuda}
                readOnly
              />
            </div>

            <div className="form-group col-md-12 d-flex justify-content-center">
              <button className="btn btn-primary  mt-4" onClick={nuevoPago}>
                Registrar Pago
              </button>
            </div>

            {error && (
              <div className="mt-2 form-group text-center text-uppercase alert alert-danger col-12">
                {error}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default NuevoPago;
