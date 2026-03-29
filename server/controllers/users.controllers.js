import bcrypt from 'bcrypt';
import { findPasswordById, deleteUserById } from "../models/usuario.model.js";

export async function deleteUser(req, res) {
    try {
        const { id } = req.params
        const { confirmPass } = req.body;

        const { contrasena } = await findPasswordById(id);
        
        // Se comparan los hashes de las contraseñas
        const isValid = await bcrypt.compare(confirmPass, contrasena);

        if (!isValid) {
            return res.status(401).json({ message: 'Contraseña inválida'});
        }

        const result = await deleteUserById(id);

        if (result === 0) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        return res.status(204).send();

    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
}