import { Router } from 'express';

import { getRecommendedProducts } from '../controllers/products.controllers.js';

const router = Router();

router.get('/recomendados', getRecommendedProducts);

export default router;