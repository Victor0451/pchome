import React from 'react'
import Listado from './Listado'

const ServiciosSinAbonar = ({ listado }) => {
    return (
        <div className="container mt-4 border border-dark alert alert-primary">
            <h2><strong><u>
                Servicios Sin Pagar
                </u></strong></h2>

            <Listado listado={listado} />

        </div>
    )
}

export default ServiciosSinAbonar
