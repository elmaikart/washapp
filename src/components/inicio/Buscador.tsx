"use client";

import React from "react";
import Input from "@/components/Input";

export default function Buscador() {
  return (
    <div className="flex items-center w-full max-w-md bg-white rounded-full shadow px-4 py-2 mb-6">
      <Input
        type="text"
        placeholder="¿Qué lavamos hoy?"
        className="flex-grow border-none focus:ring-0"
      />
      <button className="ml-2 bg-wash-primary text-white font-semibold px-4 py-1 rounded-full text-sm hover:bg-blue-900 transition">
        Buscar
      </button>
    </div>
  );
}
