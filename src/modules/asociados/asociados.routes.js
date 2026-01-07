import express from 'express';
import { protect, authorize } from '../auth/auth.middleware.js';
import { 
  getAssociates, 
  createAssociate, 
  updateAssociate, 
  changeStatus, 
  getAsociadosBusqueda
} from './asociados.controller.js';
import { createPayment, getAssociatePayments, getPaymentsReport } from './pagos/payment.controller.js';//pagos


const router = express.Router();

router.use(protect); // Todas requieren Token

router.get('/', getAssociates);//todos los asociados
router.post('/', createAssociate);//crea un asociado, referenciando al usuario de users(admin)
router.put('/:id', updateAssociate);//actualizar datos asociados
router.post('/:id/status', authorize('admin'), changeStatus);//cambia de activo a inactivo en asociados




//pagos de asociados

// Registrar un pago (Solo Admin o Socio)
router.post('/payment', protect, authorize('admin', 'socio'), createPayment);

// Ver historial de un asociado específico
router.get('/payment/:associateId', protect, getAssociatePayments);
router.get('/payment/reports/revenue', protect, getPaymentsReport);

// Ruta de búsqueda avanzada
router.get('/search', protect, authorize('admin', 'socio'), getAsociadosBusqueda);

export default router;





