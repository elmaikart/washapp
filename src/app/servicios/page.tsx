"use client";

import React from "react";
import Image from "next/image";
import { Package, Home, ShoppingCart, ListChecks, User } from "lucide-react";

const services = [
  { label: "Canasto de Ropa", icon: <Package className="w-8 h-8" /> },
  { label: "Acolchados", icon: <Package className="w-8 h-8" /> },
  { label: "Camperas", icon: <Package className="w-8 h-8" /> },
  { label: "Sábanas", icon: <Package className="w-8 h-8" /> },
  { label: "Toallas", icon: <Package className="w-8 h-8" /> },
  { label: "Manteles", icon: <Package className="w-8 h-8" /> },
  { label: "Cortinas", icon: <Package className="w-8 h-8" /> },
  { label: "Secado", icon: <Package className="w-8 h-8" /> },
];

export default function ServiciosPage() {
  return (
    <div className="bg-[#FFF9E6] min-h-screen flex flex-col">
      {/* CONTENIDO */}
      <div className="flex-1 p-4 pb-24">
        {/* Barra de búsqueda */}
        <div className="flex items-center gap-2 mb-6">
          <input
            type="text"
            placeholder="¿Qué lavamos hoy?"
            className="flex-1 px-4 py-2 rounded-full border border-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-900 text-white px-4 py-2 rounded-full">
            Buscar
          </button>
        </div>

        {/* Servicios */}
        <h2 className="text-lg font-bold mb-4">Servicios</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {services.map((service, index) => (
            <button
              key={index}
              className="flex flex-col items-center justify-center border rounded-lg shadow bg-white"
            >
              <div className="w-full bg-blue-900 text-white text-center py-1 rounded-t-lg">
                <span className="text-sm font-semibold">{service.label}</span>
              </div>
              <div className="flex justify-center items-center p-4">
                {service.icon}
              </div>
            </button>
          ))}
        </div>

        {/* Pedidos Programados */}
        <h2 className="text-lg font-bold mb-4">Pedidos Programados</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-lg shadow bg-white">
            <div className="w-full bg-blue-900 text-white text-center py-1 rounded-t-lg">
              <h3 className="font-bold">Retiros</h3>
            </div>
            <div className="p-4 text-sm text-gray-800">
              <p>Orden Nº R107</p>
              <p>Martes, 19 Octubre</p>
              <p>9:30 a 11:30 hs</p>
              <p>Av. Los Álamos 2098</p>
              <p>Dpto: 5C</p>
            </div>
          </div>

          <div className="border rounded-lg shadow bg-white">
            <div className="w-full bg-blue-900 text-white text-center py-1 rounded-t-lg">
              <h3 className="font-bold">Devoluciones</h3>
            </div>
            <div className="p-4 text-sm text-gray-800">
              <p>Orden Nº 107</p>
              <p>Miércoles, 20 Octubre</p>
              <p>17:30 a 19:30 hs</p>
              <p>Jujuy 572, dpto 5B</p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md flex justify-around py-2">
        <button className="flex flex-col items-center text-blue-900">
          <Home className="w-6 h-6" />
          <span className="text-xs">Inicio</span>
        </button>
        <button className="flex flex-col items-center text-blue-900">
          <Package className="w-6 h-6" />
          <span className="text-xs">Servicios</span>
        </button>
        <button className="flex flex-col items-center text-blue-900">
          <ShoppingCart className="w-6 h-6" />
          <span className="text-xs">Carrito</span>
        </button>
        <button className="flex flex-col items-center text-blue-900">
          <ListChecks className="w-6 h-6" />
          <span className="text-xs">Actividades</span>
        </button>
        <button className="flex flex-col items-center text-blue-900">
          <User className="w-6 h-6" />
          <span className="text-xs">Cuenta</span>
        </button>
      </footer>
    </div>
  );
}
