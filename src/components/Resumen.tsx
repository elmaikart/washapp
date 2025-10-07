"use client";

import React from "react";

interface ResumenProps {
  services: {
    name: string;
    price: number;
    description?: string;
  }[];
  cantidades: number[];
}

export default function Resumen({ services, cantidades }: ResumenProps) {
  const subtotal = cantidades.reduce(
    (acc, qty, idx) => acc + qty * services[idx].price,
    0
  );

  const serviciosSeleccionados = services
    .map((s, i) => ({ ...s, cantidad: cantidades[i] }))
    .filter((s) => s.cantidad > 0);

  if (serviciosSeleccionados.length === 0)
    return (
      <div className="text-gray-500 text-sm italic">
        No has seleccionado ningún servicio todavía.
      </div>
    );

  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">Resumen del Pedido:</h3>
      <ul className="text-sm text-gray-700 space-y-1 mb-4">
        {serviciosSeleccionados.map((s, i) => (
          <li
            key={i}
            className="flex justify-between border-b border-gray-200 pb-1"
          >
            <span>
              {s.name} × {s.cantidad}
            </span>
            <span>${(s.cantidad * s.price).toLocaleString()}</span>
          </li>
        ))}
      </ul>

      <div className="text-right font-semibold text-wash-primary">
        Subtotal: ${subtotal.toLocaleString()}
      </div>
    </div>
  );
}
