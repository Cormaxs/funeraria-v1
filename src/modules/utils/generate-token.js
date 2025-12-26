import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config/env.js';
export default function generateToken (id) {

  return jwt.sign({ id },JWT_SECRET, {
    expiresIn: '24h', // Tiempo de vida del token para el MVP
  });
};