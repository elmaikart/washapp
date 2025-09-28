"use client";

import React, { useState } from "react";
import { Package } from "lucide-react";

const allServices = [
  { label: "Canasto de Ropa" },
  { label: "Acolchados" },
  { label: "Camperas" },
  { label: "Sábanas" },
  { label: "Fundas" },
  { label: "Manteles" },
  { label: "Cortinas" },
  { label: "Secado" },
  { label: "Alfombras" },
];

export default function InicioPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = allServices.filter((service) =>
    service.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fef1c7]">
      <div className="flex flex-col items-center pt-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">WashApp</h1>

        {/* Input de búsqueda */}
        <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2 w-full max-w-md mb-6">
          <Package className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="¿Qué lavamos hoy?"
            className="flex-grow border-none focus:outline-none text-sm placeholder-gray-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="ml-2 bg-[#010f26] hover:bg-[#041062] text-white text-sm font-semibold px-4 py-1 rounded-full">
            Buscar
          </button>
        </div>

        {/* Servicios */}
        <div className="w-full max-w-4xl px-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Servicios</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-10">
            {filteredServices.map((service, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center bg-white rounded-xl shadow-md py-6 px-4 text-center"
              >
                <Package className="w-8 h-8 text-[#010f26] mb-2" />
                <span className="text-sm font-medium text-gray-800">
                  {service.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
