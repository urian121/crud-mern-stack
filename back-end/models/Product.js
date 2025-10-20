import mongoose from 'mongoose';

// Esquema del producto
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del producto es requerido'],
    trim: true,
    minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'La descripción no puede exceder 500 caracteres']
  },
  
  price: {
    type: Number,
    required: [true, 'El precio es requerido'],
    min: [0, 'El precio debe ser mayor o igual a 0']
  },
  
  category: {
    type: String,
    required: [true, 'La categoría es requerida'],
    enum: {
      values: [
        'hamburguesas',
        'perros-calientes', 
        'bebidas',
        'cafe',
        'te',
        'snacks',
        'postres'
      ],
      message: 'Categoría no válida'
    }
  },
  
  available: {
    type: Boolean,
    default: true
  },
  
  image: {
    type: String,
    trim: true
  },
  
  ingredients: [{
    type: String,
    trim: true
  }],
  
  preparationTime: {
    type: Number,
    min: [0, 'El tiempo de preparación debe ser mayor o igual a 0']
  }
}, {
  timestamps: true, // Agrega createdAt y updatedAt automáticamente
  versionKey: false // Elimina el campo __v
});

// Índices para mejorar el rendimiento
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ available: 1 });

// Método para obtener productos disponibles
productSchema.statics.getAvailableProducts = function() {
  return this.find({ available: true });
};

// Método para obtener productos por categoría
productSchema.statics.getByCategory = function(category) {
  return this.find({ category, available: true });
};

// Método virtual para formatear el precio
productSchema.virtual('formattedPrice').get(function() {
  return `$${this.price.toFixed(2)}`;
});

// Configurar JSON para incluir virtuals
productSchema.set('toJSON', { virtuals: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
