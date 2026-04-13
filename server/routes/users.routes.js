import { Router } from 'express';

import { verifyToken } from '../middlewares/auth.middleware.js';
import { validateAddress } from '../middlewares/address.middleware.js';
import { deleteUser, fetchAdditionalData, updateUserData } from '../controllers/users.controllers.js'
import { createAddress, getBasicAddresses, getSpecificAddress, updateAddressData } from '../controllers/addresses.controllers.js';
import { deleteUserAddress } from '../controllers/addresses.controllers.js';

const router = Router();

// Eliminar usuario
router.delete('/me', verifyToken, deleteUser);

// Consultar datos adicionales del usuario
router.get('/me', verifyToken, fetchAdditionalData);

// Actualizar datos del usuario
router.patch('/me', verifyToken, updateUserData);

// Crear direcciones
router.post('/me/addresses', verifyToken, validateAddress({ required: true}), createAddress);

// Obtener direcciones del usuario
router.get('/me/addresses', verifyToken, getBasicAddresses);

// Obtener una datos específicos de una dirección
router.get('/me/addresses/:addressId', verifyToken, getSpecificAddress);

// Actualizar datos específicos de una dirección
router.patch('/me/addresses/:addressId', verifyToken, validateAddress(), updateAddressData)

// Eliminar dirección
router.delete('/me/addresses/:addressId', verifyToken, deleteUserAddress);

export default router;