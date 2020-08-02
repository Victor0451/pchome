export default function validarNuevoCliente(valores) {
  let errores = {};

  if (!valores.nombre) {
    errores.nombre = "El nombre es obligatorio";
  }
  if (!valores.apellido) {
    errores.apellido = "El apellido es obligatorio";
  }

  return errores;
}
