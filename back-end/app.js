import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Importar conexión a BD y rutas
import connectDB, { disconnectDB } from './db/connect.js';
import router from './routes/router.js';

// Configurar variables de entorno
dotenv.config();

// Configurar servidor
const app = express(); // Instancia de express
const PORT = process.env.PORT || 5000; // Puerto de la aplicación

// Middlewares
app.use(cors()); // Middleware para permitir conexiones desde otros dominios
app.use(express.json()); // Middleware para parsear el cuerpo de las peticiones
app.use(express.urlencoded({ extended: true })); // Middleware para parsear el cuerpo de las peticiones

// Rutas
app.use('/api', router);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    message: 'Servidor CRUD MERN Stack funcionando correctamente',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      orders: '/api/orders'
    }
  });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal'
  });
});

// Middleware para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    message: 'Ruta no encontrada',
    path: req.originalUrl
  });
});

// Conectar a MongoDB y iniciar servidor
const startServer = async () => {
  try {
    // Conectar a MongoDB usando la función modular
    await connectDB();

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
      console.log(`📱 URL: http://localhost:${PORT}`);
      console.log(`🔗 API Base: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

// Manejar cierre graceful del servidor
process.on('SIGTERM', async () => {
  console.log('🛑 Cerrando servidor...');
  await disconnectDB();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 Cerrando servidor...');
  await disconnectDB();
  process.exit(0);
});

// Iniciar el servidor
startServer();
