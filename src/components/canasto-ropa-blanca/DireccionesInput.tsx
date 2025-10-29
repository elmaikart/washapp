"use client";

import React from "react";
import { MapPin } from "lucide-react";

interface DireccionesInputProps {
  tipo: "retiro" | "devolucion";
  label: string;
  value: string;
  onChange: (direccion: string) => void;
}

const DireccionesInput: React.FC<DireccionesInputProps> = ({
  tipo,
  label,
  value,
  onChange,
}) => {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        <span className="flex items-center gap-1">
          <MapPin className="w-4 h-4 text-wash-primary" />
          {label}
        </span>
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={
          tipo === "retiro"
            ? "Ej: Av. Patria 1234 (para retiro)"
            : "Ej: Misma u otra dirección (para devolución)"
        }
        className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-wash-primary outline-none"
      />
    </div>
  );
};

export default DireccionesInput;
