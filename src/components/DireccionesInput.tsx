"use client";

import React, { useState } from "react";
import { MapPin } from "lucide-react";
import ModalUbicacion from "./ModalUbicacion";

interface DireccionesInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  tipo: "retiro" | "devolucion";
}

export default function DireccionesInput({
  label,
  value,
  onChange,
  tipo,
}: DireccionesInputProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder={`Ej: Av. Patria 1487`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1 bg-wash-primary text-white px-3 rounded-md hover:bg-blue-800 transition"
        >
          <MapPin className="w-4 h-4" />
          <span className="text-sm">Mapa</span>
        </button>
      </div>

      {/* Modal con Google Maps */}
      {showModal && (
        <ModalUbicacion
          tipo={tipo}
          onClose={() => setShowModal(false)}
          onSelectUbicacion={(lat, lng, address) => {
            onChange(address);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
