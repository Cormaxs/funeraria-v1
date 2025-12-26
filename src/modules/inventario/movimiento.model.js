import mongoose from 'mongoose';

const movementSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Trazabilidad
  type: { type: String, enum: ['entrada', 'salida'], required: true },
  reason: { 
    type: String, 
    enum: ['compra', 'venta', 'devolucion', 'merma', 'ajuste'], 
    required: true 
  },
  quantity: { type: Number, required: true },
  previousStock: { type: Number, required: true },
  currentStock: { type: Number, required: true },
  notes: String
}, { timestamps: true });

export default mongoose.model('Movement', movementSchema);