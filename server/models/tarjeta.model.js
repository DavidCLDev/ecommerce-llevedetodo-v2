import pool from "../config/db.js";

export async function insertCard({ holder, last4, expiry, token, userId }) {

    await pool.execute(
        `
        INSERT INTO tarjeta
        (titular, numero, vencimiento, token, id_usuario)
        VALUES (?, ?, ?, ?, ?);
        `, [holder, last4, expiry, token, userId]
    );

}

export async function getCardsById(userId) {

    const [rows] = await pool.execute(
        `
        SELECT id, titular, numero, vencimiento FROM tarjeta WHERE id_usuario = ?;
        `, [userId]
    );

    return rows;

}

export async function deleteCardById(cardId) {

    const [result] = await pool.execute(
        `
        DELETE FROM tarjeta WHERE id = ?;
        `, [cardId]
    );

    return result;
}