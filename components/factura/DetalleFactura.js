import React from 'react'
import Spinner from '../layouts/Spinner'

const DetalleFactura = ({ historial }) => {

    if (!historial) return <Spinner />
    return (
        <div className="mt-4 mb-4 alert alert-primary border border-dark p-4">
            <h4 className=" mb-4" ><strong><u>Detalle</u></strong></h4>
            <table className="table table-sm border border-dark list p-4">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Total</th>
                        <th scope="col">Pago</th>
                        <th scope="col">Saldo</th>
                        <th scope="col">Fecha</th>

                    </tr>
                </thead>
                <tbody>
                    {historial.map((hist, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{hist.total}</td>
                            <td>{hist.importe}</td>
                            <td>{hist.deuda}</td>
                            <td>{hist.fecha}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default DetalleFactura
