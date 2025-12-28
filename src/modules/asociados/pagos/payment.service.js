import Payment from './payment.model.js';
import Asociados from '../asociados.model.js';

export const registerPayment = async (paymentData) => {
  // Verificamos si el asociado existe
  const associate = await Asociados.findById(paymentData.associateId);
  if (!associate) throw new Error('Asociado no encontrado');

  const newPayment = await Payment.create(paymentData);

  // Opcional: Registrar en el 'history' del modelo Asociados que hubo un pago
  associate.history.push({
    action: 'Pago Registrado',
    details: `Pago de mes ${paymentData.month}/${paymentData.year} recibido.`
  });
  await associate.save();

  return newPayment;
};

export const getHistoryByAssociate = async (associateId) => {
  return await Payment.find({ associateId }).sort({ year: -1, month: -1 });
};