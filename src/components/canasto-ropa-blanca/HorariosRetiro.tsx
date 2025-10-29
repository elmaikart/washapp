"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Check,
  Pencil,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import DireccionesInput from "./DireccionesInput";

/* ================== TYPES ================== */
type Franja = {
  fecha: string;
  desdeHora: string;
  desdeMinuto: string;
  hastaHora: string;
  hastaMinuto: string;
  confirmada: boolean;
};

/* ================== HELPERS ================== */
const toMins = (h: string, m: string) => Number(h) * 60 + Number(m);
const addMinutes = (
  isoDate: string,
  hh: string,
  mm: string,
  minutes: number
) => {
  const d = new Date(`${isoDate}T${hh.padStart(2, "0")}:${mm.padStart(2, "0")}:00`);
  d.setMinutes(d.getMinutes() + minutes);
  return {
    date: d.toISOString().split("T")[0],
    hh: String(d.getHours()).padStart(2, "0"),
    mm: String(d.getMinutes()).padStart(2, "0"),
  };
};

const franjaCompleta = (f: Franja) =>
  f.desdeHora !== "--" &&
  f.hastaHora !== "--" &&
  f.desdeMinuto !== "--" &&
  f.hastaMinuto !== "--";

const franjaValida1h = (f: Franja) =>
  franjaCompleta(f) &&
  toMins(f.hastaHora, f.hastaMinuto) - toMins(f.desdeHora, f.desdeMinuto) >=
  60;

const isSaturday = (iso: string) => new Date(iso).getDay() === 6;

// ⚠️ Lista de feriados a bloquear
const FERIADOS_AR = new Set<string>([
  // "2025-01-01", "2025-02-03", ...
]);
const isHoliday = (iso: string) => FERIADOS_AR.has(iso);

const ALL_HOURS = Array.from({ length: 12 }, (_, i) =>
  String(i + 8).padStart(2, "0")
);
const MINUTOS = ["00", "15", "30", "45"];

