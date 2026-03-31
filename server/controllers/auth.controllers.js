import bcrypt from 'bcrypt';

import { findUserByEmail, findUserById, existsEmail, existsUsername ,insertUser, existsPhone } from '../models/usuario.model.js';

import { generateToken } from '../utils/jwt.js';

import { mapUser } from '../services/mapData.js';

// Lógica de INICIO DE SESIÓN
export async function login(req, res) {
    try {
        const {email, password} = req.body;

        if (!email | !password) {
            return res.status(404).json({ message: 'Datos incompletos' });
        }

        const { contrasena, ...usuario } = await findUserByEmail(email);

        // Se comparan los hashes de las contraseñas
        const isValid = await bcrypt.compare(password, contrasena);
        
        if (!isValid) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const user = mapUser(usuario);

        // Se genera el token de autenticación
        const token = generateToken({
            id: user.id
        });
        
        res.status(200).json({
            message: 'success',
            user,
            token
        });

    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
}

// REGISTRAR USUARIO

export async function register(req, res) {
    try {
        const {
            name,
            lastname,
            email,
            phone,
            username,
            password
        } = req.body;

        if (!name | !lastname | !email | !phone | !username | !password) {
            return res.status(404).json({message: 'Datos incompletos'});
        }

        let { emailExists } = await existsEmail(email);

        if (emailExists) {
            return res.status(409).json({ message: 'correo ya existente' });
        }

        let { usernameExists } = await existsUsername(username);

        if (usernameExists) {
            return res.status(409).json({ message: 'nombre de usuario ya existente' });
        }

        let { phoneExists } = await existsPhone(phone);

        if (phoneExists) {
            return res.status(409).json({ message: 'el número de celular ya está registrado' });
        }

        const phoneRegex = /^3\d{9}$/;

        if (!phoneRegex.test(phone)) {
            return res.status(400).json({
                message: 'El formato del número no concuerda con un número del país'
            });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: 'La contraseña debe tener por lo menos 8 caracteres, incluyendo una mayúsculas, minúsculas, números y un caracter especial'
            });
        }

        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const userID = await insertUser(name, lastname, email, phone, username, hashedPassword);

        const user = {id:userID, name, username, email};

        const token = generateToken({
            id: user.id
        });

        res.status(201).json({
            message: 'success',
            user,
            token
        });

    } catch(error) {
        res.status(500).json({ message: "Error del servidor" })
    }
}

// RETORNAR PERFIL POR TOKEN
export async function getProfile(req, res) {
    try {
        const userId = req.user.id;

        const usuario = await findUserById(userId);
        
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const user = mapUser(usuario);

        res.json({user});
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
}