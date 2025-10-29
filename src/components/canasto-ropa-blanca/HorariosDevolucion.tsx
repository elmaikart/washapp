"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Clock, Check, Pencil, Trash2, AlertTriangle } from "lucide-react";
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

type MinAbs = { date: string; hh: string; mm: string } | null;

/* ================== HELPERS ================== */
const toMins = (h: string, m: string) => Number(h) * 60 + Number(m);
const pad2 = (n: number) => String(n).padStart(2, "0");

const franjaCompleta = (f: Franja) =>
  f.desdeHora !== "--" && f.hastaHora !== "--" && f.desdeMinuto !== "--" && f.hastaMinuto !== "--";

const franjaValida1h = (f: Franja) =>
  franjaCompleta(f) && toMins(f.hastaHora, f.hastaMinuto) - toMins(f.desdeHora, f.desdeMinuto) >= 60;

const isSaturday = (iso: string) => new Date(iso).getDay() === 6;
// Domingo cerrado (opcional). Si querés permitir domingos, poné false.
const isSunday = (iso: string) => new Date(iso).getDay() === 0;

// ⚠️ Feriados (agregá aquí los que correspondan)
const FERIADOS_AR = new Set<string>([
  // "2025-01-01", "2025-02-03", ...
]);
const isHoliday = (iso: string) => FERIADOS_AR.has(iso);

// Ventana comercial para DEVOLUCIÓN según fecha
function getBusinessWindow(iso: string) {
  const sab = isSaturday(iso);
  // Domingos cerrados: devoluciones no disponibles; empujamos al lunes
  if (isSunday(iso)) {
    return {
      openHH: "00",
      openMM: "00",
      closeHH: "00",
      closeMM: "00",
      closed: true,
    };
  }
  return sab
    ? { openHH: "09", openMM: "30", closeHH: "13", closeMM: "00", closed: false }
    : { openHH: "08", openMM: "30", closeHH: "20", closeMM: "00", closed: false };
}

