"use client";

import React from "react";
import { ShoppingBasket, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

type Opcion = { id: string; nombre: string; precio: number; desc: string };
type Props = {
  opciones: Opcion[];
  cantidades: Record<string, number>;
  onChangeCantidad: (opcionId: string, nuevaCantidad: number) => void;
};

const ServicioCards: React.FC<Props> = ({ opciones, cantidades, onChangeCantidad }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {opciones.map((op) => {
        const qty = cantidades[op.id] ?? 0;
        return (
          <div
            key={op.id}
            className={cn(
              "rounded-2xl bg-white shadow p-5 border border-blue-50",
              "hover:shadow-md transition-all"
            )}
          >
            <div className="flex items-center justify-center mb-3">
              {/* ícono monocromo celeste para mantener el look */}
              <ShoppingBasket className="w-12 h-12 text-wash-primary" />
            </div>

            <div className="text-center font-semibold text-[15px]">{op.nombre}</div>
            <p className="text-center text-[12px] text-gray-600 mt-1 min-h-[38px]">
              {op.desc}
            </p>
            <div className="text-center text-wash-primary font-bold mt-2">
              ${op.precio.toLocaleString("es-AR")}
            </div>

            {/* Controles de cantidad */}
            <div className="mt-3 flex items-center justify-center gap-3">
              <button
                onClick={() => onChangeCantidad(op.id, Math.max(0, qty - 1))}
                className="w-8 h-8 rounded-full border border-gray-300 grid place-items-center hover:bg-gray-50"
                aria-label="Restar"
              >
                –
              </button>
              <span className="w-6 text-center">{qty}</span>
              <button
                onClick={() => onChangeCantidad(op.id, qty + 1)}
                className="w-8 h-8 rounded-full border border-wash-primary text-wash-primary grid place-items-center hover:bg-blue-50"
                aria-label="Sumar"
              >
                +
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ServicioCards;
