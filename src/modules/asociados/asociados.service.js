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



export const searchAsociados = async (filters) => {
  const { nombre, dni, status, fechaInicio, fechaFin, page = 1, limit = 10 } = filters;
  const query = {};

  // Filtro por Nombre (Insensible a mayúsculas/minúsculas)
  if (nombre) {
    query.fullName = { $regex: nombre, $options: 'i' };
  }

  // Filtro por DNI (Búsqueda parcial)
  if (dni) {
    query.documentId = { $regex: dni, $options: 'i' };
  }

  // Filtro por Estado (activo/inactivo)
  if (status) {
    query.status = status;
  }

  // Filtro por Rango de Fecha de Creación
  if (fechaInicio || fechaFin) {
    query.createdAt = {};
    if (fechaInicio) query.createdAt.$gte = new Date(fechaInicio);
    if (fechaFin) query.createdAt.$lte = new Date(fechaFin);
  }

  const skip = (page - 1) * limit;

  const [total, asociados] = await Promise.all([
    Asociados.countDocuments(query),
    Asociados.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
  ]);

  return {
    asociados,
    pagination: {
      totalItems: total,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page)
    }
  };
};