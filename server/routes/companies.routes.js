import { Router } from 'express';

import { verifyToken } from '../middlewares/auth.middleware.js';
import { validateAddress, checkForAllAddressFields, checkAddressObject } from '../middlewares/address.middleware.js';
import { createCompany, deleteCompany, getCompany, modifyCompanyData } from '../controllers/companies.controllers.js';

const router = Router();

// Crear empresa
router.post('/', verifyToken, checkAddressObject, checkForAllAddressFields, validateAddress, createCompany);

// Obtener empresa
router.get('/', verifyToken, getCompany);

// Eliminar empresa
router.delete('/', verifyToken, deleteCompany);

// Actualizar datos de la empresa
router.patch('/', verifyToken, modifyCompanyData);

export default router;