"use client";

import React, { useState } from "react";
import { Clock, CalendarDays } from "lucide-react";
import NotasInput from "@/components/inicio/NotasInput";
import ResumenPedido from "@/components/inicio/ResumenPedido";
import HorariosRetiro from "@/components/canasto-ropa-blanca/HorariosRetiro";
import HorariosDevolucion from "@/components/canasto-ropa-blanca/HorariosDevolucion";
import type { ItemPedido } from "@/app/inicio/page";

type Props = {
  items: ItemPedido[];
};

export default function PedidoSection({ items }: Props) {
  const [fechaRetiro, setFechaRetiro] = useState("");
  const [fechaDevolucion, setFechaDevolucion] = useState("");
  const [direccionRetiro, setDireccionRetiro] = useState("");
  const [direccionDevolucion, setDireccionDevolucion] = useState("");
  const [nota, setNota] = useState("");

  return (
    <section className="mt-8 px-4 pb-24">
      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-5 space-y-6">
        {/* Título */}
        <div>
          <h2 className="text-lg font-semibold text-wash-bannerDark flex items-center gap-2">
            <Clock className="w-5 h-5 text-wash-primary" />
            Pedido
          </h2>
          <p className="text-sm text-gray-500">
            Configurá la fecha, dirección y horarios del retiro y devolución.
          </p>
        </div>

        {/* Resumen */}
        <div className="border border-gray-100 rounded-xl p-3 bg-gray-50">
          <h3 className="text-wash-primary font-semibold text-sm mb-1">
            Resumen
          </h3>
          <p className="text-gray-500 text-sm">
            No hay servicios seleccionados aún.
          </p>
        </div>

        {/* Bloques de Retiro y Devolución */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Retiro */}
          <div className="border border-blue-100 rounded-xl p-3">
            <HorariosRetiro
              fechaRetiro={fechaRetiro}
              setFechaRetiro={setFechaRetiro}
              direccionRetiro={direccionRetiro}
              setDireccionRetiro={setDireccionRetiro}
            />
          </div>

          {/* Devolución */}
          <div className="border border-blue-100 rounded-xl p-3">
            <HorariosDevolucion
              fechaRetiro={fechaRetiro}
              fechaDevolucion={fechaDevolucion}
              setFechaDevolucion={setFechaDevolucion}
              direccionDevolucion={direccionDevolucion}
              setDireccionDevolucion={setDireccionDevolucion}
            />
          </div>
        </div>

        {/* Notas */}
        <div className="border border-yellow-100 rounded-xl p-3">
          <NotasInput nota={nota} setNota={setNota} />
        </div>

        {/* Resumen Total */}
        <div className="border-t border-gray-200 pt-3">
          <ResumenPedido />
        </div>
      </div>
    </section>
  );
}
