import pool from '../config/db.js';

export async function fetchMunicipalitiesByDep(id) {
    const [rows] = await pool.execute(
        'SELECT id, nombre FROM municipio WHERE id_departamento = ? ORDER BY nombre ASC;',
        [id]
    );

    return rows;
}

export async function existsMunicipality(id) {
    const [exists] = await pool.execute(
        'SELECT EXISTS(SELECT 1 FROM municipio WHERE id = ?) as municipalityExists',
        [id]
    );

    return exists[0].municipalityExists;
}