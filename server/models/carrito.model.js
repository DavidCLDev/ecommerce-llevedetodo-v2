import pool from '../config/db.js';

/* Función que permite ejecutar una sentencia sql para crear el registro de un
producto en el carrito de un usuario en la base de datos. 


*/
export async function insertCartItem(userId, productId) {
    // Ejecuta la consulta para asignar el producto a un usuario
    const [result] = await pool.execute(`
        INSERT INTO carrito (id_usuario, id_producto) VALUES (?, ?);
        `, [userId, productId]
    );

    return result.affectedRows;
}

/* Función que permite ejecutar una sentencia sql para eliminar el registro de
un producto en el carrito de un usuario en la base de datos. */
export async function deleteCartItem(userId, productId) {
    // Ejecuta la consulta para eliminar el producto del carrito
    const [result] = await pool.execute(`
        DELETE FROM carrito WHERE id_usuario = ? AND id_producto = ?;
        `, [userId, productId]
    );

    return result.affectedRows;
}

/* Función que permite ejecutar una sentencia sql para obtener todos los
registros del carrito, es decir, todos los productos registrados. */
export async function getAllItems(userId) {
     // Ejecuta la consulta para obtener los productos del carrito
    const [cart] = await pool.execute(`
        SELECT c.id_producto as id, c.cantidad as quantity, p.precio as price
        FROM carrito c JOIN producto p
        ON c.id_producto = p.id WHERE id_usuario = ?;
        `, [userId]
    );

    return cart;
}

/* Función que permite ejecutar una sentencia sql para actualizar la cantidad
de un producto registrado en el carrito. */
export async function updateQuantityById(userId, productId, quantity) {
    // Ejecuta la consulta para actualizar la cantidad del producto registrado.
    const [result] = await pool.execute(`
        UPDATE carrito SET cantidad = ?
        WHERE id_usuario = ? AND id_producto = ?;
        `, [quantity, userId, productId]
    );

    return result.affectedRows;
}