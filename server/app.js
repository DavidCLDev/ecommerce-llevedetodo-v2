// Aquí va la configuración de Express

import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import productsRoutes from './routes/product.routes.js';
import usersRoutes from './routes/users.routes.js';
import departmentsRoutes from './routes/departments.routes.js';

const app = express();

/* ---------------- MIDDLEWARES GLOBALES ---------------- */

app.use(express.json());

app.use(cors());

/* ---------------- ROUTES ---------------- */
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/departments', departmentsRoutes);

app.get('/api/health', (_, res) => {
    res.json({status: 'OK'});
});


export default app;