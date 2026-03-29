import { Router } from 'express';

import { verifyToken } from '../middlewares/auth.middleware.js';
import { deleteUser } from '../controllers/users.controllers.js'

const router = Router();

// LOGIN

router.delete('/:id', verifyToken, deleteUser);


export default router;