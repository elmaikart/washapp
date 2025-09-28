// src/app/page.tsx
"use client";

import React from "react";
import { Search } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-yellow-100 p-4 font-sans">
      {/* Título */}
      <h1 className="text-4xl font-bold text-center text-blue-900 mb-4">
        Bienvenido a WashApp
      </h1>

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

      {/* Servicios destacados */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Servicios</h2>
        <div className="grid grid-cols-2 gap-4 text-center">
          {[
            "Canasto de Ropa",
            "Acolchados",
            "Camperas",
            "Sábanas",
            "Toallas",
            "Manteles",
            "Cortinas",
            "Secado",
          ].map((servicio, i) => (
            <div
              key={i}
              className="rounded-lg border shadow bg-white overflow-hidden"
            >
              <div className="bg-blue-900 text-white py-2 font-semibold">
                {servicio}
              </div>
              <div className="p-6">🧺</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
