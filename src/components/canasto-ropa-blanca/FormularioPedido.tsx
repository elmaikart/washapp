"use client";

import React, { useState, useEffect } from "react";
import HorariosRetiro from "./HorariosRetiro";
import HorariosDevolucion from "./HorariosDevolucion";
import ResumenServicios from "./ResumenServicios";
import NotasInput from "./NotasInput";
import ResumenTotal from "./ResumenTotal";

/* =============== Tipos auxiliares =============== */
type MinDevolucion = { date: string; hh: string; mm: string } | null;

interface FormularioPedidoProps {
  serviciosSeleccionados: any[];
  fechaRetiro: string;
  setFechaRetiro: (v: string) => void;
  fechaDevolucion: string;
  setFechaDevolucion: (v: string) => void;
  direccionRetiro: string;
  setDireccionRetiro: (v: string) => void;
  direccionDevolucion: string;
  setDireccionDevolucion: (v: string) => void;
  notas: string;
  setNotas: (v: string) => void;
  express: boolean;
  setExpress: (v: boolean) => void;
  seguro: boolean;
  setSeguro: (v: boolean) => void;
  onConfirmar: () => void;
}

/* ============================================================
   FORMULARIO PRINCIPAL
   Diseño fiel al modelo: https://washapp1.vercel.app/canasto
   ============================================================ */
export default function FormularioPedido({
  serviciosSeleccionados,
  fechaRetiro,
  setFechaRetiro,
  fechaDevolucion,
  setFechaDevolucion,
  direccionRetiro,
  setDireccionRetiro,
  direccionDevolucion,
  setDireccionDevolucion,
  notas,
  setNotas,
  express,
  setExpress,
  seguro,
  setSeguro,
  onConfirmar,
}: FormularioPedidoProps) {
  /* ================= ESTADOS ================= */
  const [retirosConfirmados, setRetirosConfirmados] = useState(false);
  const [devolucionesConfirmadas, setDevolucionesConfirmadas] = useState(false);
  const [minDevolucion, setMinDevolucion] = useState<MinDevolucion>(null);
  const [franjasRetiro, setFranjasRetiro] = useState<any[]>([]);

  /* ================= CÁLCULOS ================= */
  const totalServicios = serviciosSeleccionados.reduce(
    (acc, s) => acc + s.cantidad * s.precio,
    0
  );
  const totalConExtras =
    totalServicios + (express ? 2000 : 0) + (seguro ? 3000 : 0);

  const anyServicio = serviciosSeleccionados.some((s) => s.cantidad > 0);
  const direccionesOk =
    direccionRetiro.trim() !== "" && direccionDevolucion.trim() !== "";
  const pedidoListo =
    anyServicio && direccionesOk && retirosConfirmados && devolucionesConfirmadas;

  /* ================= FUNCIONES AUXILIARES ================= */
  const sumarMinutos = (hora: number, minuto: number, minsExtra: number) => {
    const totalMins = hora * 60 + minuto + minsExtra;
    const hh = Math.floor(totalMins / 60);
    const mm = totalMins % 60;
    return { hh, mm };
  };

  const esSabado = (iso: string) => new Date(iso).getDay() === 6;

  /* ================= CÁLCULO INTELIGENTE DE MIN DEVOLUCIÓN ================= */
  useEffect(() => {
    if (!franjasRetiro || franjasRetiro.length === 0) return;
    const confirmadas = franjasRetiro.filter((f) => f.confirmada);
    if (confirmadas.length === 0) return;

    const ultima = confirmadas[confirmadas.length - 1];
    const horaFin = Number(ultima.hastaHora);
    const minutoFin = Number(ultima.hastaMinuto);

    // Sumamos 5 horas al retiro (tiempo de procesamiento)
    let { hh, mm } = sumarMinutos(horaFin, minutoFin, 300);

    let nuevaFecha = fechaRetiro;
    let diaSiguiente = false;

    // Si pasa de las 20:00 hs, va al día siguiente
    if (hh >= 20) {
      const d = new Date(fechaRetiro);
      d.setDate(d.getDate() + 1);
      nuevaFecha = d.toISOString().split("T")[0];
      diaSiguiente = true;
    }

    // Ajuste al horario laboral del nuevo día (según sea sábado o no)
    if (diaSiguiente) {
      const sabado = esSabado(nuevaFecha);
      hh = sabado ? 9 : 8;
      mm = 30;
    }

    // Guardamos y actualizamos devolución
    const nuevaMin = {
      date: nuevaFecha,
      hh: String(hh).padStart(2, "0"),
      mm: String(mm).padStart(2, "0"),
    };
    setMinDevolucion(nuevaMin);
    setFechaDevolucion(nuevaFecha);
  }, [franjasRetiro, fechaRetiro, setFechaDevolucion]);

  /* ================= RENDER ================= */
  return (
    <section className="bg-white rounded-xl shadow-sm p-6 space-y-6">
      {/* RESUMEN */}
      <ResumenServicios serviciosSeleccionados={serviciosSeleccionados} />

      {/* HORARIOS */}
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {/* RETIRO */}
        <div className="w-full">
          <HorariosRetiro
            fechaRetiro={fechaRetiro}
            setFechaRetiro={setFechaRetiro}
            direccionRetiro={direccionRetiro}
            setDireccionRetiro={setDireccionRetiro}
            onConfirmChange={setRetirosConfirmados}
            onTurnaroundChange={(data: any) => {
              setMinDevolucion(data);
              setFranjasRetiro(data?.franjas || []);
            }}
          />
        </div>

        {/* DEVOLUCIÓN */}
        <div className="w-full">
          <HorariosDevolucion
            fechaDevolucion={fechaDevolucion}
            setFechaDevolucion={setFechaDevolucion}
            direccionDevolucion={direccionDevolucion}
            setDireccionDevolucion={setDireccionDevolucion}
            onConfirmChange={setDevolucionesConfirmadas}
            minDevolucion={minDevolucion}
          />
        </div>
      </div>

      {/* NOTAS */}
      <NotasInput notas={notas} setNotas={setNotas} />

      {/* EXTRAS */}
      <div className="space-y-2 border-t border-gray-200 pt-4">
        <label className="flex items-center text-sm">
          <input
            type="checkbox"
            checked={express}
            onChange={() => setExpress(!express)}
            className="mr-2 accent-wash-primary"
          />
          Retiro Express (+$2.000)
        </label>
        <label className="flex items-center text-sm">
          <input
            type="checkbox"
            checked={seguro}
            onChange={() => setSeguro(!seguro)}
            className="mr-2 accent-wash-primary"
          />
          Asegurar Pedido (+$3.000)
        </label>
      </div>

      {/* TOTAL */}
      <ResumenTotal
        total={totalConExtras}
        onConfirmar={onConfirmar}
        deshabilitado={!pedidoListo}
      />

      {/* VALIDACIÓN */}
      {!pedidoListo && (
        <p className="text-xs text-gray-500 mt-1">
          ⚠️ Completá todos los campos y confirmá las franjas horarias para
          continuar.
        </p>
      )}
    </section>
  );
}
