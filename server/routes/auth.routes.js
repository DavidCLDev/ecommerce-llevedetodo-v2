import { Router } from 'express';

import { verifyToken } from '../middlewares/auth.middleware.js';

import { login } from '../controllers/auth.controllers.js';
import { getProfile } from '../controllers/auth.controllers.js';

import { register } from '../controllers/auth.controllers.js';


const router = Router();

// LOGIN

router.post('/login', login);
router.get('/login', verifyToken, getProfile);

// REGISTRAR
router.post('/register', register);



export default router;