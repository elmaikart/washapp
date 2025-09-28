// src/app/servicios/page.tsx
"use client";

import React from "react";
import { Package, Search } from "lucide-react";

const services = [
  { label: "Canasto de Ropa" },
  { label: "Acolchados" },
  { label: "Camperas" },
  { label: "Sábanas" },
  { label: "Fundas" },
  { label: "Manteles" },
  { label: "Cortinas" },
  { label: "Secado" },
];

export default function ServiciosPage() {
  return (
    <div className="px-4 py-6 pb-28">
      {/* Buscador */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center w-full max-w-lg rounded-full overflow-hidden shadow bg-white">
         <input
          type="text"
          placeholder="¿Qué lavamos hoy?"
          className="flex-grow px-4 py-2 text-gray-700 rounded-l-full outline-none ring-0 focus:outline-none focus:ring-0"
          />
          <button className="bg-wash-primary hover:bg-[#001a2e] px-6 py-2 text-white font-semibold transition-all">
            Buscar
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
        <div className="pedido-card border-r border-gray-200">
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

      {/* Promo Bolso */}
      <div className="mt-6 p-4 border rounded-xl bg-white shadow-sm flex items-center gap-4">
        <img src="/icons/bolso.svg" alt="Bolso Promo" className="w-10 h-10" />
        <div>
          <p className="font-semibold">Promo Bolso oficial</p>
          <p className="text-sm text-gray-600">
            Para Canasto de Ropa, <strong>2x1</strong>
            <br />
            Con tu compra 20% descuento en próximo pedido
          </p>
        </div>
      </div>

      {/* Footer estilo app móvil */}
      <footer className="fixed bottom-0 left-0 right-0 bg-wash-primary text-white py-2 px-6 flex justify-between items-center shadow-inner z-50">
  <div className="flex flex-col items-center text-xs">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8h5a2 2 0 012 2v6a2 2 0 01-2 2h-3.5M13 16h1" />
    </svg>
    <span>Inicio</span>
  </div>
  <div className="flex flex-col items-center text-xs">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16h8M8 12h8m-7-4h6M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    <span>Actividades</span>
  </div>
  <div className="flex flex-col items-center text-xs">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A5 5 0 0112 15a5 5 0 016.879 2.804M12 12a5 5 0 100-10 5 5 0 000 10z" />
    </svg>
    <span>Cuenta</span>
  </div>
</footer>
  
    </div>
  );
  
}
