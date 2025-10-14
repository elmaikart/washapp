"use client";

import React from "react";
import {
  ShoppingBasket,
  Layers,
  Clock,
  Calendar,
  Check,
  Pencil,
  Trash2,
} from "lucide-react";
import CantidadInput from "../../components/CantidadInput";
import DireccionesInput from "../../components/DireccionesInput";

/* =================  DATA  ================= */
const services = [
  {
    name: "Blanca Eco",
    description:
      "Lavado y Secado. Jabón y Suavizante Genérico. Sin Blanqueador.",
    icon: <ShoppingBasket className="w-20 h-20 text-wash-primary mb-4" />,
    price: 10000,
  },
  {
    name: "Blanca Confort",
    description:
      "Lavado y Secado. Jabón Líquido + Suavizante Premium + Detergente Neutro.",
    icon: <ShoppingBasket className="w-20 h-20 text-wash-primary mb-4" />,
    price: 12000,
  },
  {
    name: "Blanca Extra",
    description:
      "Incluye Blanqueador + Detergente Neutro + Perfume para Ropa.",
    icon: <Layers className="w-20 h-20 text-wash-primary mb-4" />,
    price: 13500,
  },
];

/* ================  HELPERS  ================ */
type Franja = {
  fecha: string;
  desdeHora: string;
  desdeMinuto: string;
  hastaHora: string;
  hastaMinuto: string;
  confirmada: boolean;
};

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

/* ==============  TIME BLOCK  ============== */
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
      {/* Hora */}
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

      {/* Minuto */}
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

