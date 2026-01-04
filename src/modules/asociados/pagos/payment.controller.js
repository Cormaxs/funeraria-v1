import * as paymentService from './payment.service.js';

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