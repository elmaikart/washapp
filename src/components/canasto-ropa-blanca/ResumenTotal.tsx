"use client";

import React from "react";

interface Props {
  total: number;
  deshabilitado?: boolean;
  onConfirmar: () => void;
}

const ResumenTotal: React.FC<Props> = ({
  total,
  deshabilitado = false,
  onConfirmar,
}) => {
  return (
    <div className="border-t border-gray-200 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      {/* Total */}
      <div className="text-lg font-semibold text-wash-primary">
        Total estimado:{" "}
        <span className="text-gray-800">
          ${total.toLocaleString("es-AR")}
        </span>
      </div>

      {/* Botón confirmar */}
      <button
        onClick={onConfirmar}
        disabled={deshabilitado}
        className={`w-full sm:w-auto px-6 py-2 rounded-lg font-medium shadow transition-all
          ${
            deshabilitado
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-wash-primary text-white hover:bg-blue-800 active:scale-[0.98]"
          }`}
      >
        Confirmar Pedido
      </button>
    </div>
  );
};

export default ResumenTotal;
