export default function validarServicio(valores) {
    let errores = {};

    if (!valores.detalle) {
        errores.detalle = "El detalle es obligatorio";
    }
    if (!valores.importe) {
        errores.importe = "El importe es obligatorio";
    }

    return errores;
}
