"use client";

import React from "react";
import { Servicio } from "@/types/servicio";

type Props = {
  servicio: Servicio;
  cantidad: number;
  setCantidad: (val: number) => void;
};

export default function ServiciosSelector({ servicio, cantidad, setCantidad }: Props) {
  return (
    <div className="border border-gray-300 rounded-xl p-4 shadow-sm bg-white flex flex-col items-center text-center space-y-2">
      {servicio.icon}
      <h3 className="font-semibold">{servicio.name}</h3>
      <p className="text-sm text-gray-600">{servicio.description}</p>
      <p className="text-wash-primary font-bold">${servicio.price.toLocaleString()}</p>

      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setCantidad(Math.max(0, cantidad - 1))}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          −
        </button>
        <span className="min-w-[20px] text-center">{cantidad}</span>
        <button
          onClick={() => setCantidad(cantidad + 1)}
          className="px-2 py-1 bg-wash-primary text-white rounded"
        >
          +
        </button>
      </div>
    </div>
  );
}
