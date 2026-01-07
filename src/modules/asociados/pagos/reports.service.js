import Payment from './payment.model.js';
import Asociados from '../asociados.model.js'; // <-- AGREGAR ESTA LÍNEA

export const searchRecentPayments = async (page = 1, limit = 10) => {
    // Calculamos cuántos documentos saltar
    const skip = (page - 1) * limit;
  
    // Ejecutamos la búsqueda y el conteo total en paralelo para ahorrar tiempo
    const [total, payments] = await Promise.all([
      Payment.countDocuments(),
      Payment.find()
        .populate({
            path: 'associateId',
            select: 'fullName documentId type status',
            model: Asociados 
        })
        .populate('userId', 'email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
    ]);
  
    const mappedPayments = payments.map(p => ({
      id: p._id,
      fecha: p.paymentDate,
      monto: p.amount,
      periodo: `${p.month}/${p.year}`,
      asociado: {
        nombre: p.associateId?.fullName || "No asignado (ID no existe)",
        documento: p.associateId?.documentId || "N/A",
        tipo: p.associateId?.type || "N/A"
      },
      registradoPor: p.userId?.email || "Sistema"
    }));
  
    return {
      payments: mappedPayments,
      pagination: {
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    };
  };
/**
 * 2. Estadísticas de recaudación sin _id nulos
 */
export const getRevenueStats = async () => {
  const now = new Date();
  
  // Definir inicios de periodos
  const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  // Consultas en paralelo
  const [daily, monthly, yearly] = await Promise.all([
    Payment.aggregate([
      { $match: { createdAt: { $gte: startOfDay } } },
      { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } }
    ]),
    Payment.aggregate([
      { $match: { createdAt: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } }
    ]),
    Payment.aggregate([
      { $match: { createdAt: { $gte: startOfYear } } },
      { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } }
    ])
  ]);

  // Función interna para evitar repetir la lógica de limpieza
  const formatResult = (aggResult) => ({
    total: aggResult[0]?.total || 0,
    cantidad: aggResult[0]?.count || 0
  });

  return {
    hoy: formatResult(daily),
    mes: formatResult(monthly),
    anio: formatResult(yearly)
  };
};

/**
 * 3. Ejemplo de cómo se vería tu Ruta/Controlador principal
 * que une ambos resultados para el Dashboard
 */
export const getDashboardData = async (req, res) => {
  try {
    const [stats, recentPayments] = await Promise.all([
      getRevenueStats(),
      searchRecentPayments(10) // Traemos solo los últimos 10 para el dashboard
    ]);

    res.json({
      ok: true,
      stats,
      recentPayments
    });
  } catch (error) {
    console.error("Error en Dashboard:", error);
    res.status(500).json({
      ok: false,
      message: "Error al obtener datos del servidor"
    });
  }
};