function addDaysISO(iso: string, days: number) {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function nextOpenDay(iso: string) {
  // avanza hasta un día no feriado ni domingo
  let cur = iso;
  // máximo 7 por seguridad
  for (let i = 0; i < 7; i++) {
    const win = getBusinessWindow(cur);
    if (!win.closed && !isHoliday(cur)) return cur;
    cur = addDaysISO(cur, 1);
  }
  return iso;
}

/**
 * Normaliza el mínimo absoluto (retiro + 5h) al primer horario realmente disponible
 * respetando (a) feriados, (b) domingos cerrados, (c) ventana comercial del día.
 * Regresa {date, hh, mm} de la primera hora habilitada.
 */
function normalizeToFirstAvailable(minDev: MinAbs): MinAbs {
  if (!minDev) return null;

  // Si el min cae en un día cerrado/feriado → saltar al próximo día abierto, a la hora de apertura
  let date = nextOpenDay(minDev.date);
  const win = getBusinessWindow(date);
  if (isHoliday(date) || win.closed) {
    date = nextOpenDay(addDaysISO(date, 1));
  }

  // Si el min es en la misma fecha
  if (date === minDev.date) {
    const minMinutes = toMins(minDev.hh, minDev.mm);
    const openMinutes = toMins(win.openHH, win.openMM);
    const closeMinutes = toMins(win.closeHH, win.closeMM);

    if (minMinutes <= openMinutes) {
      // Antes de abrir → fijar a apertura
      return { date, hh: win.openHH, mm: win.openMM };
    }
    if (minMinutes < closeMinutes) {
      // Dentro de ventana
      return { date, hh: minDev.hh, mm: minDev.mm };
    }
    // Después del cierre → mover a próximo abierto a la hora de apertura
    const nd = nextOpenDay(addDaysISO(date, 1));
    const nwin = getBusinessWindow(nd);
    return { date: nd, hh: nwin.openHH, mm: nwin.openMM };
  } else {
    // Si el min corresponde a otra fecha (raro), asegurar ventana del día objetivo
    const nwin = getBusinessWindow(date);
    const minMinutes = toMins(minDev.hh, minDev.mm);
    const openMinutes = toMins(nwin.openHH, nwin.openMM);
    const closeMinutes = toMins(nwin.closeHH, nwin.closeMM);
    if (minMinutes <= openMinutes) return { date, hh: nwin.openHH, mm: nwin.openMM };
    if (minMinutes >= closeMinutes) {
      const nd = nextOpenDay(addDaysISO(date, 1));
      const n2 = getBusinessWindow(nd);
      return { date: nd, hh: n2.openHH, mm: n2.openMM };
    }
    return { date, hh: minDev.hh, mm: minDev.mm };
  }
}

const ALL_HOURS = Array.from({ length: 13 }, (_, i) => String(i + 8).padStart(2, "0"));
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
  maxHora = "20",
  maxMinuteIfMaxHour,
  horarioLabel = "08:30 a 20:00 hs",
  minAbsolute,
  currentDate,
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
  minAbsolute?: { date: string; hh: string; mm: string } | null;
  currentDate?: string;
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

  const sameDayAsMin = minAbsolute && currentDate && minAbsolute.date === currentDate;

  const horasVisibles = ALL_HOURS.filter((h) => h >= minHora && h <= maxHora);

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
      className={`relative flex items-center rounded-md px-2 py-1 ${
        disabled ? "bg-gray-200 text-gray-500" : "bg-wash-primary text-white"
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
              h < minHora ||
              h > maxHora ||
              (sameDayAsMin &&
                minAbsolute &&
                (Number(h) < Number(minAbsolute.hh) ||
                  (h === minAbsolute.hh && minAbsolute.mm > "00")));
            return (
              <button
                key={h}
                disabled={!!fueraRango}
                title={
                  fueraRango
                    ? sameDayAsMin
                      ? `Debe ser posterior al retiro (+5hs)`
                      : `Fuera del horario permitido (${horarioLabel})`
                    : ""
                }
                onClick={() => {
                  if (fueraRango) return;
                  setHora(h);
                  setShowHoras(false);
                }}
                className={`px-2 py-1 rounded text-sm ${
                  fueraRango ? "text-gray-400 cursor-not-allowed" : "hover:bg-wash-primary hover:text-white"
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
              (hora === minHora && minMinuteIfMinHour && m < minMinuteIfMinHour) ||
              (sameDayAsMin &&
                minAbsolute &&
                (hora < minAbsolute.hh || (hora === minAbsolute.hh && m < minAbsolute.mm)));
            return (
              <button
                key={m}
                disabled={!!fueraRango}
                title={
                  fueraRango
                    ? sameDayAsMin
                      ? `Debe ser posterior al retiro (+5hs)`
                      : `Fuera del horario permitido (${horarioLabel})`
                    : ""
                }
                onClick={() => {
                  if (fueraRango) return;
                  setMinuto(m);
                  setShowMinutos(false);
                }}
                className={`px-2 py-1 rounded text-sm ${
                  fueraRango ? "text-gray-400 cursor-not-allowed" : "hover:bg-wash-primary hover:text-white"
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
  businessMinHoraInicio,
  businessMinMinuteInicio,
  businessMaxHoraInicio,
  horarioLabel,
  maxFinHora,
  maxFinMinute,
  minDevolucion,
  currentDate,
}: {
  franjas: Franja[];
  setFranjas: React.Dispatch<React.SetStateAction<Franja[]>>;
  fechaInicial: string;
  businessMinHoraInicio: string;
  businessMinMinuteInicio: string;
  businessMaxHoraInicio: string;
  horarioLabel: string;
  maxFinHora: string;
  maxFinMinute: string;
  minDevolucion?: MinAbs;
  currentDate: string;
}) {
  const maxFranjas = 2;

  const obtenerMinHoraSiguiente = () => {
    const confirmadas = franjas.filter((f) => f.confirmada);
    if (confirmadas.length === 0) return null;
    const ultima = confirmadas[confirmadas.length - 1];
    const mins = toMins(ultima.hastaHora, ultima.hastaMinuto) + 30;
    const hora = Math.floor(mins / 60);
    const minuto = mins % 60;
    return { hora: pad2(hora), minuto: pad2(minuto) };
  };

  const minSiguiente = obtenerMinHoraSiguiente();
  const lastIsConfirmed = franjas[franjas.length - 1]?.confirmada === true;

  return (
    <>
      {franjas.map((f, i) => {
        const canConfirm = franjaValida1h(f);
        return (
          <div key={i} className="flex items-center justify-between gap-2 mb-2 flex-wrap md:flex-nowrap p-2">
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
                minHora={i > 0 && minSiguiente ? minSiguiente.hora : businessMinHoraInicio}
                minMinuteIfMinHour={i > 0 && minSiguiente ? minSiguiente.minuto : businessMinMinuteInicio}
                maxHora={businessMaxHoraInicio}
                maxMinuteIfMaxHour="59"
                horarioLabel={horarioLabel}
                minAbsolute={minDevolucion || null}
                currentDate={currentDate}
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
                minHora={f.desdeHora !== "--" ? pad2(Number(f.desdeHora) + 1) : businessMinHoraInicio}
                minMinuteIfMinHour={f.desdeMinuto}
                maxHora={maxFinHora}
                maxMinuteIfMaxHour={maxFinMinute}
                horarioLabel={horarioLabel}
                minAbsolute={minDevolucion || null}
                currentDate={currentDate}
                disabled={f.confirmada}
              />
              <span className="text-sm text-gray-500 ml-1">Hs</span>
            </div>

            {/* Íconos */}
            <div className="flex items-center gap-1 shrink-0">
              {!f.confirmada ? (
                <button
                  title={canConfirm ? "Confirmar franja" : "Franja inválida (mínimo 1h)"}
                  onClick={() => {
                    if (!canConfirm) return;
                    const ns = [...franjas];
                    ns[i].confirmada = true;
                    setFranjas(ns);
                  }}
                  className={`p-1 rounded ${canConfirm ? "text-green-600 hover:bg-green-50" : "text-gray-400 cursor-not-allowed"}`}
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

      {/* Botón agregar franja */}
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
          className={`mt-2 text-sm ${
            !lastIsConfirmed ? "text-gray-400 cursor-not-allowed" : "text-wash-primary hover:underline"
          }`}
        >
          + Agregar franja horaria
        </button>
      )}
    </>
  );
}

/* ================== COMPONENTE PRINCIPAL ================== */
export default function HorariosDevolucion({
  fechaDevolucion,
  setFechaDevolucion,
  direccionDevolucion,
  setDireccionDevolucion,
  onConfirmChange,
  minDevolucion, // ← viene de Retiro: fin de retiro + 5h (sin normalizar)
}: {
  fechaDevolucion: string;
  setFechaDevolucion: (v: string) => void;
  direccionDevolucion: string;
  setDireccionDevolucion: (v: string) => void;
  onConfirmChange?: (confirmado: boolean) => void;
  minDevolucion?: MinAbs;
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

  const [minAvail, setMinAvail] = useState<MinAbs>(null); // mínimo normalizado y usable
  const [mensajeInfo, setMensajeInfo] = useState<string | null>(null);

  const fechaSel = fechaDevolucion || fechaInicial;
  const sabado = isSaturday(fechaSel);
  const feriado = isHoliday(fechaSel);

  const businessMinHoraInicio = sabado ? "09" : "08";
  const businessMinMinuteInicio = "30";
  const businessMaxHoraInicio = sabado ? "12" : "19";
  const horarioLabel = sabado ? "09:30 a 13:00 hs (Sábado)" : "08:30 a 20:00 hs (Lun–Vie)";
  const maxFinHora = sabado ? "13" : "20";
  const maxFinMinute = "00";

  // Actualiza validación visual “todas confirmadas”
  useEffect(() => {
    const todas = franjas.length > 0 && franjas.every((f) => f.confirmada);
    onConfirmChange?.(todas);
  }, [franjas, onConfirmChange]);

  // Normalizar minDevolucion a la primera hora realmente disponible
  useEffect(() => {
    const normalized = normalizeToFirstAvailable(minDevolucion || null);
    setMinAvail(normalized);

    if (normalized) {
      // Ajustar fecha seleccionada si quedó antes del mínimo
      if (!fechaDevolucion || fechaDevolucion < normalized.date) {
        setFechaDevolucion(normalized.date);
      }

      // Mensaje sutil
      const fechaLegible = new Date(normalized.date).toLocaleDateString("es-AR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
      setMensajeInfo(
        `🕐 La devolución estará disponible a partir de las ${normalized.hh}:${normalized.mm} hs del ${fechaLegible}.`
      );
    } else {
      setMensajeInfo(null);
    }
  }, [minDevolucion, setFechaDevolucion, fechaDevolucion]);

  return (
    <section className="mb-6 bg-white rounded-xl p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-wash-primary mb-3">Devolución Programada</h3>

      {feriado && (
        <div className="mb-3 flex items-center gap-2 text-amber-700 bg-amber-50 border border-amber-200 rounded px-3 py-2 text-sm">
          <AlertTriangle className="w-4 h-4" />
          El día seleccionado es feriado. No se realizan devoluciones.
        </div>
      )}

      {isSaturday(fechaSel) && (
        <div className="mb-3 flex items-center gap-2 text-amber-700 bg-amber-50 border border-amber-200 rounded px-3 py-2 text-sm">
          <AlertTriangle className="w-4 h-4" />
          Las devoluciones del sábado se realizan hasta las 13:00 hs.
        </div>
      )}

      {/* Fecha */}
      <div className="flex items-center mb-2">
        <Calendar className="w-5 h-5 text-wash-primary mr-2" />
        <input
          type="date"
          value={fechaSel}
          onChange={(e) => setFechaDevolucion(e.target.value)}
          min={minAvail?.date || minDevolucion?.date}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>

      {/* Línea informativa sutil */}
      {minAvail && (
        <p className="text-xs text-gray-500 italic mb-3">
          🕐 La devolución estará disponible a partir de las{" "}
          <span className="font-semibold text-wash-primary">
            {minAvail.hh}:{minAvail.mm} hs
          </span>{" "}
          del{" "}
          {new Date(minAvail.date).toLocaleDateString("es-AR", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
          .
        </p>
      )}

      {/* Render de franjas horarias */}
      <div className={feriado ? "pointer-events-none opacity-60" : ""}>
        <RenderFranja
          franjas={franjas}
          setFranjas={setFranjas}
          fechaInicial={fechaInicial}
          businessMinHoraInicio={businessMinHoraInicio}
          businessMinMinuteInicio={businessMinMinuteInicio}
          businessMaxHoraInicio={businessMaxHoraInicio}
          horarioLabel={horarioLabel}
          maxFinHora={maxFinHora}
          maxFinMinute={maxFinMinute}
          minDevolucion={minAvail || null}
          currentDate={fechaSel}
        />
      </div>

      {/* Dirección */}
      <div className="mt-4">
        <DireccionesInput
          tipo="devolucion"
          label="Dirección de Devolución"
          value={direccionDevolucion}
          onChange={setDireccionDevolucion}
        />
      </div>

      {/* Mensaje sutil adicional si lo querés mantener */}
      {mensajeInfo && <div className="sr-only">{mensajeInfo}</div>}
    </section>
  );
}
