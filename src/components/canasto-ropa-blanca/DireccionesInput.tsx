"use client";

import React from "react";
import { MapPin } from "lucide-react";

interface Props {
  direccionRetiro: string;
  direccionDevolucion: string;
  setDireccionRetiro: (direccion: string) => void;
  setDireccionDevolucion: (direccion: string) => void;
}

const DireccionesInput: React.FC<Props> = ({
  direccionRetiro,
  direccionDevolucion,
  setDireccionRetiro,
  setDireccionDevolucion,
}) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 mt-4 space-y-4">
      <h3 className="font-semibold text-wash-primary text-base flex items-center gap-2">
        <MapPin className="w-5 h-5 text-wash-primary" />
        Direcciones
      </h3>

      {/* Dirección de Retiro */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Dirección de Retiro
        </label>
        <input
          type="text"
          value={direccionRetiro}
          onChange={(e) => setDireccionRetiro(e.target.value)}
          placeholder="Ej: Av. Patria 1234"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-wash-primary outline-none text-sm"
        />
      </div>

      {/* Dirección de Devolución */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Dirección de Devolución
        </label>
        <input
          type="text"
          value={direccionDevolucion}
          onChange={(e) => setDireccionDevolucion(e.target.value)}
          placeholder="Ej: Misma u otra dirección"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-wash-primary outline-none text-sm"
        />
      </div>
    </div>
  );
};

export default DireccionesInput;
