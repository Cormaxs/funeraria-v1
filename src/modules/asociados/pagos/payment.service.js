import Payment from './payment.model.js';
import Asociados from '../asociados.model.js';

export const registerPayment = async (paymentData) => {
  const { associateId, month, year } = paymentData;

  // 1. Verificación de existencia del asociado
  const associate = await Asociados.findById(associateId);
  if (!associate) throw new Error('El asociado no existe.');
  if (associate.status !== 'activo') throw new Error('No se pueden registrar pagos para asociados inactivos.');

  // 2. Verificación de Fecha Futura
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // JS meses son 0-11

  if (year > currentYear || (year === currentYear && month > currentMonth)) {
    throw new Error('No se pueden registrar pagos de meses futuros (ajuste de política interna).');
  }

  // 3. Verificación de Duplicidad (Evitar doble cobro)
  const existingPayment = await Payment.findOne({ associateId, month, year });
  if (existingPayment) {
    throw new Error(`El mes ${month}/${year} ya fue abonado el día ${existingPayment.paymentDate.toLocaleDateString()}.`);
  }

  // 4. Verificación de monto mínimo
  if (paymentData.amount <= 0) {
    throw new Error('El monto del pago debe ser mayor a 0.');
  }

  // Si pasa todas las validaciones, guardamos
  const newPayment = await Payment.create(paymentData);

  // Registrar en el historial del asociado para trazabilidad rápida
  associate.history.push({
    action: 'PAGO_REGISTRADO',
    details: `Cobro exitoso de la cuota ${month}/${year}.`
  });
  await associate.save();

  return newPayment;
};

export const getHistoryByAssociate = async (associateId) => {
  return await Payment.find({ associateId }).sort({ year: -1, month: -1 });
};