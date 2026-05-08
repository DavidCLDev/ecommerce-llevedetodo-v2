import pool from "../config/db.js";

export async function insertCompany(name, descr, AddressId, sellerId) {

    const [result] = await pool.execute(`
        INSERT INTO empresa
        (nombre, descripcion, fecha_registro, logo, id_direccion, id_vendedor)
        VALUES (?, ?, ?, ?, ?, ?);
        `, [name, descr, new Date(), `/uploads/companies/${crypto.randomUUID()}.png`, AddressId, sellerId]
    );

    return result.insertId;

}

export async function updateCompany(sellerId, data) {
    const fields = [];
    const values = Object.values(data).concat(sellerId);

    for (let key in data) {
        fields.push(`${key} = ?`);
    }

    const[result] = await pool.execute(
        `UPDATE empresa SET ${fields.join(",")}
        WHERE id_vendedor = ?;`,
        values
    );
        
    return result.affectedRows;
}

export async function getCompanyById(id) {
    const [result] = await pool.execute(`
        SELECT e.nombre as name, e.descripcion as description, logo,
        d.barrio as neighborhood, d.direccion_exacta as exactAddress,
        d.codigo_postal as zipCode, m.nombre as municipality,
        dep.nombre as department
        FROM empresa e
        JOIN direccion d ON e.id_direccion = d.id
        JOIN municipio m ON d.id_municipio = m.id
        JOIN departamento dep ON m.id_departamento = dep.id
        WHERE e.id_vendedor = ?;
        `, [id]
    );

    return result[0];
}

export async function getCompanyIdByUser(id) {
    const [result] = await pool.execute(`
        SELECT id as id FROM empresa WHERE id_vendedor = ?
        `, [id]
    );

    return result[0];
}

export async function deleteCompanyByUser(userId) {
    const [result] = await pool.execute(
        `DELETE FROM empresa WHERE id_vendedor = ?;`, [userId]
    );

    return result;
}

export async function nameCompanyExists(name) {
    const [result] = await pool.execute(`
        SELECT EXISTS(SELECT 1 FROM empresa
        WHERE LOWER(nombre) = ?) as nameCompanyIsDuplicated
        `, [name.trim().replace(/\s+/g, ' ').toLowerCase()]
    );

    return result[0];
}

export async function sellerExists(sellerId) {
    const [result] = await pool.execute(`
        SELECT EXISTS(SELECT 1 FROM empresa
        WHERE id_vendedor = ?) as userHasCompany
        `, [sellerId]
    );

    return result[0];
}

export async function addressExists(addressId) {
    const [result] = await pool.execute(`
        SELECT EXISTS(SELECT 1 FROM empresa
        WHERE id_direccion = ?) as addressIsDuplicated
        `, [addressId]
    );

    return result[0];
}