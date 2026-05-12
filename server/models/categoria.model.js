import pool from "../config/db.js";

export async function selectAllCategories() {
    const [rows] = await pool.execute(`SELECT id, nombre FROM categoria;`);

    return rows;
}

export async function isCategoryInModel(id) {
    const [result] = await pool.execute(`
        SELECT EXISTS(SELECT 1 FROM categoria WHERE id = ?) as categoryExistence
        `, [id]
    );

    return result[0];
}