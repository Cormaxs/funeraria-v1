import * as authService from './auth.service.js';

export const registerUser = async (req, res) => {
  try {
    const result = await authService.register(req.body);
   // console.log("resivido -> ", result.user, result.token);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  // req.user viene inyectado por el middleware de protección
  res.json(req.user);
};

export const updateUser = async (req, res) => {
  try {
    const updated = await authService.update(req.params.id, req.body);
    res.json({ message: 'Usuario actualizado', updated });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await authService.remove(req.params.id);
    res.json({ message: `Usuario con id ${req.params.id} eliminado` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};