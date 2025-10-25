"use client";

import React from "react";

interface Servicio {
  nombre: string;
  cantidad: number;
  precio: number;
}

interface Props {
  serviciosSeleccionados: Servicio[];
}

const ResumenServicios: React.FC<Props> = ({ serviciosSeleccionados }) => {
  // Filtra solo los servicios con cantidad > 0
  const serviciosConCantidad = serviciosSeleccionados.filter(
    (s) => s.cantidad > 0
  );

  // Si no hay servicios seleccionados, no muestra nada
  if (serviciosConCantidad.length === 0) return null;

  // Calcula subtotal
  const subtotal = serviciosConCantidad.reduce(
    (acc, s) => acc + s.precio * s.cantidad,
    0
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
      <h3 className="font-semibold text-wash-primary mb-2 text-base">
        Resumen:
      </h3>
      <div className="space-y-1">
        {serviciosConCantidad.map((s, i) => (
          <div
            key={i}
            className="flex justify-between text-sm border-b border-gray-200 pb-1"
          >
            <span>
              {s.nombre} × {s.cantidad}
            </span>
            <span>${(s.precio * s.cantidad).toLocaleString("es-AR")}</span>
          </div>
        ))}
        <div className="flex justify-end font-semibold mt-2">
          Subtotal:{" "}
          <span className="text-wash-primary ml-1">
            ${subtotal.toLocaleString("es-AR")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResumenServicios;
