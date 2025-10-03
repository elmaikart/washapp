"use client";

import React from "react";
import Link from "next/link";
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
  "Canasto de Ropa Blanca",
  "Canasto de Ropa Color",
  "Acolchados",
  "Camperas",
  "Sábanas",
  "Fundas",
  "Manteles",
  "Cortinas",
  "Toallas",
  "Secado",
];

// Mapeo de iconos
const iconsMap: Record<string, JSX.Element> = {
  "canasto de ropa blanca": <ShoppingBasket className="w-20 h-20 text-wash-primary" />,
  "canasto de ropa color": <ShoppingBasket className="w-20 h-20 text-wash-primary" />,
  Acolchados: <Layers className="w-20 h-20 text-wash-primary" />,
  Camperas: <Shirt className="w-20 h-20 text-wash-primary" />,
  Sábanas: <FoldVertical className="w-20 h-20 text-wash-primary" />,
  Fundas: <Package className="w-20 h-20 text-wash-primary" />,
  Manteles: <LayoutGrid className="w-20 h-20 text-wash-primary" />,
  Cortinas: <PanelBottomClose className="w-20 h-20 text-wash-primary" />,
  Secado: <Fan className="w-20 h-20 text-wash-primary" />,
  Toallas: <Layers className="w-20 h-20 text-wash-primary" />,
};

export default function InicioPage() {
  return (
    <main className="min-h-screen pb-32 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl pt-24 mx-auto">
        {/* 🔹 Buscador */}
        <div className="flex items-center w-full bg-white rounded-full shadow px-4 py-2 gap-2 mb-6">
          <Input
            type="text"
            placeholder="¿Qué lavamos hoy?"
            className="flex-grow border-none focus:ring-0"
          />
          <button className="bg-wash-primary text-white font-semibold px-4 py-1 rounded-full text-sm hover:bg-blue-900 transition">
            Buscar
          </button>
        </div>

        {/* 🔹 Servicios */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Servicios</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto p-2">
            {services.map((service, index) => (
              <Link
                key={index}
                href={`/${service.toLowerCase().replace(/ /g, "-")}`}
                className="flex flex-col items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg hover:scale-105 transition-transform duration-300"
              >
                {iconsMap[service] ?? (
                  <Package className="w-20 h-20 text-wash-primary mb-4" />
                )}
                <span className="text-sm font-semibold text-center mt-4">
                  {service}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 🔹 Actividades Programadas */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Actividades Programadas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center">
              <span className="text-5xl text-wash-primary mb-2">⬆️</span>
              <h3 className="text-md font-bold text-wash-primary mb-1">Retiro Programado</h3>
              <p className="text-sm text-gray-700">
                Hoy, Miér. 25 Sep. Entre: 10:00hs y 13:00hs
              </p>
              <p className="text-sm text-gray-700">1 Canasto de Ropa Blanco Confort</p>
              <p className="text-sm text-gray-500 mt-1">Estado: Retirado</p>
            </div>

            <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center">
              <span className="text-5xl text-wash-primary mb-2">⬇️</span>
              <h3 className="text-md font-bold text-wash-primary mb-1">Devolución Programada</h3>
              <p className="text-sm text-gray-700">
                Mañana, Jue. 26 Sep. Entre: 13:00hs y 18:00hs
              </p>
              <p className="text-sm text-gray-700">1 Canasto de Ropa Blanco Confort</p>
              <p className="text-sm text-gray-500 mt-1">Estado: En camino</p>
            </div>
          </div>
        </section>

        {/* 🔹 Tienda */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Tienda</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow p-4 flex flex-col justify-between">
              <div className="flex flex-col items-center text-center">
                <Package className="w-16 h-16 text-wash-primary mb-2" />
                <h3 className="text-md font-bold text-wash-primary mb-1">Promo 2x1</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Comprá 2 <strong>Bolsos Oficiales</strong> al precio de 1.<br />
                  Tamaño y volumen adecuado para nuestras máquinas. Ideal para tus pedidos programados.
                </p>
              </div>
              <button className="mt-4 bg-wash-primary text-white font-semibold px-4 py-2 rounded-full text-sm hover:bg-blue-900 transition self-center">
                Comprar
              </button>
            </div>

            <div className="bg-white rounded-xl shadow p-4 flex flex-col justify-between">
              <div className="flex flex-col items-center text-center">
                <span className="text-5xl mb-2">🌸</span>
                <h3 className="text-md font-bold text-wash-primary mb-1">Aromas Post-Lavado</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Rociadores con <strong>perfumes artesanales</strong>.<br />
                  Conservá tus prendas con fragancias suaves y frescas. Incluye opciones hipoalergénicas 🌿
                </p>
              </div>
              <button className="mt-4 bg-wash-primary text-white font-semibold px-4 py-2 rounded-full text-sm hover:bg-blue-900 transition self-center">
                Comprar
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* 🔹 Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-wash-primary text-white py-3 shadow-inner z-50">
        <div className="mx-auto max-w-[800px] px-4 flex justify-between items-center">
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
        </div>
      </footer>
    </main>
  );
}
