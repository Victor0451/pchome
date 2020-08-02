export default function validarPago(valores) {
    let errores = {};

    if (!valores.importe) {
        errores.importe = "El importe es obligatorio";
    }


    return errores;
}
