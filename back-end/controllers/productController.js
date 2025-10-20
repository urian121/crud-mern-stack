import Product from '../models/Product.js';

// Obtener todos los productos
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener productos',
      error: error.message
    });
  }
};

// Obtener producto por ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener producto',
      error: error.message
    });
  }
};

// Obtener productos por categoría
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: products.length,
      category,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener productos por categoría',
      error: error.message
    });
  }
};

// Crear nuevo producto
export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    
    res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear producto',
      error: error.message
    });
  }
};

// Actualizar producto
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(
      id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Producto actualizado exitosamente',
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar producto',
      error: error.message
    });
  }
};

// Eliminar producto
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Producto eliminado exitosamente',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar producto',
      error: error.message
    });
  }
};
