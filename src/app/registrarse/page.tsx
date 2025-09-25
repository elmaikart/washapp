// src/app/registrarse/page.tsx

import React from "react";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

export default function RegistrarsePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5D7]">
      {/* Header con logo */}
      <header className="py-6 text-center">
        <h1 className="text-3xl font-bold text-[#0A2A45]">WashApp</h1>
      </header>

      {/* Contenido principal */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold text-center text-[#0A2A45] mb-6">
            Crear cuenta
          </h2>

          <form className="space-y-4">
            <Input type="text" placeholder="Nombre completo" required />
            <Input type="email" placeholder="Correo electrónico" required />
            <Input type="tel" placeholder="Teléfono" required />
            <Input type="password" placeholder="Contraseña" required />
            <Input type="password" placeholder="Confirmar contraseña" required />

            <Button className="w-full rounded-full bg-[#0A2A45] text-white py-2">
              Registrarse
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            ¿Ya tienes cuenta? {" "}
            <a href="/login" className="text-[#0A2A45] font-semibold hover:underline">
              Iniciar sesión
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}