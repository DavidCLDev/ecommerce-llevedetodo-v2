export function mapUser({ id, nombre, nombre_de_usuario, correo }) {
    return {id: id, name: nombre, username: nombre_de_usuario, email: correo};
}