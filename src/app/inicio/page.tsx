"use client";

import React from "react";
import Buscador from "@/components/buscador";
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
    <main className="min-h-screen flex flex-col items-center px-4 pb-10 bg-wash-bg">
      {/* Logo principal */}
      <h1 className="text-3xl font-bold text-wash-primary mt-6 mb-4">WashApp</h1>

      {/* Buscador encapsulado */}
      <Buscador />

      {/* Servicios con scroll */}
      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4 text-center">Servicios</h2>
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
    </main>
  );
}
