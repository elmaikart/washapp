"use client";

import React, { useState } from "react";
import { ShoppingBasket, Layers } from "lucide-react";
import FormularioPedido from "@/components/canasto-ropa-blanca/FormularioPedido";

export default function CanastoDeRopaBlancaPage() {
  /* ===================== SERVICIOS ===================== */
  const [servicios, setServicios] = useState([
    {
      nombre: "Blanca Eco",
      descripcion:
        "Lavado y Secado. Jabón y Suavizante Genérico. Sin Blanqueador.",
      icon: <ShoppingBasket className="w-16 h-16 text-wash-primary mb-3" />,
      precio: 10000,
      cantidad: 0,
    },
    {
      nombre: "Blanca Confort",
      descripcion:
        "Lavado y Secado. Jabón Líquido + Suavizante Premium + Detergente Neutro.",
      icon: <ShoppingBasket className="w-16 h-16 text-wash-primary mb-3" />,
      precio: 12000,
      cantidad: 0,
    },
    {
      nombre: "Blanca Extra",
      descripcion:
        "Incluye Blanqueador + Detergente Neutro + Perfume para Ropa.",
      icon: <Layers className="w-16 h-16 text-wash-primary mb-3" />,
      precio: 13500,
      cantidad: 0,
    },
  ]);

  /* ===================== FUNCIONES ===================== */
  const aumentarCantidad = (nombre: string) => {
    setServicios((prev) =>
      prev.map((s) =>
        s.nombre === nombre ? { ...s, cantidad: s.cantidad + 1 } : s
      )
    );
  };

  const disminuirCantidad = (nombre: string) => {
    setServicios((prev) =>
      prev.map((s) =>
        s.nombre === nombre && s.cantidad > 0
          ? { ...s, cantidad: s.cantidad - 1 }
          : s
      )
    );
  };

  /* ===================== ESTADOS DE FORMULARIO ===================== */
  const [fechaRetiro, setFechaRetiro] = useState("");
  const [horaInicioRetiro, setHoraInicioRetiro] = useState("");
  const [horaFinRetiro, setHoraFinRetiro] = useState("");

  const [fechaDevolucion, setFechaDevolucion] = useState("");
  const [horaInicioDevolucion, setHoraInicioDevolucion] = useState("");
  const [horaFinDevolucion, setHoraFinDevolucion] = useState("");

  const [direccionRetiro, setDireccionRetiro] = useState("");
  const [direccionDevolucion, setDireccionDevolucion] = useState("");
  const [notas, setNotas] = useState("");

  const [express, setExpress] = useState(false);
  const [seguro, setSeguro] = useState(false);

  const handleConfirmarPedido = () => {
    console.log("✅ Pedido confirmado:", {
      servicios,
      fechaRetiro,
      horaInicioRetiro,
      horaFinRetiro,
      fechaDevolucion,
      horaInicioDevolucion,
      horaFinDevolucion,
      direccionRetiro,
      direccionDevolucion,
      notas,
      express,
      seguro,
    });
  };

  /* ===================== RENDER ===================== */
  return (
    <main className="min-h-screen bg-wash-bg text-gray-800">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold text-center text-wash-primary mb-6">
          Pedido de Canasto de Ropa Blanca
        </h1>

        {/* GRID DE SERVICIOS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {servicios.map((servicio, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-4 text-center flex flex-col items-center justify-between transition hover:shadow-md"
            >
              <div>{servicio.icon}</div>
              <h3 className="font-semibold text-wash-primary">
                {servicio.nombre}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {servicio.descripcion}
              </p>
              <p className="font-semibold text-wash-primary mb-2">
                ${servicio.precio.toLocaleString("es-AR")}
              </p>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => disminuirCantidad(servicio.nombre)}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-wash-primary text-wash-primary hover:bg-wash-primary hover:text-white transition"
                >
                  -
                </button>
                <span className="font-semibold">{servicio.cantidad}</span>
                <button
                  onClick={() => aumentarCantidad(servicio.nombre)}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-wash-primary text-wash-primary hover:bg-wash-primary hover:text-white transition"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FORMULARIO DE PEDIDO */}
        <FormularioPedido
          serviciosSeleccionados={servicios}
          fechaRetiro={fechaRetiro}
          setFechaRetiro={setFechaRetiro}
          horaInicioRetiro={horaInicioRetiro}
          setHoraInicioRetiro={setHoraInicioRetiro}
          horaFinRetiro={horaFinRetiro}
          setHoraFinRetiro={setHoraFinRetiro}
          fechaDevolucion={fechaDevolucion}
          setFechaDevolucion={setFechaDevolucion}
          horaInicioDevolucion={horaInicioDevolucion}
          setHoraInicioDevolucion={setHoraInicioDevolucion}
          horaFinDevolucion={horaFinDevolucion}
          setHoraFinDevolucion={setHoraFinDevolucion}
          direccionRetiro={direccionRetiro}
          setDireccionRetiro={setDireccionRetiro}
          direccionDevolucion={direccionDevolucion}
          setDireccionDevolucion={setDireccionDevolucion}
          notas={notas}
          setNotas={setNotas}
          express={express}
          setExpress={setExpress}
          seguro={seguro}
          setSeguro={setSeguro}
          onConfirmar={handleConfirmarPedido}
        />
      </div>
    </main>
  );
}
