"use client";

import React from "react";
import Input from "@/components/input";
import {
  ShoppingBasket,
  Layers,
  Shirt,
  FoldVertical,
  Package,
  LayoutGrid,
  PanelBottomClose,
  Fan,
} from "lucide-react";

// Lista de servicios
const services = [
  "Canasto de Ropa",
  "Acolchados",
  "Camperas",
  "Sábanas",
  "Fundas",
  "Manteles",
  "Cortinas",
  "Secado",
  "Alfombras",
];

// Mapeo de iconos según el servicio
const iconsMap: Record<string, JSX.Element> = {
  "Canasto de Ropa": <ShoppingBasket className="w-16 h-16 text-wash-primary" />,
  Acolchados: <Layers className="w-16 h-16 text-wash-primary" />,
  Camperas: <Shirt className="w-16 h-16 text-wash-primary" />,
  Sábanas: <FoldVertical className="w-16 h-16 text-wash-primary" />,
  Fundas: <Package className="w-16 h-16 text-wash-primary" />,
  Manteles: <LayoutGrid className="w-16 h-16 text-wash-primary" />,
  Cortinas: <PanelBottomClose className="w-16 h-16 text-wash-primary" />,
  Secado: <Fan className="w-16 h-16 text-wash-primary" />,
  Alfombras: <Layers className="w-16 h-16 text-wash-primary" />, // temporal
};

export default function InicioPage() {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 pb-20">
      {/* pb-20 para dejar espacio al footer */}

      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-wash-primary mt-6 mb-4 text-left">WashApp</h1>
      </div>

      <div className="flex items-center w-full max-w-md bg-white rounded-full shadow px-4 py-2 gap-2 mb-6">
        <Input
          type="text"
          placeholder="¿Qué lavamos hoy?"
          className="flex-grow border-none focus:ring-0"
        />
        <button className="bg-wash-primary text-white font-semibold px-4 py-1 rounded-full text-sm hover:bg-blue-900 transition">
          Buscar
        </button>
      </div>

      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4 text-left">Servicios</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto p-2">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow hover:shadow-md transition"
            >
              <div className="flex flex-col justify-between items-center h-full pt-4 pb-2">
                {iconsMap[service] ?? (
                  <Package className="w-16 h-16 text-wash-primary mb-4" />
                )}
                <span className="text-sm font-semibold text-center mt-3">{service}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="w-full max-w-4xl mt-10">
        <h2 className="text-lg font-semibold mb-4 text-left">Actividades Programadas</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="text-md font-bold text-wash-primary mb-1">Retiro Programado</h3>
            <p className="text-sm text-gray-700">Hoy,Miér.25 Sep. Entre:10:00hs y 13:00hs</p>
            <p className="text-sm text-gray-700">1 Canasto de Ropa Blanco Confort </p>
            <p className="text-sm text-gray-500 mt-1">Estado: Retirado</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="text-md font-bold text-wash-primary mb-1">Devolución Programada</h3>
            <p className="text-sm text-gray-700">Mañana, Jue.26 Sep. Entre: 13:00hs y 18:00hs</p>
            <p className="text-sm text-gray-700">1 Canasto de Ropa Blanco Confort</p>
            <p className="text-sm text-gray-500 mt-1">Estado: En camino</p>
          </div>
        </div>
      </section>

      {/* Este espacio se deja para no tapar contenido por el footer fijo */}
      <footer className="fixed bottom-0 left-0 right-0 bg-wash-primary text-white py-3 flex justify-around items-center shadow-inner z-50">
        <button className="flex flex-col items-center text-xs">
          <span>🏠</span>
          <span>Inicio</span>
        </button>
        <button className="flex flex-col items-center text-xs">
          <span>📋</span>
          <span>Actividades</span>
        </button>
        <button className="flex flex-col items-center text-xs">
          <span>👤</span>
          <span>Cuenta</span>
        </button>
      </footer>
    </main>
  );
}
