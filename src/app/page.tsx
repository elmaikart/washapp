// src/app/page.tsx

import React from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-yellow-100 p-4 font-sans">
      <h1 className="text-4xl font-bold text-center text-blue-900 mb-4">WashApp</h1>

      {/* Buscador */}
      <div className="flex items-center bg-white rounded-full shadow p-2 mb-6 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="¿Qué lavamos hoy?"
          className="flex-grow px-4 py-2 text-gray-700 focus:outline-none rounded-l-full"
        />
        <button className="bg-blue-900 text-white px-4 py-2 rounded-full">
          <Search size={20} />
        </button>
      </div>

      {/* Servicios */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Servicios</h2>
        <div className="grid grid-cols-4 gap-3 text-center">
          {[
            "Canasto de Ropa",
            "Acolchados",
            "Camperas",
            "Sábanas",
            "Toallas",
            "Manteles",
            "Cortinas",
            "Secado",
          ].map((servicio) => (
            <div
              key={servicio}
              className="bg-white rounded-lg p-2 shadow text-sm font-medium text-gray-800"
            >
              <div className="text-3xl mb-1">🧺</div>
              {servicio}
            </div>
          ))}
        </div>
      </section>

      {/* Pedidos Programados */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Pedidos Programados</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Retiros */}
          <div className="bg-white p-3 rounded shadow text-sm text-gray-700">
            <h3 className="font-bold mb-1">Retiros</h3>
            <p>Orden Nº R107</p>
            <p>Martes, 19 Octubre</p>
            <hr className="my-2" />
            <p>9:30 a 11:30 hs</p>
            <p>Av. Los Álamos 2098</p>
            <p>Dpto: 5C</p>
          </div>
          {/* Devoluciones */}
          <div className="bg-white p-3 rounded shadow text-sm text-gray-700">
            <h3 className="font-bold mb-1">Devoluciones</h3>
            <p>Orden Nº 107</p>
            <p>Miércoles, 20 Octubre</p>
            <hr className="my-2" />
            <p>17:30 a 19:30 hs</p>
            <p>Jujuy 572, dpto 5B</p>
          </div>
        </div>
      </section>

      {/* Promoción */}
      <section className="bg-blue-100 p-4 rounded-lg shadow text-sm text-blue-900 mb-20">
        <p className="font-semibold mb-1">🎒 Promo Bolso Oficial</p>
        <p>para Canasto de Ropa, <strong>2x1</strong></p>
        <p className="text-xs text-gray-700">Con tu compra 20% de descuento en tu próximo pedido</p>
      </section>

      {/* Footer tipo navegación */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around py-2 border-t text-sm text-blue-900">
        {["Inicio", "Servicios", "Carrito", "Actividades", "Cuenta"].map((item) => (
          <Link href="#" key={item} className="flex flex-col items-center">
            <div className="text-xl">📌</div>
            {item}
          </Link>
        ))}
      </nav>
    </main>
  );
}
