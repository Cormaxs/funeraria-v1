import jwt from 'jsonwebtoken';
import User from './user.model.js';
import { JWT_SECRET } from '../config/env.js';
export const protect = async (req, res, next) => {
  let token;

  // 1. Verificar si el token viene en los headers (Bearer Token)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Obtener el token del string "Bearer <token>"
      //console.log("token antes -> ", req.headers.authorization);
      token = req.headers.authorization.split(' ')[1];
     // console.log("token obtenido", token);
      // 2. Decodificar y verificar el token
      const decoded = jwt.verify(token, JWT_SECRET);

      // 3. Buscar el usuario y adjuntarlo a la petición (excluyendo el password)
      // Esto permite que 'req.user' esté disponible en todos los controladores protegidos
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
      }

      next();
    } catch (error) {
      console.error('Error en la validación del token:', error);
      return res.status(401).json({ message: 'No autorizado, token fallido' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'No autorizado, no hay token' });
  }
};

// Middleware para restringir por Roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `El rol '${req.user.role}' no tiene permiso para acceder a esta ruta` 
      });
    }
    next();
  };
};