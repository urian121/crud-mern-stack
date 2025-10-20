import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Configuración de conexión
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/crud-mern-stack';

// Opciones de conexión
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Función para conectar a MongoDB
export const connectDB = async () => {
  try {
    // Conectar a la base de datos
    await mongoose.connect(MONGODB_URI, options);
    
    console.log('✅ MongoDB conectado exitosamente');
    console.log(`📊 Base de datos: ${mongoose.connection.name}`);
    
    // Manejar eventos de conexión
    mongoose.connection.on('error', (err) => {
      console.error('❌ Error de MongoDB:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB desconectado');
    });

  } catch (error) {
    console.error('❌ Error al conectar con MongoDB:', error.message);
    process.exit(1);
  }
};

// Función para desconectar de MongoDB
export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('✅ MongoDB desconectado exitosamente');
  } catch (error) {
    console.error('❌ Error al desconectar MongoDB:', error.message);
  }
};

// Exportar por defecto la función de conexión
export default connectDB;