"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import TimeBlock from "./TimeBlock";
import { Franja } from "@/types/franja";

type Props = {
  tipo: "retiro" | "devolucion";
  franjas: Franja[];
  setFranjas: React.Dispatch<React.SetStateAction<Franja[]>>; // ✅ CORREGIDO
  fechaInicial: string;
};

export default function RenderFranja({
  tipo,
  franjas,
  setFranjas,
  fechaInicial,
}: Props) {
  const [franjaSeleccionada, setFranjaSeleccionada] = useState<Franja>({
    id: `${tipo}-0`,
    fecha: fechaInicial,
    desdeHora: "--",
    desdeMinuto: "--",
    hastaHora: "--",
    hastaMinuto: "--",
    confirmada: false,
  });

  const agregarFranja = () => {
    const nuevaFranja: Franja = {
      ...franjaSeleccionada,
      id: `${tipo}-${franjas.length}`,
      confirmada: true,
    };
    setFranjas([...franjas, nuevaFranja]);
    setFranjaSeleccionada({
      id: `${tipo}-${franjas.length + 1}`,
      fecha: fechaInicial,
      desdeHora: "--",
      desdeMinuto: "--",
      hastaHora: "--",
      hastaMinuto: "--",
      confirmada: false,
    });
  };

  const eliminarFranja = (id: string) => {
    setFranjas(franjas.filter((f) => f.id !== id));
  };

  const actualizarFranja = (
    id: string,
    desdeH: string,
    desdeM: string,
    hastaH: string,
    hastaM: string
  ) => {
    setFranjas((prev) =>
      prev.map((f) =>
        f.id === id
          ? {
              ...f,
              desdeHora: desdeH,
              desdeMinuto: desdeM,
              hastaHora: hastaH,
              hastaMinuto: hastaM,
            }
          : f
      )
    );
  };

  return (
    <div className="space-y-2">
      {/* Lista de franjas seleccionadas */}
      {franjas.map((f) => (
        <div key={f.id} className="flex items-center gap-2">
          <TimeBlock
            desdeHora={f.desdeHora}
            desdeMinuto={f.desdeMinuto}
            hastaHora={f.hastaHora}
            hastaMinuto={f.hastaMinuto}
            onChange={(desdeH, desdeM, hastaH, hastaM) =>
              actualizarFranja(f.id, desdeH, desdeM, hastaH, hastaM)
            }
          />
          <button
            onClick={() => eliminarFranja(f.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}

      {/* Campo para agregar nueva franja */}
      <div className="flex items-center gap-2">
        <TimeBlock
          desdeHora={franjaSeleccionada.desdeHora}
          desdeMinuto={franjaSeleccionada.desdeMinuto}
          hastaHora={franjaSeleccionada.hastaHora}
          hastaMinuto={franjaSeleccionada.hastaMinuto}
          onChange={(desdeH, desdeM, hastaH, hastaM) =>
            setFranjaSeleccionada((prev) => ({
              ...prev,
              desdeHora: desdeH,
              desdeMinuto: desdeM,
              hastaHora: hastaH,
              hastaMinuto: hastaM,
            }))
          }
        />
        <button
          onClick={agregarFranja}
          className="text-sm px-2 py-1 rounded border border-gray-300 hover:bg-gray-100"
        >
          + Agregar franja horaria
        </button>
      </div>
    </div>
  );
}
