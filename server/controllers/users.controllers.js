import bcrypt from 'bcrypt';
import { findPasswordById, findAdditionalDataById, deleteUserById, updateUsername, updateEmail, updatePhone, updateNames, findUserById, existsEmail, existsUsername, existsPhone } from "../models/usuario.model.js";
import { mapAdditionalData, mapUser } from '../utils/mapData.js';
import { isPhoneValid, isNameValid } from '../utils/verifyData.js';

export async function fetchAdditionalData(req, res) {
    try {
        const { id } = req.user;

        const result = await findAdditionalDataById(id);

        const additionalData = mapAdditionalData(result);

        return res.status(200).json(additionalData)

    } catch(error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
}

export async function updateUserData(req, res) {
    try {
        const { id } = req.user;

        const { body } = req;
        
        if (body.username) {
            const { username } = body;

            if (!isNameValid(username)) {
                return res.status(400).json({
                    message: 'El campo debe tener al menos 3 caracteres y no puede contener espacios'
                })
            }
            
            let { usernameExists } = await existsUsername(username);

            if (usernameExists) {
                return res.status(409).json({ message: 'nombre de usuario ya existente' });
            }
            await updateUsername(id, username);
            
        } else if (body.email) {
            let { emailExists } = await existsEmail(body.email);

            if (emailExists) {
                return res.status(409).json({ message: 'correo ya existente' });
            }
            await updateEmail(id, body.email);

        } else if (body.phone) {
            const { phone } = body
            if (!isPhoneValid(phone)) {
                return res.status(400).json({
                    message: 'El formato del número no concuerda con un número del país'
                });
            }

            let { phoneExists } = await existsPhone(phone);

            if (phoneExists) {
                return res.status(409).json({ message: 'el número de celular ya está registrado' });
            }

            await updatePhone(id, phone)

        } else if (body.firstname && body.lastname) {
            isNameValid(body.firstname);
            isNameValid(body.lastname);
            await updateNames(id, body.firstname, body.lastname);

        } else {
            return res.status(400).json({ mensaje: "Los campos están vacíos"} )
        }

        const user = await findUserById(id);

        const mappedUser = mapUser(user);

        return res.status(200).json(mappedUser);

    } catch (error) {
        res.status(500).json({ message: "Error del Servidor" });
    }
}

export async function deleteUser(req, res) {
    try {
        const { id } = req.user;
        const { confirmPass } = req.body;

        const { contrasena } = await findPasswordById(id);
        
        // Se comparan los hashes de las contraseñas
        const isValid = await bcrypt.compare(confirmPass, contrasena);

        if (!isValid) {
            return res.status(401).json({ message: 'Contraseña inválida'});
        }

        await deleteUserById(id);

        return res.status(204).send();

    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
}