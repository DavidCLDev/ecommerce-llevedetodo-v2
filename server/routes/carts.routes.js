import { Router } from 'express';

import { verifyToken } from '../middlewares/auth.middleware.js';
import { checkForCompany } from '../middlewares/company.middleware.js';
import { createCartItem, getCart, removeCartItem, updateQuantity } from '../controllers/carts.controllers.js';

const router = Router();

// Agregar producto al carrito
router.post('/add/:productId', verifyToken, createCartItem);

// Obtener carrito
router.get('/', verifyToken, getCart);

// Eliminar producto
router.delete('/:productId', verifyToken, removeCartItem);

// Actualizar cantidad
router.patch('/:productId', verifyToken, updateQuantity);

export default router;