import { Router } from 'express';

import { getDepartments, getMunicipalities } from '../controllers/departments.controllers.js';

const router = Router();

router.get('/', getDepartments);

router.get('/:id/municipalities', getMunicipalities);

export default router;