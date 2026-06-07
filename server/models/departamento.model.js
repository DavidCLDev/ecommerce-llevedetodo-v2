import pool from '../config/db.js';

export async function fetchDepartments() {
    const [rows] = await pool.execute(
        'SELECT id, nombre as name FROM departamento ORDER BY nombre ASC;'
    );

    return rows;
}