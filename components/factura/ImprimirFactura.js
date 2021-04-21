import React from "react";
import Spinner from "../layouts/Spinner";
import moment from 'moment'
import DetalleFactura from "./DetalleFactura";



const ImprimirFactura = ({ servicio, cliente }) => {
  return (
    <div className="mt-2 alert alert-primary border border-dark">
      {!servicio ? (
        <Spinner />
      ) : !cliente ? (
        <Spinner />
      ) : (

            <div className=" p-4 border border-dark">
              <h3>
                <strong border border-dark p-4>
                  <u>Comprobante de pago N°</u>: {servicio.idservicio} / {moment().format("YYYY")}
                </strong>
              </h3>

              <div className="mt-4 border border-dark p-4 ">
                <div className="row">
                  <div className="mt-4 border border-dark p-4  border border-dark p-4 col-md-6">
                    <h5>
                      <strong>
                        <u>Cliente</u>: {cliente.apellido}, {cliente.nombre}
                      </strong>
                    </h5>
                  </div>
                  <div className="mt-4 border border-dark p-4 col-md-6">
                    <h5>
                      <strong>
                        <u>Fecha</u>: {moment().format('DD/MM/YYYY')}
                      </strong>
                    </h5>
                  </div>
                  <div className="mt-4 border border-dark p-4 col-md-12">
                    <h5>
                      <strong>
                        <u>Detalle Del Servicio</u>: {servicio.detalle}
                      </strong>
                    </h5>
                  </div>
                  <div className="mt-4 border border-dark p-4 border border-dark p-4 col-md-6">
                    <h5>
                      <strong>
                        <u>Importe</u>: {servicio.importe}
                      </strong>
                    </h5>
                  </div>
                  <div className="mt-4 border border-dark p-4 col-md-6">
                    <h5>
                      <strong>
                        <u>Deuda</u>: {servicio.deuda}
                      </strong>
                    </h5>
                  </div>
                </div>
              </div>
            </div>

          )}
    </div>
  );
};

export default ImprimirFactura;
