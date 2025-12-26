import Product from './producto.model.js';
import Movement from './movimiento.model.js';


// Gestión del catálogo
export const createProduct = async (data) => await Product.create(data);
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