"use client";

import React from "react";

type Servicio = {
  name: string;
  price: number;
  description?: string;
};

type ResumenProps = {
  services: Servicio[];
  cantidades: number[];
};

export default function Resumen({ services = [], cantidades = [] }: ResumenProps) {
  const serviciosSeleccionados = services
    .map((s, i) => ({ ...s, cantidad: cantidades[i] }))
    .filter((s) => s.cantidad > 0);

  const subtotal = serviciosSeleccionados.reduce(
    (acc, s) => acc + s.cantidad * s.price,
    0
  );

  if (serviciosSeleccionados.length === 0) {
    return <p className="text-sm text-gray-500 italic">No has seleccionado ningún servicio todavía.</p>;
  }

  return (
    <div className="mt-6 bg-white rounded-xl p-4 shadow">
      <h3 className="text-lg font-semibold mb-2">Resumen del Pedido</h3>
      <ul className="text-sm space-y-1 mb-3">
        {serviciosSeleccionados.map((s, i) => (
          <li key={i}>
            {s.name}: {s.cantidad} × ${s.price.toLocaleString()} = ${(
              s.cantidad * s.price
            ).toLocaleString()}
          </li>
        ))}
      </ul>
      <p className="text-wash-primary font-bold text-lg">
        Total estimado: ${subtotal.toLocaleString()}
      </p>
    </div>
  );
}
