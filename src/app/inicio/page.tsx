// src/app/inicio/page.tsx

"use client";

import React from "react";
import { Package } from "lucide-react";
import Input from "@/components/input";

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
    <main className="min-h-screen bg-[#fff5cc] flex flex-col items-center p-4">
      {/* LOGO WashApp */}
      <h1 className="text-3xl font-bold text-center mt-6 mb-4 text-primary">WashApp</h1>

      {/* Buscador */}
      <div className="flex items-center w-full max-w-md bg-white rounded-full shadow px-4 py-2 mb-6">
        <Input
          type="text"
          placeholder="¿Qué lavamos hoy?"
          className="flex-grow border-none focus:ring-0"
        />
        <button className="ml-2 bg-primary text-white font-semibold px-4 py-1 rounded-full text-sm hover:bg-blue-900 transition">
          Buscar
        </button>
      </div>

      {/* Servicios con Scroll */}
      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4 text-center">Servicios</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 overflow-y-auto max-h-[400px] p-2">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow hover:shadow-md transition"
            >
              <Package className="w-6 h-6 mb-2 text-primary" />
              <span className="text-sm font-semibold">{service}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
