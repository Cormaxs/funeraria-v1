import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  associateId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Referencia exacta a tu modelo
    required: true 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Asociados', 
    required: true 
  },
  month: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 12 
  },
  year: { 
    type: Number, 
    required: true 
  },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  notes: String
}, { timestamps: true });

// Evita que se registre el mismo mes/año para el mismo asociado dos veces
paymentSchema.index({ associateId: 1, month: 1, year: 1 }, { unique: true });

export default mongoose.model('Payment', paymentSchema);