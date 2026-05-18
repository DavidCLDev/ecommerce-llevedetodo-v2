import pool from "../config/db.js";

/* Función que permite ejecutar una sentencia sql para insertar el registro de
un producto en la base de datos. */
export async function insertProduct (
    name, price, discount=0, shippingCost=0, stock,
    brand, descr, catId, companyId
) {

    // Ejecuta la consulta para insertar registro.
    const result = await pool.execute(`
        INSERT INTO producto
        (nombre, precio, descuento, costo_envio, stock, marca,
        descripcion, id_categoria, id_empresa)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
        `, [
            name, price, discount ?? 0, shippingCost ?? 0, stock,
            brand, descr, catId, companyId
        ]
    );

    return result.insertId;

}

/* Función que permite ejecutar una sentencia sql para obtener el registro de
un producto en la base de datos junto con datos básicos de la empresa que lo
oferta y su categoría. */
export async function getProductById(id) {
    // Ejecuta la consulta para obtener registro.
    const [rows] = await pool.execute(`
        SELECT p.id, p.nombre as name, p.precio as price,
        p.descuento as discount, p.costo_envio as shippingCost, p.stock,
        p.marca as brand, p.calificacion as rating,
        p.descripcion as description, e.id as companyId, e.nombre as company,
        c.id as categoryId, c.nombre as category
        FROM producto p JOIN empresa e ON p.id_empresa = e.id
        JOIN categoria c ON p.id_categoria = c.id
        WHERE p.id = ?;
        `, [id]
    );

    return rows[0];
}

/* Función que permite ejecutar una sentencia sql para eliminar el registro de
un producto en la base de datos. */
export async function deleteProductById(id_emp, id) {
    // Ejecuta la consulta para eliminar registro.
    const [result] = await pool.execute(`
        DELETE FROM producto WHERE id = ? AND id_empresa = ?;
        `, [id, id_emp]
    );

    return result.affectedRows;
}

/* Función que permite ejecutar una sentencia sql para actualizar el registro de
un producto en la base de datos. */
export async function updateProduct(companyId, productId, data) {
    const fields = [];
    const values = Object.values(data).concat(productId, companyId);

    for (let key in data) {
        fields.push(`${key} = ?`);
    }

    const[result] = await pool.execute(
        `UPDATE producto SET ${fields.join(",")}
        WHERE id = ? AND id_empresa = ?;`,
        values
    );
        
    return result.affectedRows;
}

/* Función que permite ejecutar una sentencia sql para actualizar el costo de
envío del registro de un producto en la base de datos. */
export async function setShippingCostById(id, shippingCost) {
    // Ejecuta la consulta para actualizar el costo de envío de un producto.
    const [result] = await pool.execute(`
        UPDATE producto SET costo_envio = ? WHERE id = ?;
        `, [shippingCost, id]
    );
}

export async function productExists(id) {
    const [result] = await pool.execute(`
        SELECT EXISTS (SELECT 1 FROM producto WHERE id = ?) AS productExistence
        `, [id]
    );

    return result[0];
}