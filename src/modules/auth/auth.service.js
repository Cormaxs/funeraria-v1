import User from './user.model.js';
import generateToken from "../utils/generate-token.js";


export const register = async (userData) => {
  const { email, password, role } = userData;
  //console.log("datos ->", email, password, role);
  const userExists = await User.findOne({ email });
  //console.log("userExists -> ", userExists)
  if (userExists) throw new Error('El usuario ya existe');

  const user = await User.create({ email, password, role });
  //console.log("user creado -> ", user);
  return {
    user: { id: user._id, email: user.email, role: user.role },
    token: generateToken(user._id)
  };
};

export const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (user && (await user.comparePassword(password))) { // Asumiendo el método comparePassword en el modelo
    return {
      user: { id: user._id, email: user.email, role: user.role },
      token: generateToken(user._id)
    };
  }
  throw new Error('Credenciales inválidas');
};

export const update = async (id, data) => {
  // Evitamos que actualicen el password por aquí para mantener el hash seguro
  const { password, ...updateData } = data;
  return await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
};

export const remove = async (id) => {
  return await User.findByIdAndDelete(id);
};