/* ================== TIME BLOCK ================== */
function TimeBlock({
  hora,
  minuto,
  setHora,
  setMinuto,
  tipo,
  disabled = false,
  minHora = "08",
  minMinuteIfMinHour,
  maxHora = "18",
  maxMinuteIfMaxHour,
  horarioLabel = "08:00 a 20:00 hs",
}: {
  hora: string;
  minuto: string;
  setHora: (v: string) => void;
  setMinuto: (v: string) => void;
  tipo: "inicio" | "fin";
  disabled?: boolean;
  minHora?: string;
  minMinuteIfMinHour?: string;
  maxHora?: string;
  maxMinuteIfMaxHour?: string;
  horarioLabel?: string;
}) {
  const [showHoras, setShowHoras] = useState(false);
  const [showMinutos, setShowMinutos] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowHoras(false);
        setShowMinutos(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const horasVisibles = ALL_HOURS.filter((h) => {
    if (tipo === "inicio" && h === "19") return false;
    return h >= minHora && h <= maxHora;
  });

  let minutosPermitidos =
    minMinuteIfMinHour && hora === minHora
      ? MINUTOS.filter((m) => m >= minMinuteIfMinHour)
      : MINUTOS;
  if (maxMinuteIfMaxHour && hora === maxHora) {
    minutosPermitidos = minutosPermitidos.filter((m) => m <= maxMinuteIfMaxHour);
  }

  return (
    <div
      ref={ref}
      className={`relative flex items-center rounded-md px-2 py-1 ${disabled ? "bg-gray-200 text-gray-500" : "bg-wash-primary text-white"
        }`}
    >
      {/* Hora */}
      <button
        type="button"
        disabled={disabled}
        className="px-1"
        onClick={() => {
          setShowHoras((s) => !s);
          setShowMinutos(false);
        }}
      >
        {hora}
      </button>

      {showHoras && !disabled && (
        <div className="absolute top-full left-0 mt-1 grid grid-cols-4 gap-2 bg-white text-black p-2 rounded shadow z-50 w-44">
          {horasVisibles.map((h) => {
            const fueraRango =
              tipo === "inicio" ? h < minHora || h > maxHora : false;
            return (
              <button
                key={h}
                disabled={fueraRango}
                title={
                  fueraRango
                    ? `Fuera del horario permitido (${horarioLabel})`
                    : ""
                }
                onClick={() => {
                  if (fueraRango) return;
                  setHora(h);
                  setShowHoras(false);
                }}
                className={`px-2 py-1 rounded text-sm ${fueraRango
                    ? "text-gray-400 cursor-not-allowed"
                    : "hover:bg-wash-primary hover:text-white"
                  }`}
              >
                {h}
              </button>
            );
          })}
        </div>
      )}

      <span className="px-1">:</span>

      {/* Minuto */}
      <button
        type="button"
        disabled={disabled}
        className="px-1"
        onClick={() => {
          setShowMinutos((s) => !s);
          setShowHoras(false);
        }}
      >
        {minuto}
      </button>

      {showMinutos && !disabled && (
        <div className="absolute top-full left-0 mt-1 grid grid-cols-2 gap-2 bg-white text-black p-2 rounded shadow z-50 w-24">
          {MINUTOS.map((m) => {
            const fueraRango =
              (hora === maxHora && maxMinuteIfMaxHour && m > maxMinuteIfMaxHour) ||
              (hora === minHora && minMinuteIfMinHour && m < minMinuteIfMinHour);
            return (
              <button
                key={m}
                disabled={fueraRango}
                title={
                  fueraRango
                    ? `Fuera del horario permitido (${horarioLabel})`
                    : ""
                }
                onClick={() => {
                  if (fueraRango) return;
                  setMinuto(m);
                  setShowMinutos(false);
                }}
                className={`px-2 py-1 rounded text-sm ${fueraRango
                    ? "text-gray-400 cursor-not-allowed"
                    : "hover:bg-wash-primary hover:text-white"
                  }`}
              >
                {m}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ================== RENDER FRANJA ================== */
function RenderFranja({
  franjas,
  setFranjas,
  fechaInicial,
  businessMinHora,
  businessMaxHora,
  businessMaxMinuteAtMaxHour,
  horarioLabel,
}: {
  franjas: Franja[];
  setFranjas: React.Dispatch<React.SetStateAction<Franja[]>>;
  fechaInicial: string;
  businessMinHora: string;
  businessMaxHora: string;
  businessMaxMinuteAtMaxHour: string;
  horarioLabel: string;
}) {
  const maxFranjas = 2;

  const obtenerMinHoraSiguiente = () => {
    const confirmadas = franjas.filter((f) => f.confirmada);
    if (confirmadas.length === 0) return null;
    const ultima = confirmadas[confirmadas.length - 1];
    const mins = toMins(ultima.hastaHora, ultima.hastaMinuto) + 30;
    const hora = Math.floor(mins / 60);
    const minuto = mins % 60;
    return {
      hora: hora.toString().padStart(2, "0"),
      minuto: minuto.toString().padStart(2, "0"),
    };
  };

  const minSiguiente = obtenerMinHoraSiguiente();
  const lastIsConfirmed = franjas[franjas.length - 1]?.confirmada === true;

  return (
    <>
      {franjas.map((f, i) => {
        const canConfirm = franjaValida1h(f);
        return (
          <div
            key={i}
            className="flex items-center justify-between gap-2 mb-2 flex-wrap md:flex-nowrap p-2"
          >
            <div className="flex items-center gap-1 flex-nowrap">
              <Clock className="w-4 h-4 text-wash-primary shrink-0" />

              <TimeBlock
                tipo="inicio"
                hora={f.desdeHora}
                minuto={f.desdeMinuto}
                setHora={(v) => {
                  const ns = [...franjas];
                  ns[i].desdeHora = v;
                  setFranjas(ns);
                }}
                setMinuto={(v) => {
                  const ns = [...franjas];
                  ns[i].desdeMinuto = v;
                  setFranjas(ns);
                }}
                minHora={i > 0 && minSiguiente ? minSiguiente.hora : businessMinHora}
                minMinuteIfMinHour={i > 0 && minSiguiente ? minSiguiente.minuto : "00"}
                maxHora={businessMaxHora}
                maxMinuteIfMaxHour={businessMaxMinuteAtMaxHour}
                horarioLabel={horarioLabel}
                disabled={f.confirmada}
              />

              <span className="text-sm text-gray-500">-</span>

              <TimeBlock
                tipo="fin"
                hora={f.hastaHora}
                minuto={f.hastaMinuto}
                setHora={(v) => {
                  const ns = [...franjas];
                  ns[i].hastaHora = v;
                  setFranjas(ns);
                }}
                setMinuto={(v) => {
                  const ns = [...franjas];
                  ns[i].hastaMinuto = v;
                  setFranjas(ns);
                }}
                minHora={
                  f.desdeHora !== "--"
                    ? String(Number(f.desdeHora) + 1).padStart(2, "0")
                    : businessMinHora
                }
                minMinuteIfMinHour={f.desdeMinuto}
                maxHora="19"
                maxMinuteIfMaxHour="30"
                horarioLabel={horarioLabel}
                disabled={f.confirmada}
              />

              <span className="text-sm text-gray-500 ml-1">Hs</span>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {!f.confirmada ? (
                <button
                  title={
                    canConfirm
                      ? "Confirmar franja"
                      : "Franja inválida (mínimo 1h)"
                  }
                  onClick={() => {
                    if (!canConfirm) return;
                    const ns = [...franjas];
                    ns[i].confirmada = true;
                    setFranjas(ns);
                  }}
                  className={`p-1 rounded ${canConfirm
                      ? "text-green-600 hover:bg-green-50"
                      : "text-gray-400 cursor-not-allowed"
                    }`}
                >
                  <Check className="w-4 h-4" />
                </button>
              ) : (
                <Check className="w-4 h-4 text-green-600" />
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
                  <Pencil className="w-4 h-4" />
                </button>
              )}

              {(!f.confirmada || i > 0) && franjas.length > 1 && (
                <button
                  title="Eliminar"
                  onClick={() => setFranjas(franjas.filter((_, idx) => idx !== i))}
                  className="p-1 rounded text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        );
      })}

      {franjas.length < maxFranjas && (
        <button
          disabled={!lastIsConfirmed}
          onClick={() =>
            setFranjas([
              ...franjas,
              {
                ...franjas[0],
                confirmada: false,
                desdeHora: "--",
                desdeMinuto: "--",
                hastaHora: "--",
                hastaMinuto: "--",
                fecha: franjas[0]?.fecha || fechaInicial,
              },
            ])
          }
          className={`mt-2 text-sm ${!lastIsConfirmed
              ? "text-gray-400 cursor-not-allowed"
              : "text-wash-primary hover:underline"
            }`}
        >
          + Agregar franja horaria
        </button>
      )}
    </>
  );
}

/* ================== COMPONENTE PRINCIPAL ================== */
export default function HorariosRetiro({
  fechaRetiro,
  setFechaRetiro,
  direccionRetiro,
  setDireccionRetiro,
  onConfirmChange,
  onTurnaroundChange,
}: {
  fechaRetiro: string;
  setFechaRetiro: (v: string) => void;
  direccionRetiro: string;
  setDireccionRetiro: (v: string) => void;
  onConfirmChange?: (c: boolean) => void;
  onTurnaroundChange?: (v: { date: string; hh: string; mm: string } | null) => void;
}) {
  const fechaInicial = new Date().toISOString().split("T")[0];
  const [franjas, setFranjas] = useState<Franja[]>([
    {
      fecha: fechaInicial,
      desdeHora: "--",
      desdeMinuto: "--",
      hastaHora: "--",
      hastaMinuto: "--",
      confirmada: false,
    },
  ]);

  const fechaSel = fechaRetiro || fechaInicial;
  const sabado = isSaturday(fechaSel);
  const feriado = isHoliday(fechaSel);

  const businessMinHora = sabado ? "09" : "08";
  const businessMaxHora = sabado ? "12" : "18";
  const businessMaxMinuteAtMaxHour = sabado ? "00" : "30";
  const horarioLabel = sabado
    ? "09:00 a 13:00 hs (Sábado)"
    : "08:00 a 20:00 hs (Lun–Vie)";

  React.useEffect(() => {
    const todas = franjas.length > 0 && franjas.every((f) => f.confirmada);
    onConfirmChange?.(todas);
  }, [franjas, onConfirmChange]);

  React.useEffect(() => {
    const confirmadas = franjas.filter((f) => f.confirmada && franjaCompleta(f));
    if (confirmadas.length === 0) {
      onTurnaroundChange?.(null);
      return;
    }
    const maxFin = confirmadas.reduce(
      (acc, f) => Math.max(acc, toMins(f.hastaHora, f.hastaMinuto)),
      0
    );
    const hh = String(Math.floor(maxFin / 60)).padStart(2, "0");
    const mm = String(maxFin % 60).padStart(2, "0");
    const next = addMinutes(confirmadas[0].fecha || fechaSel, hh, mm, 5 * 60);
    onTurnaroundChange?.(next);
  }, [franjas, fechaSel, onTurnaroundChange]);

  return (
    <section className="mb-6 bg-white rounded-xl p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-wash-primary mb-3">
        Retiro Programado
      </h3>

      {feriado && (
        <div className="mb-3 flex items-center gap-2 text-amber-700 bg-amber-50 border border-amber-200 rounded px-3 py-2 text-sm">
          <AlertTriangle className="w-4 h-4" />
          El día seleccionado es feriado. No se realizan retiros.
        </div>
      )}

      {sabado && (
        <div className="mb-3 flex items-center gap-2 text-amber-700 bg-amber-50 border border-amber-200 rounded px-3 py-2 text-sm">
          <AlertTriangle className="w-4 h-4" />
          Los retiros del sábado se realizan hasta las 13:00 hs.
        </div>
      )}

      <div className="flex items-center mb-3">
        <Calendar className="w-5 h-5 text-wash-primary mr-2" />
        <input
          type="date"
          value={fechaSel}
          onChange={(e) => setFechaRetiro(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>

      <div className={feriado ? "pointer-events-none opacity-60" : ""}>
        <RenderFranja
          franjas={franjas}
          setFranjas={setFranjas}
          fechaInicial={fechaInicial}
          businessMinHora={businessMinHora}
          businessMaxHora={businessMaxHora}
          businessMaxMinuteAtMaxHour={businessMaxMinuteAtMaxHour}
          horarioLabel={horarioLabel}
        />
      </div>

      <div className="mt-4">
        <DireccionesInput
          tipo="retiro"
          label="Dirección de Retiro"
          value={direccionRetiro}
          onChange={setDireccionRetiro}
        />
      </div>
    </section>
  );
}
