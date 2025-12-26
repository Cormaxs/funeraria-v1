import * as inventoryService from './inventario.service.js';

export const addProduct = async (req, res) => {
  try {
    const product = await inventoryService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getInventory = async (req, res) => {
  try {
    const products = await inventoryService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createMovement = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id; // Del middleware de auth
    const result = await inventoryService.registerMovement(productId, req.body, userId);
    
    res.json({
      message: 'Movimiento registrado',
      product: result.product,
      lowStockAlert: result.alert ? "¡Atención! Stock por debajo del mínimo" : null
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getProductById = async (req, res) => {
  try {
    const product = await inventoryService.getById(req.params.id);
    if (!product) return res.status(404).json({ message: 'No encontrado' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updated = await inventoryService.update(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await inventoryService.remove(req.params.id);
    res.json({ message: 'Producto eliminado del catálogo' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getAllMovements = async (req, res) => {
  try {
    // Si pasas ?productId=ID en la URL, filtrará solo ese producto
    const { productId } = req.query;
    const filter = productId ? { productId } : {};
    
    const movements = await inventoryService.getMovements(filter);
    res.json(movements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};