/* ---------- RENDER FRANJA ---------- */
function RenderFranja({
  tipo,
  franjas,
  setFranjas,
  fechaInicial,
}: {
  tipo: "retiro" | "devolucion";
  franjas: Franja[];
  setFranjas: React.Dispatch<React.SetStateAction<Franja[]>>;
  fechaInicial: string;
}) {
  const maxFranjas = 2;

  const toMinutes = (hora: string, minuto: string) =>
    (Number(hora) || 0) * 60 + (Number(minuto) || 0);

  // Calcular la hora mínima disponible para la siguiente franja (última confirmada + 30 min)
  const obtenerMinHoraSiguiente = () => {
    const confirmadas = franjas.filter((f) => f.confirmada);
    if (confirmadas.length === 0) return null;

    const ultima = confirmadas[confirmadas.length - 1];
    const minutos = toMinutes(ultima.hastaHora, ultima.hastaMinuto) + 30;

    const hora = Math.floor(minutos / 60);
    const minuto = minutos % 60;

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
            className={`flex items-center gap-2 mb-2 flex-wrap md:flex-nowrap rounded-md p-2 ${
              i > 0 && minSiguiente && !f.confirmada
                ? "bg-yellow-50 border border-yellow-300"
                : ""
            }`}
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
                minHora={i > 0 && minSiguiente ? minSiguiente.hora : "08"}
                minMinuteIfMinHour={
                  i > 0 && minSiguiente ? minSiguiente.minuto : "00"
                }
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
                minHora={
                  f.desdeHora !== "--"
                    ? String(Number(f.desdeHora) + 1).padStart(2, "0")
                    : "08"
                }
                minMinuteIfMinHour={f.desdeMinuto}
                disabled={f.confirmada}
              />

              <span className="text-sm">Hs</span>
            </div>

            <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
              {!f.confirmada ? (
                <button
                  title={
                    canConfirm
                      ? "Confirmar franja"
                      : "Franja inválida (mínimo 1 h)"
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

      {/* Botón para agregar franja */}
      <button
        disabled={!lastIsConfirmed || franjas.length >= maxFranjas}
        onClick={() =>
          setFranjas([
            ...franjas,
            {
              ...franjas[0],
              confirmada: false,
              desdeHora: minSiguiente ? minSiguiente.hora : "--",
              desdeMinuto: minSiguiente ? minSiguiente.minuto : "--",
              hastaHora: "--",
              hastaMinuto: "--",
              fecha: franjas[0]?.fecha || fechaInicial,
            },
          ])
        }
        className={`text-sm ${
          !lastIsConfirmed || franjas.length >= maxFranjas
            ? "text-gray-400 cursor-not-allowed"
            : "text-wash-primary hover:underline"
        }`}
      >
        + Agregar franja horaria
      </button>
    </>
  );
}


/* ================  PAGE  ================ */
export default function CanastoRopaBlancaPage() {
  const [cantidades, setCantidades] = React.useState<number[]>(services.map(() => 0));
  const [express, setExpress] = React.useState(false);
  const [seguro, setSeguro] = React.useState(false);

  const fechaInicial = new Date().toISOString().split("T")[0];
  const franjaBase: Franja = {
    fecha: fechaInicial,
    desdeHora: "--",
    desdeMinuto: "--",
    hastaHora: "--",
    hastaMinuto: "--",
    confirmada: false,
  };

  const [retiros, setRetiros] = React.useState<Franja[]>([{ ...franjaBase }]);
  const [devoluciones, setDevoluciones] = React.useState<Franja[]>([{ ...franjaBase }]);

  const [direccionRetiro, setDireccionRetiro] = React.useState("");
  const [direccionDevolucion, setDireccionDevolucion] = React.useState("");
  const [coordsRetiro, setCoordsRetiro] = React.useState<{ lat: number; lng: number } | null>(null);
  const [coordsDevolucion, setCoordsDevolucion] = React.useState<{ lat: number; lng: number } | null>(null);

  const subtotal = cantidades.reduce((acc, qty, idx) => acc + qty * services[idx].price, 0);
  const total = subtotal + (express ? 2000 : 0) + (seguro ? 3000 : 0);

  // ---------------- VALIDACIONES ----------------
  const allRetirosOk =
    retiros.length > 0 &&
    retiros.every((f) => f.confirmada && franjaValida1h(f));

  const allDevolucionesOk =
    devoluciones.length > 0 &&
    devoluciones.every((f) => f.confirmada && franjaValida1h(f));

  const anyCantidad = cantidades.some((c) => c > 0);

  const pedidoListo =
    allRetirosOk &&
    allDevolucionesOk &&
    anyCantidad &&
    !!direccionRetiro &&
    !!direccionDevolucion;
  return (
    <div>
      <section className="mb-10 mt-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Canasto de Ropa Blanca</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
          {services.map((s, i) => (
            <div
              key={i}
              className="flex flex-col justify-between items-center p-6 bg-white rounded-xl shadow hover:shadow-lg hover:scale-[1.02] transition-transform duration-300"
            >
              {s.icon}
              <span className="text-base font-semibold text-center mt-2 mb-2">{s.name}</span>
              <p className="text-sm text-gray-700 text-center mb-2">{s.description}</p>
              <p className="text-wash-primary font-bold mb-3">${s.price.toLocaleString()}</p>
              <CantidadInput
                value={cantidades[i]}
                onChange={(val) => {
                  const ns = [...cantidades];
                  ns[i] = val;
                  setCantidades(ns);
                }}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4 text-center">Pedido de Canastos de Ropa Blanca</h2>
        <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">Resumen:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              {services.map(
                (s, i) =>
                  cantidades[i] > 0 && (
                    <li key={i}>
                      {s.name}: {cantidades[i]} × ${s.price.toLocaleString()} = $
                      {(cantidades[i] * s.price).toLocaleString()}
                    </li>
                  )
              )}
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* RETIRO */}
            <div>
              <label className="block text-sm font-medium mb-2">Horario de Retiro</label>
              <div className="flex items-center mb-2">
                <Calendar className="w-5 h-5 text-wash-primary mr-2" />
                <input
                  type="date"
                  value={retiros[0].fecha}
                  onChange={(e) => setRetiros(retiros.map((r) => ({ ...r, fecha: e.target.value })))}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
              </div>

              {/* Franjas de Retiro */}
              <div className="mt-3">
                <RenderFranja tipo="retiro" franjas={retiros} setFranjas={setRetiros} fechaInicial={fechaInicial} />
              </div>

              {/* Dirección de Retiro */}
              <div className="mt-4">
                <DireccionesInput
                  tipo="retiro"
                  label="Dirección de Retiro"
                  value={direccionRetiro}
                  onChange={setDireccionRetiro}
                />
              </div>
            </div>

            {/* DEVOLUCIÓN */}
            <div>
              <label className="block text-sm font-medium mb-2">Horario de Devolución</label>
              <div className="flex items-center mb-2">
                <Calendar className="w-5 h-5 text-wash-primary mr-2" />
                <input
                  type="date"
                  value={devoluciones[0].fecha}
                  onChange={(e) =>
                    setDevoluciones(devoluciones.map((d) => ({ ...d, fecha: e.target.value })))
                  }
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
              </div>

              {/* Franjas de Devolución */}
              <div className="mt-3">
                <RenderFranja
                  tipo="devolucion"
                  franjas={devoluciones}
                  setFranjas={setDevoluciones}
                  fechaInicial={fechaInicial}
                />
              </div>

              {/* Dirección de Devolución */}
              <div className="mt-4">
                <DireccionesInput
                  tipo="devolucion"
                  label="Dirección de Devolución"
                  value={direccionDevolucion}
                  onChange={setDireccionDevolucion}
                />
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            Por favor, asegurá que haya una persona responsable disponible en los horarios seleccionados.
          </p>

          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" checked={express} onChange={() => setExpress(!express)} className="mr-2" />
              Retiro Express (+$2.000)
            </label>
            <label className="flex items-center">
              <input type="checkbox" checked={seguro} onChange={() => setSeguro(!seguro)} className="mr-2" />
              Asegurar Pedido (+$3.000)
            </label>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-lg font-bold text-wash-primary">Total estimado: ${total.toLocaleString()}</div>
            <button
              disabled={!pedidoListo}
              className={`px-6 py-2 rounded-md transition ${
                pedidoListo
                  ? "bg-wash-primary text-white hover:bg-blue-800"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              Confirmar Pedido
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
