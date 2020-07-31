export default function validarNuevoCliente(valores) {
  let errores = {};

  if (!valores.nombre) {
    errores.nombre = "La nombre es obligatoria";
  }
  if (!valores.apellido) {
    errores.apellido = "La apellido es obligatoria";
  }

  return errores;
}
