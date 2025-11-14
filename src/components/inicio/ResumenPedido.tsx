"use client";

import React, { useMemo } from "react";

type Item = {
  id: string;
  nombre: string;
  cantidad: number;
  precioUnit: number;
};

type Props = {
  items?: Item[];
};

export default function ResumenPedido({ items = [] }: Props) {
  // 🧮 Calcular subtotal de forma segura
  const subtotal = useMemo(() => {
    if (!Array.isArray(items)) return 0;
    return items.reduce((acc, i) => acc + (i.cantidad || 0) * (i.precioUnit || 0), 0);
  }, [items]);

  const express = 2000;
  const seguro = 3000;
  const total = subtotal + express + seguro;

  return (
    <div className="text-sm text-gray-700 space-y-2">
      <div className="flex justify-between">
        <span>Subtotal:</span>
        <span>${subtotal.toLocaleString()}</span>
      </div>

      <div className="flex justify-between">
        <span>Retiro Express:</span>
        <span>+$2.000</span>
      </div>

      <div className="flex justify-between">
        <span>Asegurar Pedido:</span>
        <span>+$3.000</span>
      </div>

      <hr className="my-2" />

      <div className="flex justify-between font-bold text-wash-primary">
        <span>Total estimado:</span>
        <span>${total.toLocaleString()}</span>
      </div>
    </div>
  );
}
