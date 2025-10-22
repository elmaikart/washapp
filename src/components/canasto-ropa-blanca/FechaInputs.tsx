"use client";

import React from "react";
import { Calendar } from "lucide-react";
import Label from "@/components/Label";
import Input from "@/components/Input";

interface FechaInputsProps {
  fechaRetiro: string;
  setFechaRetiro: (value: string) => void;
  fechaDevolucion: string;
  setFechaDevolucion: (value: string) => void;
}

export default function FechaInputs({
  fechaRetiro,
  setFechaRetiro,
  fechaDevolucion,
  setFechaDevolucion,
}: FechaInputsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Fecha de Retiro */}
      <div className="space-y-2">
        <Label htmlFor="fecha-retiro">Horario de Retiro</Label>
        <div className="flex items-center gap-2">
          <Calendar className="text-wash-primary w-5 h-5" />
          <Input
            id="fecha-retiro"
            type="date"
            value={fechaRetiro}
            onChange={(e) => setFechaRetiro(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {/* Fecha de Devolución */}
      <div className="space-y-2">
        <Label htmlFor="fecha-devolucion">Horario de Devolución</Label>
        <div className="flex items-center gap-2">
          <Calendar className="text-wash-primary w-5 h-5" />
          <Input
            id="fecha-devolucion"
            type="date"
            value={fechaDevolucion}
            onChange={(e) => setFechaDevolucion(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
