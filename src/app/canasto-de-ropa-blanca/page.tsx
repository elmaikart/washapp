"use client";

import React, { useState } from "react";
import PedidoForm from "@/components/PedidoForm";
import ResumenPedido from "@/components/ResumenPedido";
import { ShoppingBasket } from "lucide-react";
import { Servicio } from "@/types/servicio";
import { Franja } from "@/types/franja";

export default function CanastoBlancaPage() {
  const servicios: Servicio[] = [
    { name: "Blanca Eco", price: 10000 },
    { name: "Blanca Confort", price: 12000 },
    { name: "Blanca Extra", price: 13500 },
  ];

  const [cantidades, setCantidades] = useState<number[]>(new Array(servicios.length).fill(0));
  const [direccion, setDireccion] = useState("");
  const [notas, setNotas] = useState("");
  const [retiro, setRetiro] = useState<Franja[]>([]);
  const [devolucion, setDevolucion] = useState<Franja[]>([]);
  const [confirmado, setConfirmado] = useState(false);

  const handlePedidoConfirmado = () => {
    const resumen = { servicios, cantidades, direccion, notas, retiro, devolucion };
    console.log("✅ Pedido confirmado:", resumen);
    alert("Pedido confirmado correctamente 🎉");
    setConfirmado(true);
  };

  return (
    <main className="min-h-screen bg-[#fff9ed] px-4 pt-6 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        {/* Encabezado */}
        <div className="flex items-center gap-3">
          <div className="bg-wash-primary p-3 rounded-full">
            <ShoppingBasket className="text-white w-6 h-6" />
          </div>
          <h1 className="text-lg font-bold text-wash-primary">
            Canasto de Ropa Blanca
          </h1>
        </div>

        {/* Card Principal */}
        <div className="bg-white rounded-2xl shadow-xl p-5 space-y-5">
          <p className="text-sm text-gray-700">
            Servicio de lavado y secado para ropa blanca. Incluye jabón líquido,
            suavizante premium y perfume textil. Ideal para sábanas, toallas y
            prendas claras.
          </p>

          <PedidoForm
            servicios={servicios}
            cantidades={cantidades}
            setCantidades={setCantidades}
            direccion={direccion}
            setDireccion={setDireccion}
            notas={notas}
            setNotas={setNotas}
            retiro={retiro}
            setRetiro={setRetiro}
            devolucion={devolucion}
            setDevolucion={setDevolucion}
            setConfirmado={handlePedidoConfirmado}
          />
        </div>

        {confirmado && (
          <ResumenPedido
            servicios={servicios}
            cantidades={cantidades}
            direccion={direccion}
            notas={notas}
            retiro={retiro}
            devolucion={devolucion}
          />
        )}
      </div>
    </main>
  );
}
