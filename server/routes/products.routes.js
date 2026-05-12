import { Router } from 'express';

import { createProduct, deleteProduct, getRecommendedProducts, getSingleProduct, modifyProductData } from '../controllers/products.controllers.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { checkForCompany } from '../middlewares/company.middleware.js';
import { getAllCategories } from '../controllers/categories.controllers.js';

const router = Router();

// Obtener productos recomendados
router.get('/recomendados', getRecommendedProducts);

// Obtener categorías a las que puede pertenecer un producto
router.get('/categories', getAllCategories);

// Obtener un producto en específico
router.get('/:productId', getSingleProduct);

// Crear un producto
router.post('/create', verifyToken, createProduct);

// Actualizar un producto
router.patch('/:productId', verifyToken, modifyProductData);

// Eliminar un producto
router.delete('/:productId', verifyToken, deleteProduct);

export default router;