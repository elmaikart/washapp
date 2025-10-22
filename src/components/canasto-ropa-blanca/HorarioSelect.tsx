"use client";

import React from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const opciones = [
  "08:00 - 10:00",
  "10:00 - 12:00",
  "12:00 - 14:00",
  "14:00 - 16:00",
  "16:00 - 18:00",
  "18:00 - 20:00",
];

export default function HorarioSelect({ value, onChange }: Props) {
  return (
    <select
      className="w-full p-2 border border-gray-300 rounded-md"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Seleccioná una franja</option>
      {opciones.map((opcion, index) => (
        <option key={index} value={opcion}>
          {opcion}
        </option>
      ))}
    </select>
  );
}
