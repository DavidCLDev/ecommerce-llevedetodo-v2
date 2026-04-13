import pool from '../config/db.js';

export async function fetchDepartments() {
    const [rows] = await pool.execute(
        'SELECT * FROM departamento ORDER BY nombre ASC;'
    );

    return rows;
}