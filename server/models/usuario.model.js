import pool from '../config/db.js';

export async function insertUser(name, lastname, email, phone, username, password) {
    const [result] = await pool.execute(
        `INSERT INTO usuario (nombre, apellido, correo, celular, nombre_de_usuario, contrasena)
         VALUES(?, ?, ?, ?, ?, ?)`,
        [name, lastname, email, phone, username, password]
    );

    return result.insertId;
}

export async function findUserByEmail(email) {
    const [rows] = await pool.execute(
        'SELECT id, nombre, nombre_de_usuario, correo, contrasena FROM usuario WHERE correo = ?',
        [email]
    );

    return rows[0];
}

export async function findUserById(id) {
    const[rows] = await pool.execute(
        'SELECT id, nombre, nombre_de_usuario, correo FROM usuario WHERE id = ?',
        [id]
    );

    return rows[0];
}

export async function existsEmail(email) {
    const[rows] = await pool.execute(
        'SELECT EXISTS(SELECT 1 FROM usuario WHERE correo = ?) AS emailExists',
        [email]
    );

    return rows[0];
}

export async function existsUsername(username) {
    const[rows] = await pool.execute(
        'SELECT EXISTS(SELECT 1 FROM usuario WHERE nombre_de_usuario = ?) as usernameExists',
        [username]
    );

    return rows[0];
}

export async function existsPhone(phoneNumber) {
    const[rows] = await pool.execute(
        'SELECT EXISTS(SELECT 1 FROM usuario WHERE celular = ?) as phoneExists',
        [phoneNumber]
    )

    return rows[0];
}