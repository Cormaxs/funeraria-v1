import Asociados from './asociados.model.js';

export const getAll = async (filter = {}) => {
  return await Asociados.find(filter).populate('userId', 'email role');
};

export const getById = async (id) => {
  return await Asociados.findById(id);
};

export const create = async (data) => {
  // Añadimos una entrada inicial al historial
  const AsociadosData = {
    ...data,
    history: [{ action: 'Creación', details: 'Registro inicial de asociado' }]
  };
  return await Asociados.create(AsociadosData);
};

export const update = async (id, data) => {
  // Opcional: Podrías empujar (push) un nuevo evento al historial aquí
  const updateData = {
    ...data,
    $push: { 
      history: { 
        action: 'Actualización', 
        details: 'Cambio de datos generales' 
      } 
    }
  };
  return await Asociados.findByIdAndUpdate(id, updateData, { new: true });
};

export const toggleStatus = async (id) => {
  const associate = await Asociados.findById(id);
  if (!associate) throw new Error('Asociado no encontrado');

  associate.status = associate.status === 'activo' ? 'inactivo' : 'activo';
  
  associate.history.push({
    action: 'Cambio de Estado',
    details: `Estado cambiado a ${associate.status}`
  });

  return await associate.save();
};