// src/app/servicios/page.tsx
"use client";

import React from "react";
import { Package, Search } from "lucide-react";

const services = [
  { label: "Canasto de Ropa" },
  { label: "Acolchados" },
  { label: "Camperas" },
  { label: "Sábanas" },
  { label: "Toallas" },
  { label: "Manteles" },
  { label: "Cortinas" },
  { label: "Secado" },
];

export default function ServiciosPage() {
  return (
    <div className="px-4 py-6">
      {/* Buscador */}
      <div className="flex justify-center mb-6">
        <div className="flex w-full max-w-lg bg-white shadow rounded-full overflow-hidden">
          <input
            type="text"
            placeholder="¿Qué lavamos hoy?"
            className="flex-grow px-4 py-2 text-gray-700 focus:outline-none"
          />
          <button className="bg-wash-primary text-white px-4 flex items-center justify-center">
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* Servicios */}
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Servicios</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <Package className="w-8 h-8 text-wash-primary" />
            <h3>{service.label}</h3>
          </div>
        ))}
      </div>

      {/* Pedidos Programados */}
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Pedidos Programados
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="pedido-card">
          <h4>Retiros</h4>
          <p>Orden Nº R107</p>
          <p>Martes, 19 Octubre</p>
          <p>9:30 a 11:30 hs</p>
          <p>Av. Los Álamos 2098</p>
          <p>Dpto: 5C</p>
        </div>
        <div className="pedido-card">
          <h4>Devoluciones</h4>
          <p>Orden Nº 107</p>
          <p>Miércoles, 20 Octubre</p>
          <p>17:30 a 19:30 hs</p>
          <p>Jujuy 572, dpto 5B</p>
        </div>
      </div>
    </div>
  );
}
