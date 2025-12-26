import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'socio', 'usuario'], 
    default: 'usuario' 
  },
  resetToken: String,
  expireToken: Date
}, { timestamps: true });

// --- Hash de password antes de guardar (Sintaxis simplificada) ---
userSchema.pre('save', async function() { 
  // Si no se modificó el password, terminamos la ejecución
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  // Al ser async, no necesitamos llamar a next()
});

// --- Método para comparar contraseñas ---
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);