import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8000/api/products';

const CATEGORY_ICONS = {
  'hamburguesas': '🍔',
  'perros-calientes': '🌭',
  'bebidas': '🥤',
  'cafe': '☕',
  'te': '🍵',
  'snacks': '🍿',
  'postres': '🍰',
};

const CATEGORIES = ['hamburguesas', 'perros-calientes', 'bebidas', 'cafe', 'te', 'snacks', 'postres'];

const emptyForm = { name: '', price: '', category: 'hamburguesas', description: '' };

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      setError(null);
      const res = await fetch(API_URL);
      const data = await res.json();
      setProducts(data.data || []);
    } catch {
      setError('No se pudo conectar con el servidor. Verificá que el backend esté corriendo.');
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, price: Number(form.price) }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Error desconocido');
      }
      setForm(emptyForm);
      setEditingId(null);
      fetchProducts(true);
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este producto?')) return;
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchProducts(true);
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <header className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">🍔 Kiosko API</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6 items-start">

          {/* Formulario — izquierda, ancho fijo */}
          <div className="w-96 shrink-0 bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {editingId ? 'Editar producto' : 'Agregar producto'}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Nombre *"
                required
                minLength={3}
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                placeholder="Precio *"
                required
                min={0}
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Descripción (opcional)"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="flex justify-end gap-2">
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors text-sm"
                  >
                    Cancelar
                  </button>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors font-medium text-sm hover:cursor-pointer"
                >
                  {submitting ? 'Guardando...' : editingId ? 'Guardar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>

          {/* Lista de productos — derecha, scroll vertical */}
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Productos {!loading && `(${products.length})`}
            </h2>

            <div className="h-[calc(100vh-12rem)] overflow-y-auto pr-1">

              {loading && <p className="text-gray-500 text-center pt-16">Cargando...</p>}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-center">
                  {error}
                </div>
              )}

              {!loading && !error && products.length === 0 && (
                <p className="text-gray-500 text-center pt-16">No hay productos. ¡Crea el primero!</p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {products.map(product => (
                  <div
                    key={product._id}
                    className={`rounded-lg p-5 transition-colors ${editingId === product._id ? 'bg-amber-50 ring-2 ring-amber-300' : 'bg-white'}`}
                  >
                    <div className="text-4xl mb-3">{CATEGORY_ICONS[product.category] || '📦'}</div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                      <span className="text-lg font-bold text-green-600">${product.price}</span>
                    </div>
                    <p className="text-xs text-gray-400 capitalize mb-1">{product.category}</p>
                    {product.description && (
                      <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                    )}
                    <div className="flex justify-end gap-2 mt-3">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-xs px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors hover:cursor-pointer"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-xs px-3 py-1 rounded border border-red-300 text-red-500 hover:bg-red-50 transition-colors  hover:cursor-pointer"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
