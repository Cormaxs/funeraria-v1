import mongoose from 'mongoose';

const associateSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  fullName: { type: String, required: true },
  documentId: { type: String, required: true, unique: true },
  type: { 
    type: String, 
    enum: ['proveedor', 'cliente_vip', 'socio_activo'], 
    required: true 
  },
  status: { type: String, enum: ['activo', 'inactivo'], default: 'activo' },
  history: [{
    action: String,
    date: { type: Date, default: Date.now },
    details: String
  }]
}, { timestamps: true });

associateSchema.index({ documentId: 1, status: 1 });

export default mongoose.model('Asociados', associateSchema);