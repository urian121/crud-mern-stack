# 🏪 Kiosko API - Sistema de Gestión de Productos

Una API REST completa para gestionar productos de un kiosko, incluyendo hamburguesas, perros calientes, bebidas, café y más.

## 🍔 Características

- **CRUD completo** de productos
- **Categorización** por tipo de producto
- **Gestión de precios** y disponibilidad
- **API REST** con Express.js y MongoDB
- **Validación** de datos
- **Manejo de errores** robusto

## 🚀 Tecnologías

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **CORS** - Manejo de peticiones cross-origin
- **dotenv** - Variables de entorno

## 📦 Instalación

```bash
# Clonar el repositorio
git clone <tu-repositorio>

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env-example .env

# Iniciar servidor
npm start
```

## 🔧 Configuración

Crea un archivo `.env` con:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kiosko-api
NODE_ENV=development
```

## 📋 Endpoints de la API

### Productos

| Método | Endpoint            | Descripción                 |
| ------ | ------------------- | --------------------------- |
| GET    | `/api/products`     | Obtener todos los productos |
| GET    | `/api/products/:id` | Obtener producto por ID     |
| POST   | `/api/products`     | Crear nuevo producto        |
| PUT    | `/api/products/:id` | Actualizar producto         |
| DELETE | `/api/products/:id` | Eliminar producto           |

### Ejemplo de Producto

```json
{
  "name": "Hamburguesa Clásica",
  "description": "Hamburguesa con carne, lechuga, tomate y queso",
  "price": 8.50,
  "category": "hamburguesas",
  "available": true,
  "image": "https://ejemplo.com/hamburguesa.jpg"
}
```

## 🏷️ Categorías de Productos

- **hamburguesas** - Hamburguesas y combos
- **perros-calientes** - Hot dogs y variaciones
- **bebidas** - Refrescos, jugos, agua
- **cafe** - Café, capuchino, expreso
- **te** - Tés e infusiones
- **snacks** - Papas, nachos, dulces
- **postres** - Helados, pasteles, galletas

## 🛠️ Scripts Disponibles

```bash
# Desarrollo con auto-reload
npm run dev

# Producción
npm start

# Verificar sintaxis
npm run lint
```

## 📁 Estructura del Proyecto

```
back-end/
├── app.js              # Servidor principal
├── db/
│   └── connect.js      # Conexión a MongoDB
├── models/
│   └── Product.js      # Modelo de productos
├── controllers/
│   └── productController.js
├── routes/
│   └── router.js       # Rutas de la API
└── package.json
```

## 🔒 Validaciones

- **Nombre**: Requerido, mínimo 3 caracteres
- **Precio**: Requerido, mayor a 0
- **Categoría**: Debe ser una categoría válida
- **Disponibilidad**: Boolean (true/false)

## 🌐 Uso

```javascript
// Obtener todos los productos
fetch('http://localhost:5000/api/products')

// Crear nuevo producto
fetch('http://localhost:5000/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Café Americano',
    price: 2.50,
    category: 'cafe',
    available: true
  })
})
```

## 🚀 Despliegue

El proyecto está configurado para desplegarse en Vercel con el archivo `vercel.json`.

## 📝 Licencia

ISC - Urian Viera

---

**¡Disfruta gestionando tu kiosko! 🍔☕**