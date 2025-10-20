// Importar Express y controladores de productos
import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory
} from '../controllers/productController.js';

// Crear instancia del router de Express
const router = express.Router();

// ===== RUTAS CRUD DE PRODUCTOS =====

// GET /api/products - Obtener todos los productos del kiosko
router.get('/products', getAllProducts);

// GET /api/products/category/:category - Filtrar productos por categoría
// Ejemplo: /api/products/category/hamburguesas
router.get('/products/category/:category', getProductsByCategory);

// GET /api/products/:id - Obtener un producto específico por su ID
router.get('/products/:id', getProductById);

// POST /api/products - Crear un nuevo producto en el kiosko
// Requiere: name, price, category en el body
router.post('/products', createProduct);

// PUT /api/products/:id - Actualizar información de un producto existente
router.put('/products/:id', updateProduct);

// DELETE /api/products/:id - Eliminar un producto del kiosko
router.delete('/products/:id', deleteProduct);

// GET /api/ - Ruta de información y documentación de la API
router.get('/', (req, res) => {
  res.json({
    message: 'Kiosko API funcionando correctamente',
    version: '1.0.0',
    endpoints: {
      products: {
        getAll: 'GET /api/products',
        getById: 'GET /api/products/:id',
        getByCategory: 'GET /api/products/category/:category',
        create: 'POST /api/products',
        update: 'PUT /api/products/:id',
        delete: 'DELETE /api/products/:id'
      }
    }
  });
});

// Exportar el router para usar en app.js
export default router;