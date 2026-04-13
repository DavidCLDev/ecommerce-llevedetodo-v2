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

export async function findPasswordById(id) {
    const [rows] = await pool.execute(
        'SELECT id, contrasena FROM usuario WHERE id = ?',
        [id]
    );

    return rows[0];
}

export async function findAdditionalDataById(id) {
    const [rows] = await pool.execute(
        'SELECT apellido, celular FROM usuario WHERE id = ?',
        [id]
    );

    return rows[0];
}

export async function deleteUserById(id) {
    const [result] = await pool.execute(
        'DELETE FROM usuario WHERE id = ?',
        [id]
    );

    return result;
}

export async function updateUsername(id, username) {
    const [result] = await pool.execute(
        'UPDATE usuario SET nombre_de_usuario = ? WHERE id = ?',
        [username, id]
    );

    return result.affectedRows;
}

export async function updateEmail(id, email) {
    const [result] = await pool.execute(
        'UPDATE usuario SET correo = ? WHERE id = ?',
        [email, id]
    );

    return result.affectedRows;
}

export async function updatePhone(id, phone) {
    const [result] = await pool.execute(
        'UPDATE usuario SET celular = ? WHERE id = ?',
        [phone, id]
    );

    return result.affectedRows;
}

export async function updateNames(id, firstname, lastname) {
    const [result] = await pool.execute(
        'UPDATE usuario SET nombre = ?, apellido = ? WHERE id = ?',
        [firstname, lastname, id]
    );

    return result.affectedRows;
}

export async function existsEmail(email) {
    const[result] = await pool.execute(
        'SELECT EXISTS(SELECT 1 FROM usuario WHERE correo = ?) AS emailExists',
        [email]
    );

    return result[0];
}

export async function existsUsername(username) {
    const[result] = await pool.execute(
        'SELECT EXISTS(SELECT 1 FROM usuario WHERE nombre_de_usuario = ?) as usernameExists',
        [username]
    );

    return result[0];
}

export async function existsPhone(phoneNumber) {
    const[rows] = await pool.execute(
        'SELECT EXISTS(SELECT 1 FROM usuario WHERE celular = ?) as phoneExists',
        [phoneNumber]
    )

    return result[0];
}