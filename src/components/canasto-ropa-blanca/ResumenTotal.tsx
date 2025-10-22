"use client";

import React from "react";

interface Servicio {
  nombre: string;
  cantidad: number;
  precio: number;
}

interface Props {
  serviciosSeleccionados?: Servicio[];
  cargoExpress?: number;
  cargoSeguro?: number;
}

const ResumenTotal: React.FC<Props> = ({
  serviciosSeleccionados = [],
  cargoExpress = 0,
  cargoSeguro = 0,
}) => {
  const calcularSubtotal = (servicio: Servicio) =>
    servicio.cantidad * servicio.precio;

  const subtotal = serviciosSeleccionados.reduce(
    (acc, servicio) => acc + calcularSubtotal(servicio),
    0
  );

  const total = subtotal + cargoExpress + cargoSeguro;

  if (serviciosSeleccionados.length === 0) return null;

  return (
    <div className="text-sm text-gray-800 mt-4 bg-white shadow rounded-xl p-4">
      <h3 className="font-semibold mb-2 text-wash-primary text-base">
        Total del Pedido
      </h3>
      <div className="space-y-1">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${subtotal.toLocaleString("es-AR")}</span>
        </div>
        {cargoExpress > 0 && (
          <div className="flex justify-between">
            <span>Servicio Express:</span>
            <span>${cargoExpress.toLocaleString("es-AR")}</span>
          </div>
        )}
        {cargoSeguro > 0 && (
          <div className="flex justify-between">
            <span>Seguro de Ropa:</span>
            <span>${cargoSeguro.toLocaleString("es-AR")}</span>
          </div>
        )}
        <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold">
          <span>Total a Pagar:</span>
          <span className="text-wash-primary">
            ${total.toLocaleString("es-AR")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResumenTotal;
