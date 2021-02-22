import React from "react";
import Spinner from "../layouts/Spinner";

const ImprimirFactura = ({ servicio, cliente }) => {
  return (
    <div className="mt-4  container alert alert-primary border border-dark p-4">
      {!servicio ? (
        <Spinner />
      ) : !cliente ? (
        <Spinner />
      ) : (
        <>
          <h2>
            <strong>
              <u>PC-HOME: Servicio Tecnico</u>
            </strong>
          </h2>

          <div className="mt-4 p-4 border border-dark">
            <h3>
              <strong border border-dark p-4>
                <u>Comprobante de pago N°</u>:
              </strong>
            </h3>

            <div className="mt-4 border border-dark p-4 ">
              <div className="row">
                <div className="mt-4 border border-dark p-4  border border-dark p-4 col-md-6">
                  <h5>
                    <strong>
                      <u>Cliente</u>:
                    </strong>
                  </h5>
                </div>
                <div className="mt-4 border border-dark p-4 col-md-6">
                  <h5>
                    <strong>
                      <u>Fecha</u>:
                    </strong>
                  </h5>
                </div>
                <div className="mt-4 border border-dark p-4 col-md-12">
                  <h5>
                    <strong>
                      <u>Detalle Del Servicio</u>:
                    </strong>
                  </h5>
                </div>
                <div className="mt-4 border border-dark p-4 border border-dark p-4 col-md-6">
                  <h5>
                    <strong>
                      <u>Importe</u>:
                    </strong>
                  </h5>
                </div>
                <div className="mt-4 border border-dark p-4 col-md-6">
                  <h5>
                    <strong>
                      <u>Deuda</u>:
                    </strong>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ImprimirFactura;
