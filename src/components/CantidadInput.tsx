"use client";

import React, { useState } from "react";

interface CantidadInputProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
}

export default function CantidadInput({
  value = 0,
  onChange,
  min = 0,
  max = 99,
}: CantidadInputProps) {
  const [cantidad, setCantidad] = useState(value);

  const handleChange = (newValue: number) => {
    if (newValue < min || newValue > max) return;
    setCantidad(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Botón Restar */}
      <button
        type="button"
        onClick={() => handleChange(cantidad - 1)}
        className="bg-wash-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold hover:bg-blue-900 transition"
      >
        −
      </button>

      {/* Input editable */}
      <input
        type="number"
        value={cantidad}
        min={min}
        max={max}
        onChange={(e) => handleChange(Number(e.target.value))}
        className="w-14 text-center border-2 border-wash-primary rounded-md py-1 text-lg font-semibold text-wash-primary focus:outline-none focus:ring-2 focus:ring-wash-primary"
        inputMode="numeric"
      />

      {/* Botón Sumar */}
      <button
        type="button"
        onClick={() => handleChange(cantidad + 1)}
        className="bg-wash-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold hover:bg-blue-900 transition"
      >
        +
      </button>
    </div>
  );
}
