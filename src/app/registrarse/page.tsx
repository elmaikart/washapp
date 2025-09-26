// src/app/registrarse/page.tsx
"use client";

import React from "react";

export default function Registrarse() {
  return (
    <div className="min-h-screen bg-[#FFF7E0] flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <h1 className="text-3xl font-bold text-blue-900 mb-8">WashApp</h1>

      {/* Formulario */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-6">
        <h2 className="text-xl font-semibold text-center text-gray-800">
          Crear una cuenta
        </h2>

        <form className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre completo
            </label>
            <input
              type="text"
              placeholder="Ej: Juan Pérez"
              className="form-input w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="ejemplo@email.com"
              className="form-input w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="********"
              className="form-input w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}
