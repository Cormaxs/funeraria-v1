import Product from './producto.model.js';
import Movement from './movimiento.model.js';


// Gestión del catálogo
export const createProduct = async (data) =>  {console.log("data", data); await Product.create(data);}
export const getAllProducts =  async (filter = {}) => {
  return await Product.find(filter).sort({ createdAt: -1 });
};

// Control de Stock con Transacciones (Atomicidad)
export const registerMovement = async (productId, movementData, userId) => {
  // Quitamos la sesión y la transacción
  const product = await Product.findById(productId);
  if (!product) throw new Error('Producto no encontrado');

  const { type, quantity, reason } = movementData;
  const prevStock = product.stock;
  const newStock = type === 'salida' ? prevStock - quantity : prevStock + quantity;

  if (type === 'salida' && newStock < 0) throw new Error('Stock insuficiente');

  // Actualización directa
  product.stock = newStock;
  await product.save();

  await Movement.create({
    productId, userId, type, reason, quantity,
    previousStock: prevStock, currentStock: newStock
  });

  return { product, alert: newStock <= product.minStock };
};

// Obtener uno por ID
export const getById = async (id) => {
  return await Product.findById(id);
};

// Actualizar datos básicos (No stock, para eso está el movimiento)
export const update = async (id, updateData) => {
  return await Product.findByIdAndUpdate(id, updateData, { new: true });
};

// Eliminar producto
export const remove = async (id) => {
  return await Product.findByIdAndDelete(id);
};

export const getMovements = async (filter = {}) => {
  return await Movement.find(filter)
    .populate('productId', 'name sku') // Trae nombre y sku del producto
    .populate('userId', 'email role')   // Trae quien hizo el movimiento
    .sort({ createdAt: -1 });           // Los más recientes primero
};


export const searchProducts = async (filters) => {
  const { nombre, sku, categoria, status, stockMax, fechaInicio, fechaFin, page = 1, limit = 10 } = filters;
  const query = {};

  // Búsqueda por Nombre o SKU (Regex para búsqueda parcial)
  if (nombre) query.name = { $regex: nombre, $options: 'i' };
  if (sku) query.sku = { $regex: sku, $options: 'i' };

  // Filtro exacto por Categoría
  if (categoria) query.category = categoria;

  // Filtro por Estado (activo/inactivo)
  if (status) query.status = status;

  // Filtro de Stock (Productos con stock menor o igual a X)
  if (stockMax) {
    query.stock = { $lte: Number(stockMax) };
  }

  // Filtro por Rango de Fecha de creación
  if (fechaInicio || fechaFin) {
    query.createdAt = {};
    if (fechaInicio) query.createdAt.$gte = new Date(fechaInicio);
    if (fechaFin) query.createdAt.$lte = new Date(fechaFin);
  }

  const skip = (page - 1) * limit;

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
  ]);

  return {
    products,
    pagination: {
      totalItems: total,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      limit: Number(limit)
    }
  };
};