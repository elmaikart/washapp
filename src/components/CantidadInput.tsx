"use client";

import React from "react";

interface CantidadInputProps {
  cantidad: number;
  setCantidad: (nuevaCantidad: number) => void;
}

const CantidadInput: React.FC<CantidadInputProps> = ({ cantidad, setCantidad }) => {
  const aumentar = () => setCantidad(cantidad + 1);
  const disminuir = () => {
    if (cantidad > 0) setCantidad(cantidad - 1);
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <button
        type="button"
        onClick={disminuir}
        className="w-8 h-8 flex items-center justify-center rounded-full border border-wash-primary text-wash-primary hover:bg-wash-primary hover:text-white transition"
      >
        -
      </button>
      <span className="font-semibold text-gray-800">{cantidad}</span>
      <button
        type="button"
        onClick={aumentar}
        className="w-8 h-8 flex items-center justify-center rounded-full border border-wash-primary text-wash-primary hover:bg-wash-primary hover:text-white transition"
      >
        +
      </button>
    </div>
  );
};

export default CantidadInput;
