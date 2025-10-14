"use client";

import React from "react";
import {
  ShoppingBasket,
  Clock,
  Calendar,
  Home,
  StickyNote,
  Truck,
  RotateCcw,
} from "lucide-react";
import { Servicio } from "@/types/servicio";
import { Franja } from "@/types/franja";

type ResumenPedidoProps = {
  servicios: Servicio[];
  cantidades: number[];
  direccion: string;
  notas: string;
  retiro: Franja[];
  devolucion: Franja[];
};

export default function ResumenPedido({
  servicios,
  cantidades,
  direccion,
  notas,
  retiro,
  devolucion,
}: ResumenPedidoProps) {
  const resumenServicios = servicios
    .map((s, i) => ({
      ...s,
      cantidad: cantidades[i],
      subtotal: cantidades[i] * s.price,
    }))
    .filter((s) => s.cantidad > 0);

  const total = resumenServicios.reduce((acc, s) => acc + s.subtotal, 0);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6 animate-fadeIn">
      <h2 className="text-lg font-bold text-wash-primary flex items-center gap-2">
        <RotateCcw className="w-5 h-5" />
        Pedido Confirmado
      </h2>

      {/* 🧺 Servicios */}
      <div>
        <h3 className="font-semibold mb-2">Servicios seleccionados:</h3>
        <ul className="text-sm space-y-1">
          {resumenServicios.map((s, i) => (
            <li key={i} className="flex justify-between">
              <span>
                {s.name} × {s.cantidad}
              </span>
              <span>${s.subtotal.toLocaleString()}</span>
            </li>
          ))}
        </ul>
        <div className="mt-2 text-right text-wash-primary font-bold">
          Total: ${total.toLocaleString()}
        </div>
      </div>

      {/* 🏠 Dirección */}
      <div className="flex items-center gap-2 text-sm text-gray-800">
        <Home className="w-4 h-4 text-wash-primary" />
        {direccion}
      </div>

      {/* 🗒️ Notas */}
      {notas && (
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <StickyNote className="w-4 h-4 text-wash-primary" />
          {notas}
        </div>
      )}

      {/* ⏰ Horarios */}
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        {/* Retiro */}
        <div>
          <h4 className="font-medium flex items-center gap-1 mb-1">
            <Truck className="w-4 h-4 text-wash-primary" />
            Retiro
          </h4>
          {retiro.map((f, i) => (
            <div key={i} className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-gray-500" />
              {f.fecha} — <Clock className="w-4 h-4 text-gray-500" />
              {f.desdeHora}:{f.desdeMinuto} a {f.hastaHora}:{f.hastaMinuto} hs
            </div>
          ))}
        </div>

        {/* Devolución */}
        <div>
          <h4 className="font-medium flex items-center gap-1 mb-1">
            <ShoppingBasket className="w-4 h-4 text-wash-primary" />
            Devolución
          </h4>
          {devolucion.map((f, i) => (
            <div key={i} className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-gray-500" />
              {f.fecha} — <Clock className="w-4 h-4 text-gray-500" />
              {f.desdeHora}:{f.desdeMinuto} a {f.hastaHora}:{f.hastaMinuto} hs
            </div>
          ))}
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-6">
        Gracias por confiar en <span className="text-wash-primary font-semibold">WashApp</span> 💙
      </div>
    </div>
  );
}
