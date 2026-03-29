// Aquí va la configuración de Express

import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import productsRoutes from './routes/product.routes.js';
import usersRoutes from './routes/users.routes.js'

const app = express();

/* ---------------- MIDDLEWARES GLOBALES ---------------- */

app.use(express.json());

app.use(cors());

/* ---------------- ROUTES ---------------- */
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/usuario', usersRoutes);

app.get('/health', (req, res) => {
    res.json({message: 'API funcionando'});
});


export default app;