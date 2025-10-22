"use client";

import React from "react";

interface Servicio {
  nombre: string;
  cantidad: number;
  precio: number;
}

interface Props {
  serviciosSeleccionados?: Servicio[];
}

const ResumenServicios: React.FC<Props> = ({ serviciosSeleccionados = [] }) => {
  if (serviciosSeleccionados.length === 0) return null;

  const calcularSubtotal = (servicio: Servicio) =>
    servicio.cantidad * servicio.precio;

  const subtotal = (serviciosSeleccionados ?? []).reduce(
    (acc, servicio) => acc + calcularSubtotal(servicio),
    0
  );

  return (
    <div className="text-sm text-gray-700 bg-wash-bg rounded-lg p-2">
      <h3 className="font-semibold mb-2 text-wash-primary text-base">
        Resumen:
      </h3>
      <ul className="space-y-1">
        {serviciosSeleccionados.map((servicio, index) => (
          <li
            key={index}
            className="flex justify-between border-b border-gray-200 pb-1"
          >
            <span>
              {servicio.nombre} × {servicio.cantidad}
            </span>
            <span>
              ${calcularSubtotal(servicio).toLocaleString("es-AR")}
            </span>
          </li>
        ))}
      </ul>
      <p className="font-semibold text-right mt-3">
        Subtotal:{" "}
        <span className="text-wash-primary">
          ${subtotal.toLocaleString("es-AR")}
        </span>
      </p>
    </div>
  );
};

export default ResumenServicios;
