import * as paymentService from './payment.service.js';
import * as reportService from '../pagos/reports.service.js';

export const createPayment = async (req, res) => {
  
  try {
    const data = { 
      ...req.body, 
      userId: req.user.id // Trazabilidad: quién cobró
    };
    const payment = await paymentService.registerPayment(data);
    res.status(201).json(payment);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Este mes ya fue pagado por este asociado.' });
    }
    res.status(400).json({ message: error.message });
  }
};

export const getAssociatePayments = async (req, res) => {
  try {
    const history = await paymentService.getHistoryByAssociate(req.params.associateId);
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getPaymentsReport = async (req, res) => {
  try {
    // 1. Extraemos página y límite de la query (URL)
    // Usamos parseInt para asegurar que sean números
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    // 2. Llamamos al servicio pasando ambos parámetros
    // Desestructuramos para separar los pagos de la info de paginación
    const { payments, pagination } = await reportService.searchRecentPayments(page, limit);
    
    // 3. Obtenemos las estadísticas (diario, mensual, anual)
    const stats = await reportService.getRevenueStats();

    // 4. Enviamos la respuesta unificada
    res.json({
      ok: true,
      stats,             // Totales recaudados
      recentPayments: payments, // Lista de pagos de la página actual
      pagination         // Info para el frontend (totalItems, totalPages, etc.)
    });
  } catch (error) {
    console.error("Error en Reporte de Pagos:", error);
    res.status(500).json({ 
      ok: false, 
      message: "Error interno al generar el reporte" 
    });
  }
};