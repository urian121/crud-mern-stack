function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Header del Kiosko */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">🍔 Kiosko API</h1>
            <div className="text-sm text-gray-500">
              Sistema de Gestión de Productos
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Grid de categorías */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Hamburguesas */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">🍔</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Hamburguesas
            </h3>
            <p className="text-gray-600">Deliciosas hamburguesas y combos</p>
          </div>

          {/* Bebidas */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">🥤</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Bebidas
            </h3>
            <p className="text-gray-600">Refrescos, jugos y agua</p>
          </div>

          {/* Café */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">☕</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Café</h3>
            <p className="text-gray-600">Café, capuchino y expreso</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
