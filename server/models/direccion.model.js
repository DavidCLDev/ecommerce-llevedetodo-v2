import pool from '../config/db.js';

export async function insertAddress(
    neighborhood, exactAddress, zipCode,
    isMain=true, municipalityId, userId
) {
    await pool.execute(
        `INSERT INTO direccion (barrio, direccion_exacta, codigo_postal,
        es_principal, id_municipio, id_usuario) values (?, ?, ?, ?, ?, ?);`,
        [
            neighborhood, exactAddress, zipCode,isMain,
            municipalityId,userId
        ]
    );

}

export async function fetchAddresses(id) {
    const [rows] = await pool.execute(
        `
        SELECT dir.id, dir.direccion_exacta, mun.nombre, dep.nombre
        FROM direccion dir
        JOIN municipio mun ON dir.id_municipio = mun.id
        JOIN departamento dep ON mun.id_departamento = dep.id
        WHERE dir.id_usuario = ?;
        `, [id]
    );

    return rows;
}

export async function fetchAddress(userId, addressId) {
    const [rows] = await pool.execute(
        `
        SELECT dir.id, dir.direccion_exacta, dir.codigo_postal,
        dir.es_principal, mun.nombre, dep.nombre
        FROM direccion dir
        JOIN municipio mun ON dir.id_municipio = mun.id
        JOIN departamento dep ON mun.id_departamento = dep.id
        WHERE dir.id_usuario = ? AND dir.id = ?;
        `, [userId, addressId]
    );

    return rows;
}

export async function existsExactAddress(exactAddress) {
    const [result] = pool.execute(
        `
        SELECT EXISTS(SELECT 1 FROM direccion
        WHERE direccion_exacta = ?) as exactAddressExists
        `, [exactAddress]
    );

    return result[0];
}

export async function deleteUserAddressById(userId, addressId) {

    const [result] = await pool.execute(
        "DELETE FROM direccion WHERE id = ? AND id_usuario = ?;",
        [addressId, userId]
    );

    return result.affectedRows;
}

export async function updateAddress(userId, addressId, data) {
    const fields = [];
    const values = Object.values(data).concat([userId, addressId]);

    for (let key in data) {
        fields.push(`${key} = ?`);
    }

    const[result] = await pool.execute(`
        UPDATE direccion SET ${fields.join(",")}
        WHERE id_usuario = ? AND id = ?
        `, values);

    return result.affectedRows;
}