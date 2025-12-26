import express from 'express';
import { protect, authorize } from './auth.middleware.js';
import { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  deleteUser, 
  updateUser 
} from './auth.controller.js';

const router = express.Router();

// --- Rutas Públicas ---
router.post('/register', registerUser);
router.post('/login', loginUser);

// --- Rutas Protegidas ---
router.get('/profile', protect, getUserProfile);

// Rutas de administración (Update y Delete suelen ser para el Admin o el propio usuario)
router.post('/update/:id', protect, authorize('admin'), updateUser);
router.delete('/delete/:id', protect, authorize('admin'), deleteUser);

export default router;