import express from 'express';
import { protect, authorize } from '../auth/auth.middleware.js';
import { addProduct, getInventory, createMovement, getProductById, 
    updateProduct, 
    deleteProduct, } from './inventario.controller.js';

const router = express.Router();

// Catálogo
router.get('/products', protect, getInventory);
router.post('/products', protect, authorize('admin', 'socio'), addProduct);

// Movimientos (Entradas/Salidas)
router.post('/products/:productId/movement', protect, createMovement);


router.put('/:id', protect, authorize('admin', 'socio'), updateProduct);
router.delete('/:id', protect, authorize('admin'), deleteProduct); // Solo admin borra
router.get('/:id', protect, getProductById);

export default router;