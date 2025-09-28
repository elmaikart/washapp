"use client";

import React from "react";
import Input from "@/components/input";
import { Package } from "lucide-react";

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

export default function InicioPage() {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 pb-10">
      {/* Título WashApp alineado igual que las demás secciones */}
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-wash-primary mt-6 mb-4 text-left">WashApp</h1>
      </div>

      {/* Buscador */}
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

      {/* Servicios */}
      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4 text-left">Servicios</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto p-2">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow hover:shadow-md transition"
            >
              <Package className="w-6 h-6 mb-2 text-wash-primary" />
              <span className="text-sm font-semibold text-center">{service}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actividades Programadas */}
      <section className="w-full max-w-4xl mt-10">
        <h2 className="text-lg font-semibold mb-4 text-left">Actividades Programadas</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Tarjeta: Retiro */}
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="text-md font-bold text-wash-primary mb-1">Retiro programado</h3>
            <p className="text-sm text-gray-700">Martes 10:00hs</p>
            <p className="text-sm text-gray-700">Canasto y Acolchados</p>
            <p className="text-sm text-gray-500 mt-1">Estado: Confirmado</p>
          </div>

          {/* Tarjeta: Devolución */}
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="text-md font-bold text-wash-primary mb-1">Devolución programada</h3>
            <p className="text-sm text-gray-700">Miércoles 18:00hs</p>
            <p className="text-sm text-gray-700">Sábanas y Fundas</p>
            <p className="text-sm text-gray-500 mt-1">Estado: En ruta</p>
          </div>
        </div>
      </section>
    </main>
  );
}
