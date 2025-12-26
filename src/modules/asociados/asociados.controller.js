import * as AsociadosService from './asociados.service.js';

export const getAssociates = async (req, res) => {
  try {
    const { type, status } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (status) filter.status = status;

    const associates = await AsociadosService.getAll(filter);
    res.json(associates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAssociate = async (req, res) => {
  try {
    // Tomamos el userId directamente del middleware 'protect'
    const data = { ...req.body, userId: req.user.id };
    const nuevo = await AsociadosService.create(data);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateAssociate = async (req, res) => {
  try {
    const actualizado = await AsociadosService.update(req.params.id, req.body);
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



export const changeStatus = async (req, res) => {
  try {
    const actualizado = await AsociadosService.toggleStatus(req.params.id);
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};