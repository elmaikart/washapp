"use client";

import React, { useState } from "react";
import { Calendar, Clock, Plus, Trash2, Check, Pencil } from "lucide-react";
import HorarioSelect from "./HorarioSelect";

interface Franja {
  desde: string;
  hasta: string;
  confirmado?: boolean;
}

interface Props {
  titulo?: string;
  fechaRetiro?: string;
  setFechaRetiro?: (fecha: string) => void;
  franjasRetiro?: Franja[];
  setFranjasRetiro?: (franjas: Franja[]) => void;
}

const HorariosRetiro: React.FC<Props> = ({
  titulo, // 👈 ESTA LÍNEA FALTABA
  fechaRetiro = "",
  setFechaRetiro = () => {},
  franjasRetiro = [],
  setFranjasRetiro = () => {},
}) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const agregarFranja = () => {
    setFranjasRetiro([...franjasRetiro, { desde: "", hasta: "", confirmado: false }]);
  };

  const actualizarFranja = (index: number, campo: string, valor: string) => {
    const nuevasFranjas = [...franjasRetiro];
    nuevasFranjas[index] = { ...nuevasFranjas[index], [campo]: valor };
    setFranjasRetiro(nuevasFranjas);
  };

  const confirmarFranja = (index: number) => {
    const nuevasFranjas = [...franjasRetiro];
    nuevasFranjas[index].confirmado = true;
    setFranjasRetiro(nuevasFranjas);
    setEditIndex(null);
  };

  const eliminarFranja = (index: number) => {
    const nuevasFranjas = franjasRetiro.filter((_, i) => i !== index);
    setFranjasRetiro(nuevasFranjas);
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 mt-4">
      <h3 className="font-semibold text-wash-primary text-base mb-3 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-wash-primary" />
        {titulo || "Retiro Programado"}
      </h3>

      {/* Fecha */}
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="w-5 h-5 text-gray-600" />
        <input
          type="date"
          value={fechaRetiro}
          onChange={(e) => setFechaRetiro(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1 w-40 focus:ring-2 focus:ring-wash-primary outline-none"
        />
      </div>

      {/* Franjas Horarias */}
      <div className="space-y-2">
        {Array.isArray(franjasRetiro) &&
          franjasRetiro.map((franja, index) => (
            <div key={index} className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-wash-primary" />
              <span className="text-sm text-gray-700">Entre</span>

              <HorarioSelect
                value={franja.desde}
                onChange={(valor) => actualizarFranja(index, "desde", valor)}
                disabled={franja.confirmado}
              />

              <span className="text-sm text-gray-700">y</span>

              <HorarioSelect
                value={franja.hasta}
                onChange={(valor) => actualizarFranja(index, "hasta", valor)}
                disabled={franja.confirmado}
              />

              <span className="text-sm text-gray-700">Hs</span>

              {!franja.confirmado ? (
                <button
                  onClick={() => confirmarFranja(index)}
                  className="p-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                >
                  <Check className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setEditIndex(index)}
                  className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => eliminarFranja(index)}
                className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

        {/* Botón para agregar nueva franja */}
        <button
          onClick={agregarFranja}
          className="mt-2 flex items-center text-wash-primary hover:text-blue-700 text-sm font-medium"
        >
          <Plus className="w-4 h-4 mr-1" /> Agregar franja horaria
        </button>
      </div>
    </div>
  );
};

export default HorariosRetiro;
