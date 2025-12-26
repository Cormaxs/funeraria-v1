import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { connectDB } from './modules/config/db.js';
import authRoutes from './modules/auth/auth.routes.js';
import asociadosRoutes from './modules/asociados/asociados.routes.js';
import inventarioRoutes from './modules/inventario/inventario.routes.js';
//import { errorHandler } from './module//s/utils/errorHandler.js';

connectDB();

const app = express();

// --- Middlewares Globales ---
app.use(cors()); // Permitir peticiones desde el frontend
app.use(morgan('dev')); // Ver logs de peticiones en consola
app.use(express.json()); // Parsear cuerpos JSON

// --- Rutas de los Módulos ---
app.use('/api/auth', authRoutes);
app.use('/api/asociados', asociadosRoutes);
app.use('/api/inventario', inventarioRoutes);

// --- Manejo de Errores ---
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Middleware de error personalizado
//app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

export default app;