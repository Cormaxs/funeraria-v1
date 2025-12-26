import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  description: { type: String },
  category: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, default: 0 },
  minStock: { type: Number, default: 5 }, // Alerta de stock bajo
  status: { type: String, enum: ['activo', 'inactivo'], default: 'activo' }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);