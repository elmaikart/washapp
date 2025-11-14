"use client";

import React, { useState, useEffect } from "react";
import {
  esHorarioPasado,
  validarFranjaMinima,
  getBusinessWindow,
  esFeriado,
  isSunday,
} from "@/logic/validaciones";

interface TimeBlockProps {
  /** Fecha seleccionada (formato ISO string: YYYY-MM-DD) */
  fecha: string;
  /** Hora de inicio seleccionada */
  horaInicio: string;
  /** Hora de fin seleccionada */
  horaFin: string;
  /** Setter de hora de inicio */
  setHoraInicio: (v: string) => void;
  /** Setter de hora de fin */
  setHoraFin: (v: string) => void;
  /** Etiqueta contextual: "Retiro" | "Devolución" */
  tipo: "Retiro" | "Devolución";
  /** Control externo opcional para deshabilitar el bloque */
  disabled?: boolean;
}

export default function TimeBlock({
  fecha,
  horaInicio,
  horaFin,
  setHoraInicio,
  setHoraFin,
  tipo,
  disabled = false,
}: TimeBlockProps) {
  const [horasDisponibles, setHorasDisponibles] = useState<string[]>([]);
  const [mensaje, setMensaje] = useState<string>("");

  useEffect(() => {
    if (!fecha) {
      setHorasDisponibles([]);
      return;
    }

    const f = new Date(fecha);
    const win = getBusinessWindow(f);
    if (!win) {
      setHorasDisponibles([]);
      setMensaje("⚠️ No disponible en domingos o feriados.");
      return;
    }

    const horas: string[] = [];
    for (let h = win.apertura; h < win.cierre; h++) {
      const label = `${String(h).padStart(2, "0")}:00`;
      if (!esHorarioPasado(f, h, 0)) horas.push(label);
    }

    setHorasDisponibles(horas);
    setMensaje("");
  }, [fecha]);

  // validación automática: si la franja no cumple el mínimo, limpiamos hora fin
  useEffect(() => {
    if (horaInicio && horaFin) {
      const start = new Date(`${fecha}T${horaInicio}:00`);
      const end = new Date(`${fecha}T${horaFin}:00`);
      if (!validarFranjaMinima(start, end)) {
        setHoraFin("");
      }
    }
  }, [horaInicio, horaFin]);

  const handleInicioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHoraInicio(e.target.value);
    // autoajuste: si la hora fin es menor o no cumple el mínimo, limpiamos
    if (horaFin) {
      const start = new Date(`${fecha}T${e.target.value}:00`);
      const end = new Date(`${fecha}T${horaFin}:00`);
      if (!validarFranjaMinima(start, end)) {
        setHoraFin("");
      }
    }
  };

  const handleFinChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHoraFin(e.target.value);
  };

  const deshabilitado =
    disabled || !horasDisponibles.length || isSunday(new Date(fecha)) || esFeriado(new Date(fecha));

  return (
    <div
      className={`bg-white p-4 rounded-2xl border shadow-sm ${
        deshabilitado ? "opacity-60 pointer-events-none" : ""
      }`}
    >
      <h3 className="font-semibold text-gray-700 mb-2">{tipo} — Selección de franja</h3>

      {mensaje && <p className="text-yellow-600 text-sm mb-2">{mensaje}</p>}

      <div className="flex flex-col gap-2">
        {/* Hora de inicio */}
        <label className="text-sm font-medium text-gray-600">Desde</label>
        <select
          value={horaInicio}
          onChange={handleInicioChange}
          className="border rounded-lg p-2"
          disabled={deshabilitado}
        >
          <option value="">Seleccionar hora</option>
          {horasDisponibles.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>

        {/* Hora de fin */}
        <label className="text-sm font-medium text-gray-600">Hasta</label>
        <select
          value={horaFin}
          onChange={handleFinChange}
          className="border rounded-lg p-2"
          disabled={deshabilitado || !horaInicio}
        >
          <option value="">Seleccionar hora</option>
          {horasDisponibles.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
