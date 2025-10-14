"use client";

import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import HorarioSelect from "@/components/HorarioSelect";

interface Franja {
  desdeHora: string;
  desdeMinuto: string;
  hastaHora: string;
  hastaMinuto: string;
  fecha?: string;
  confirmada?: boolean;
}

interface FranjaHorariaProps {
  label: string;
  franjas: Franja[];
  setFranjas: (franjas: Franja[]) => void;
  minDevolucion?: number; // minutos mínimos para devolución
}

const horas = Array.from({ length: 13 }, (_, i) => (8 + i).toString().padStart(2, "0"));
const minutos = ["00", "15", "30", "45"];

export default function FranjaHoraria({ label, franjas, setFranjas, minDevolucion }: FranjaHorariaProps) {
  const [puedeAgregar, setPuedeAgregar] = useState(true);

  useEffect(() => {
    setPuedeAgregar(franjas.length < 2);
  }, [franjas]);

  const calcularMinutos = (h: string, m: string) => Number(h) * 60 + Number(m);

  const validarDuracion = (franja: Franja) => {
    const desdeMin = calcularMinutos(franja.desdeHora, franja.desdeMinuto);
    const hastaMin = calcularMinutos(franja.hastaHora, franja.hastaMinuto);
    return hastaMin - desdeMin >= 60;
  };

  const actualizarCampo = (index: number, campo: keyof Franja, valor: string) => {
    const copia = [...franjas];
    copia[index] = { ...copia[index], [campo]: valor };
    setFranjas(copia);
  };

  const confirmarFranja = (index: number) => {
    const f = franjas[index];
    if (!validarDuracion(f)) {
      alert("La duración mínima debe ser de 1 hora.");
      return;
    }

    if (minDevolucion) {
      const desdeMin = calcularMinutos(f.desdeHora, f.desdeMinuto);
      if (desdeMin < minDevolucion) {
        alert("Esta franja no cumple con el mínimo de espera entre retiro y devolución.");
        return;
      }
    }

    const copia = [...franjas];
    copia[index].confirmada = true;
    setFranjas(copia);
  };

  const agregarFranja = () => {
    if (franjas.length < 2) {
      setFranjas([
        ...franjas,
        {
          desdeHora: "--",
          desdeMinuto: "--",
          hastaHora: "--",
          hastaMinuto: "--",
          confirmada: false,
        },
      ]);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>

      {franjas.map((franja, i) => (
        <div key={i} className="mb-3 p-3 border rounded-xl bg-white shadow">
          <div className="flex items-center gap-4 mb-2">
            <Clock className="text-wash-primary w-5 h-5" />
            <span className="font-semibold text-gray-800">Franja #{i + 1}</span>
          </div>

          <div className="flex gap-4 mb-2 flex-wrap">
            <HorarioSelect
              value={franja.desdeHora}
              onChange={(v) => actualizarCampo(i, "desdeHora", v)}
              options={horas}
              label="Desde - Hora"
            />
            <HorarioSelect
              value={franja.desdeMinuto}
              onChange={(v) => actualizarCampo(i, "desdeMinuto", v)}
              options={minutos}
              label="Desde - Minuto"
            />
            <HorarioSelect
              value={franja.hastaHora}
              onChange={(v) => actualizarCampo(i, "hastaHora", v)}
              options={horas}
              label="Hasta - Hora"
            />
            <HorarioSelect
              value={franja.hastaMinuto}
              onChange={(v) => actualizarCampo(i, "hastaMinuto", v)}
              options={minutos}
              label="Hasta - Minuto"
            />
          </div>

          {!franja.confirmada ? (
            <button
              type="button"
              onClick={() => confirmarFranja(i)}
              className="text-sm text-blue-600 hover:underline"
            >
              Confirmar Franja
            </button>
          ) : (
            <p className="text-green-600 text-sm">Franja confirmada ✅</p>
          )}
        </div>
      ))}

      {puedeAgregar && (
        <button
          type="button"
          onClick={agregarFranja}
          className="text-blue-600 hover:underline text-sm mt-2"
        >
          + Agregar otra franja
        </button>
      )}
    </div>
  );
}
