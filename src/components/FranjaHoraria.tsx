"use client";

import React from "react";
import { Clock, Calendar, Check, Pencil, Trash2 } from "lucide-react";

/* ===================== TYPES ===================== */
type Franja = {
  fecha: string;
  desdeHora: string;
  desdeMinuto: string;
  hastaHora: string;
  hastaMinuto: string;
  confirmada: boolean;
};

interface FranjaHorariaProps {
  label: string;
  franjas: Franja[];
  setFranjas: React.Dispatch<React.SetStateAction<Franja[]>>;
}

/* ===================== HELPERS ===================== */
const horas = Array.from({ length: 12 }, (_, i) =>
  String(i + 8).padStart(2, "0")
);
const minutos = ["00", "15", "30", "45"];

const toMins = (h: string, m: string) => Number(h) * 60 + Number(m);

const franjaCompleta = (f: Franja) =>
  f.desdeHora !== "--" &&
  f.desdeMinuto !== "--" &&
  f.hastaHora !== "--" &&
  f.hastaMinuto !== "--";

const franjaValida1h = (f: Franja) =>
  franjaCompleta(f) &&
  toMins(f.hastaHora, f.hastaMinuto) - toMins(f.desdeHora, f.desdeMinuto) >=
    60;

/* ===================== TIME BLOCK ===================== */
function TimeBlock({
  hora,
  minuto,
  setHora,
  setMinuto,
  disabled = false,
  minHora = "08",
  minMinuteIfMinHour,
}: {
  hora: string;
  minuto: string;
  setHora: (v: string) => void;
  setMinuto: (v: string) => void;
  disabled?: boolean;
  minHora?: string;
  minMinuteIfMinHour?: string;
}) {
  const [showHoras, setShowHoras] = React.useState(false);
  const [showMinutos, setShowMinutos] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowHoras(false);
        setShowMinutos(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const minutosPermitidos =
    minMinuteIfMinHour && hora === minHora
      ? minutos.filter((m) => m >= minMinuteIfMinHour)
      : minutos;

  return (
    <div
      ref={ref}
      className={`relative flex items-center rounded-md px-2 py-1 ${
        disabled
          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
          : "bg-wash-primary text-white"
      }`}
    >
      <button
        type="button"
        disabled={disabled}
        className="px-2 py-1"
        onClick={() => {
          setShowHoras((s) => !s);
          setShowMinutos(false);
        }}
      >
        {hora}
      </button>

      {showHoras && !disabled && (
        <div className="absolute top-full left-0 mt-1 grid grid-cols-4 gap-2 bg-white text-black p-2 rounded shadow z-50 w-40">
          {horas
            .filter((h) => h >= minHora)
            .map((h) => (
              <button
                key={h}
                onClick={() => {
                  setHora(h);
                  setShowHoras(false);
                }}
                className="px-2 py-1 rounded hover:bg-wash-primary hover:text-white text-sm text-center"
              >
                {h}
              </button>
            ))}
        </div>
      )}

      <span className="px-1">:</span>

      <button
        type="button"
        disabled={disabled}
        className="px-2 py-1"
        onClick={() => {
          setShowMinutos((s) => !s);
          setShowHoras(false);
        }}
      >
        {minuto}
      </button>

      {showMinutos && !disabled && (
        <div className="absolute top-full left-0 mt-1 grid grid-cols-2 gap-2 bg-white text-black p-2 rounded shadow z-50 w-24">
          {minutosPermitidos.map((m) => (
            <button
              key={m}
              onClick={() => {
                setMinuto(m);
                setShowMinutos(false);
              }}
              className="px-2 py-1 rounded hover:bg-wash-primary hover:text-white text-sm text-center"
            >
              {m}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ===================== COMPONENT ===================== */
export default function FranjaHoraria({
  label,
  franjas,
  setFranjas,
}: FranjaHorariaProps) {
  const fechaInicial = new Date().toISOString().split("T")[0];

  const franjaBase: Franja = {
    fecha: fechaInicial,
    desdeHora: "--",
    desdeMinuto: "--",
    hastaHora: "--",
    hastaMinuto: "--",
    confirmada: false,
  };

  const lastIsConfirmed = franjas[franjas.length - 1]?.confirmada === true;

  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>

      <div className="flex items-center mb-2">
        <Calendar className="w-5 h-5 text-wash-primary mr-2" />
        <input
          type="date"
          value={franjas[0]?.fecha || fechaInicial}
          onChange={(e) =>
            setFranjas(franjas.map((f) => ({ ...f, fecha: e.target.value })))
          }
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>

      {franjas.map((f, i) => {
        const minHastaHora =
          f.desdeHora !== "--"
            ? String(Number(f.desdeHora) + 1).padStart(2, "0")
            : "08";
        const canConfirm = franjaValida1h(f);

        return (
          <div
            key={i}
            className="flex items-center gap-2 mb-2 flex-wrap md:flex-nowrap"
          >
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-wash-primary" />
              <span className="text-sm">Entre</span>

              <TimeBlock
                hora={f.desdeHora}
                minuto={f.desdeMinuto}
                setHora={(val) => {
                  const ns = [...franjas];
                  ns[i].desdeHora = val;
                  setFranjas(ns);
                }}
                setMinuto={(val) => {
                  const ns = [...franjas];
                  ns[i].desdeMinuto = val;
                  setFranjas(ns);
                }}
                disabled={f.confirmada}
              />

              <span className="text-sm">y</span>

              <TimeBlock
                hora={f.hastaHora}
                minuto={f.hastaMinuto}
                setHora={(val) => {
                  const ns = [...franjas];
                  ns[i].hastaHora = val;
                  setFranjas(ns);
                }}
                setMinuto={(val) => {
                  const ns = [...franjas];
                  ns[i].hastaMinuto = val;
                  setFranjas(ns);
                }}
                minHora={minHastaHora}
                minMinuteIfMinHour={
                  f.desdeMinuto !== "--" ? f.desdeMinuto : undefined
                }
                disabled={f.confirmada}
              />

              <span className="text-sm">Hs</span>
            </div>

            <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
              {!f.confirmada ? (
                <button
                  title={
                    canConfirm ? "Confirmar franja" : "Franja inválida (mínimo 1 h)"
                  }
                  onClick={() => {
                    if (!canConfirm) return;
                    const ns = [...franjas];
                    ns[i].confirmada = true;
                    setFranjas(ns);
                  }}
                  className={`p-1 rounded ${
                    canConfirm
                      ? "text-green-600 hover:bg-green-50"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Check className="w-5 h-5" />
                </button>
              ) : (
                <Check className="w-5 h-5 text-green-600" />
              )}

              {f.confirmada && (
                <button
                  title="Editar"
                  onClick={() => {
                    const ns = [...franjas];
                    ns[i].confirmada = false;
                    setFranjas(ns);
                  }}
                  className="p-1 rounded text-gray-600 hover:text-wash-primary hover:bg-blue-50"
                >
                  <Pencil className="w-5 h-5" />
                </button>
              )}

              {(!f.confirmada || i > 0) && franjas.length > 1 && (
                <button
                  title="Eliminar"
                  onClick={() => {
                    setFranjas(franjas.filter((_, idx) => idx !== i));
                  }}
                  className="p-1 rounded text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        );
      })}

      <button
        disabled={!lastIsConfirmed || franjas.length >= 2}
        onClick={() =>
          setFranjas([
            ...franjas,
            { ...franjaBase, fecha: franjas[0]?.fecha || fechaInicial },
          ])
        }
        className={`text-sm ${
          !lastIsConfirmed || franjas.length >= 2
            ? "text-gray-400 cursor-not-allowed"
            : "text-wash-primary hover:underline"
        }`}
      >
        + Agregar franja horaria
      </button>
    </div>
  );
}
