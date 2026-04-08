import { Router } from 'express';

import { verifyToken } from '../middlewares/auth.middleware.js';
import { deleteUser, fetchAdditionalData, updateUserData } from '../controllers/users.controllers.js'

const router = Router();

// Eliminar usuario

router.delete('/:id', verifyToken, deleteUser);

// Consultar datos adicionales del usuario

router.get('/:id', verifyToken, fetchAdditionalData);

router.patch('/:id', verifyToken, updateUserData);


export default router;