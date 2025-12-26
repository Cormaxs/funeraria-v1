import express from 'express';
import { protect, authorize } from '../auth/auth.middleware.js';
import { 
  getAssociates, 
  createAssociate, 
  updateAssociate, 
  changeStatus
} from './asociados.controller.js';

const router = express.Router();

router.use(protect); // Todas requieren Token

router.get('/', getAssociates);//todos los asociados
router.post('/', createAssociate);//crea un asociado, referenciando al usuario de users(admin)
router.put('/:id', updateAssociate);//actualizar datos asociados
router.post('/:id/status', authorize('admin'), changeStatus);//cambia de activo a inactivo en asociados

export default router;