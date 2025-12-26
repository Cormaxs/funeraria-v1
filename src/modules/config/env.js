import dotenv from 'dotenv';
dotenv.config(); // Esto carga las variables de inmediato

export const {
  PORT,
  MONGO_URI,
  JWT_SECRET,
  NODE_ENV
} = process.env;