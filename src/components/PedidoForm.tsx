"use client";

import React from "react";
import { Calendar } from "lucide-react";
import CantidadInput from "@/components/CantidadInputLegacy";
import DireccionesInput from "./DireccionesInput";
import RenderFranja from "@/components/RenderFranja";
import { Servicio } from "@/types/servicio";
import { Franja } from "@/types/franja";

type PedidoFormProps = {
  servicios: Servicio[];
  cantidades: number[];
  setCantidades: (cantidades: number[]) => void;
  direccion: string;
  setDireccion: (direccion: string) => void;
  notas: string;
  setNotas: (notas: string) => void;
  retiro: Franja[];
  setRetiro: React.Dispatch<React.SetStateAction<Franja[]>>;
  devolucion: Franja[];
  setDevolucion: React.Dispatch<React.SetStateAction<Franja[]>>;
  setConfirmado: () => void;
};

// Helpers
const toMins = (h: string, m: string) => Number(h) * 60 + Number(m);
const franjaCompleta = (f: Franja) =>
  f.desdeHora !== "--" && f.hastaHora !== "--" && f.hastaMinuto !== "--";
const franjaValida1h = (f: Franja) =>
  franjaCompleta(f) &&
  toMins(f.hastaHora, f.hastaMinuto) - toMins(f.desdeHora, f.desdeMinuto) >= 60;

export default function PedidoForm({
  servicios,
  cantidades,
  setCantidades,
  direccion,
  setDireccion,
  notas,
  setNotas,
  retiro,
  setRetiro,
  devolucion,
  setDevolucion,
  setConfirmado,
}: PedidoFormProps) {
  const [express, setExpress] = React.useState(false);
  const [seguro, setSeguro] = React.useState(false);
  const fechaInicial = new Date().toISOString().split("T")[0];

  const subtotal = cantidades.reduce((acc, qty, idx) => acc + qty * servicios[idx].price, 0);
  const total = subtotal + (express ? 2000 : 0) + (seguro ? 3000 : 0);

  const allRetirosOk = retiro.length > 0 && retiro.every((f) => f.confirmada && franjaValida1h(f));
  const allDevolucionesOk = devolucion.length > 0 && devolucion.every((f) => f.confirmada && franjaValida1h(f));
  const anyCantidad = cantidades.some((c) => c > 0);

  const pedidoListo = allRetirosOk && allDevolucionesOk && anyCantidad && !!direccion;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pedidoListo) setConfirmado();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Servicios */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Servicios</h3>
        {servicios.map((s, i) => (
          <div key={i} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
            <div>
              <p className="font-medium">{s.name}</p>
              <p className="text-sm text-gray-500">${s.price.toLocaleString()}</p>
            </div>
            <CantidadInput
              value={cantidades[i]}
              onChange={(val) => {
                const nuevas = [...cantidades];
                nuevas[i] = val;
                setCantidades(nuevas);
              }}
            />
          </div>
        ))}
      </div>

      {/* Dirección */}
      <DireccionesInput
        tipo="retiro"
        label="Dirección de retiro"
        value={direccion}
        onChange={setDireccion}
      />

      {/* Notas */}
      <div>
        <label className="text-sm font-medium block mb-1">Notas adicionales</label>
        <textarea
          className="w-full border rounded-lg px-3 py-2"
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
          placeholder="Ej: Timbre roto, llamar al llegar"
        />
      </div>

      {/* Horarios */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* RETIRO */}
        <div>
          <label className="block text-sm font-medium mb-2">Horario de Retiro</label>
          <div className="flex items-center mb-2">
            <Calendar className="w-5 h-5 text-wash-primary mr-2" />
            <input
              type="date"
              value={retiro[0]?.fecha || fechaInicial}
              onChange={(e) =>
                setRetiro(retiro.map((r) => ({ ...r, fecha: e.target.value })))
              }
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <RenderFranja tipo="retiro" franjas={retiro} setFranjas={setRetiro} fechaInicial={fechaInicial} />
        </div>

        {/* DEVOLUCIÓN */}
        <div>
          <label className="block text-sm font-medium mb-2">Horario de Devolución</label>
          <div className="flex items-center mb-2">
            <Calendar className="w-5 h-5 text-wash-primary mr-2" />
            <input
              type="date"
              value={devolucion[0]?.fecha || fechaInicial}
              onChange={(e) =>
                setDevolucion(devolucion.map((d) => ({ ...d, fecha: e.target.value })))
              }
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <RenderFranja tipo="devolucion" franjas={devolucion} setFranjas={setDevolucion} fechaInicial={fechaInicial} />
        </div>
      </div>

      {/* Extras */}
      <div className="space-y-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={express}
            onChange={() => setExpress(!express)}
            className="mr-2"
          />
          Retiro Express (+$2.000)
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={seguro}
            onChange={() => setSeguro(!seguro)}
            className="mr-2"
          />
          Asegurar Pedido (+$3.000)
        </label>
      </div>

      {/* Total + Botón */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-lg font-bold text-wash-primary">
          Total estimado: ${total.toLocaleString()}
        </div>
        <button
          type="submit"
          disabled={!pedidoListo}
          className={`px-6 py-2 rounded-md transition font-semibold ${
            pedidoListo
              ? "bg-wash-primary text-white hover:bg-blue-800"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          Confirmar Pedido
        </button>
      </div>
    </form>
  );
}
