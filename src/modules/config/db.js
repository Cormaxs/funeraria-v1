import mongoose from 'mongoose';

import { MONGO_URI } from './env.js';
export const connectDB = async () => {

  try {
    console.log("MONGO_URI", MONGO_URI);
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error de conexión: ${error.message}`);
    process.exit(1);
  }
};