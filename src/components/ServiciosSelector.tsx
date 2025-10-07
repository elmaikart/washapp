"use client";

import React, { useEffect, useState } from "react";
import { X, CheckCircle, MapPin } from "lucide-react";

interface ModalUbicacionProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (direccion: string, verificada: boolean) => void;
  initialAddress?: string;
}

export default function ModalUbicacion({
  isOpen,
  onClose,
  onConfirm,
  initialAddress = "",
}: ModalUbicacionProps) {
  const [direccion, setDireccion] = useState(initialAddress);
  const [verificada, setVerificada] = useState(false);
  const [fueraCobertura, setFueraCobertura] = useState(false);

  // Simulamos validación de cobertura (radio 5km)
  useEffect(() => {
    if (!direccion) return;
    const fuera = direccion.toLowerCase().includes("villa allende") || direccion.toLowerCase().includes("caroya");
    setFueraCobertura(fuera);
    setVerificada(!fuera && direccion.length > 5);
  }, [direccion]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-[#faf4e6] rounded-2xl shadow-lg w-full max-w-lg p-5 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-wash-primary flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Verificar Ubicación
          </h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-600 hover:text-black" />
          </button>
        </div>

        {/* Input dirección */}
        <input
          type="text"
          placeholder="Ingresá la dirección exacta (ej: Jujuy 176)"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-wash-primary"
        />

        {/* Mapa embebido */}
        <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-300 mb-3">
          <iframe
            title="Mapa Córdoba"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(
              direccion || "Córdoba, Argentina"
            )}&zoom=13&key=AIzaSyBq-FAKE-PLACEHOLDER`}
          ></iframe>
        </div>

        {/* Validaciones */}
        {fueraCobertura ? (
          <p className="text-red-600 text-sm mb-2">
            ⚠️ Fuera del área de cobertura (5 km desde Córdoba Capital)
          </p>
        ) : verificada ? (
          <p className="text-green-600 text-sm mb-2 flex items-center gap-1">
            <CheckCircle className="w-4 h-4" /> Dirección dentro del área de cobertura
          </p>
        ) : (
          <p className="text-gray-500 text-sm mb-2">Ingresá una dirección válida para verificar.</p>
        )}

        {/* Botones */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirm(direccion, verificada);
              onClose();
            }}
            disabled={!verificada}
            className={`px-4 py-2 rounded-md transition flex items-center gap-2 ${
              verificada
                ? "bg-wash-primary text-white hover:bg-blue-800"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Confirmar ubicación
            {verificada && <CheckCircle className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
