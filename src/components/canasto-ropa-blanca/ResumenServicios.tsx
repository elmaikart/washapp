"use client";

import React from "react";

interface Props {
  serviciosSeleccionados?: {
    nombre: string;
    cantidad: number;
    precio: number;
  }[];
}

const ResumenServicios: React.FC<Props> = ({ serviciosSeleccionados = [] }) => {
  // Filtramos los servicios que tienen cantidad > 0
  const serviciosConCantidad = serviciosSeleccionados.filter(
    (s) => s.cantidad > 0
  );

  return (
    <section className="border-b border-gray-200 pb-4">
      <h3 className="font-semibold text-wash-primary text-lg mb-2">
        Resumen
      </h3>

      {serviciosConCantidad.length === 0 ? (
        <p className="text-sm text-gray-500">
          No hay servicios seleccionados aún.
        </p>
      ) : (
        <ul className="space-y-1 text-sm">
          {serviciosConCantidad.map((s, index) => (
            <li
              key={index}
              className="flex justify-between text-gray-700 border-b border-gray-100 pb-1"
            >
              <span>
                {s.nombre} × {s.cantidad}
              </span>
              <span className="font-semibold text-wash-primary">
                ${(s.precio * s.cantidad).toLocaleString("es-AR")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ResumenServicios;
