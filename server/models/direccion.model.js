import pool from '../config/db.js';

export async function insertAddress(
    neighborhood, exactAddress, zipCode, owner, phone, isMain=true,
    municipalityId, userId
) {
    const [result] = await pool.execute(
        `INSERT INTO direccion (barrio, direccion_exacta, codigo_postal,
        representante, telefono, es_principal, id_municipio, id_usuario)
        values (?, ?, ?, ?, ?, ?, ?, ?);`,
        [
            neighborhood, exactAddress, zipCode, owner, phone, isMain=true,
            municipalityId, userId
        ]
    );

    return result.insertId;

}

export async function fetchAddresses(id) {
    const [rows] = await pool.execute(
        `
        SELECT dir.id, dir.direccion_exacta as exactAddress,
        dir.representante as owner, dir.telefono as phone,
        dir.es_principal as isMain, mun.nombre as municipality,
        dep.nombre as department
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
        SELECT dir.id, dir.direccion_exacta as exactAddress,
        dir.barrio as neighborhood, dir.codigo_postal as zipCode,
        dir.id_municipio as municipalityId, dep.id as department,
        dir.representante as owner, dir.telefono as phone
        FROM direccion dir JOIN municipio mun
        ON dir.id_municipio = mun.id
        JOIN departamento dep ON mun.id_departamento = dep.id
        WHERE dir.id_usuario = ? AND dir.id = ?;
        `, [userId, addressId]
    );

    return rows[0];
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

export async function existsAddress(
    exactAddress, zipCode, neighborhood, municipality
) {
    const [result] = await pool.execute(
        `
        SELECT EXISTS(SELECT 1 FROM direccion
        WHERE direccion_exacta = ? AND codigo_postal = ? AND barrio = ?
        AND id_municipio = ?
        ) as exactAddressIsDuplicated
        `, [exactAddress, zipCode, neighborhood, municipality]
    );

    return result[0];
}