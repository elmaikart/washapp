"use client";

import React from "react";
import ResumenServicios from "./ResumenServicios";
import HorariosRetiro from "./HorariosRetiro";
import HorariosDevolucion from "./HorariosDevolucion";
import DireccionesInput from "./DireccionesInput";
import NotasInput from "./NotasInput";
import { CheckSquare } from "lucide-react";

interface Servicio {
  nombre: string;
  cantidad: number;
  precio: number;
}

interface Props {
  serviciosSeleccionados: Servicio[];
  fechaRetiro: string;
  setFechaRetiro: (value: string) => void;
  horaInicioRetiro: string;
  setHoraInicioRetiro: (value: string) => void;
  horaFinRetiro: string;
  setHoraFinRetiro: (value: string) => void;
  fechaDevolucion: string;
  setFechaDevolucion: (value: string) => void;
  horaInicioDevolucion: string;
  setHoraInicioDevolucion: (value: string) => void;
  horaFinDevolucion: string;
  setHoraFinDevolucion: (value: string) => void;
  direccionRetiro: string;
  setDireccionRetiro: (value: string) => void;
  direccionDevolucion: string;
  setDireccionDevolucion: (value: string) => void;
  notas: string;
  setNotas: (value: string) => void;
  express: boolean;
  setExpress: (value: boolean) => void;
  seguro: boolean;
  setSeguro: (value: boolean) => void;
  onConfirmar: () => void;
}

const FormularioPedido: React.FC<Props> = ({
  serviciosSeleccionados,
  fechaRetiro,
  setFechaRetiro,
  horaInicioRetiro,
  setHoraInicioRetiro,
  horaFinRetiro,
  setHoraFinRetiro,
  fechaDevolucion,
  setFechaDevolucion,
  horaInicioDevolucion,
  setHoraInicioDevolucion,
  horaFinDevolucion,
  setHoraFinDevolucion,
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
}) => {
  const subtotal = serviciosSeleccionados.reduce(
    (acc, s) => acc + s.precio * s.cantidad,
    0
  );
  const cargoExtra = (express ? 2000 : 0) + (seguro ? 3000 : 0);
  const total = subtotal + cargoExtra;

  return (
    <section className="bg-white rounded-2xl shadow-lg p-6 mt-6 space-y-5">
      {/* Resumen */}
      <ResumenServicios serviciosSeleccionados={serviciosSeleccionados} />

      {/* Horarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <HorariosRetiro
          titulo="Retiro Programado"
          fechaRetiro={fechaRetiro}
          setFechaRetiro={setFechaRetiro}
          franjasRetiro={[]}
          setFranjasRetiro={() => {}}
        />
        <HorariosDevolucion
          titulo="Devolución Programada"
          fechaDevolucion={fechaDevolucion}
          setFechaDevolucion={setFechaDevolucion}
          franjasDevolucion={[]}
          setFranjasDevolucion={() => {}}
        />
      </div>

      {/* Direcciones */}
      <DireccionesInput
        direccionRetiro={direccionRetiro}
        setDireccionRetiro={setDireccionRetiro}
        direccionDevolucion={direccionDevolucion}
        setDireccionDevolucion={setDireccionDevolucion}
      />

      {/* Notas */}
      <NotasInput notas={notas} setNotas={setNotas} />

      {/* Opciones extra */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={express}
                onChange={() => setExpress(!express)}
                className="accent-wash-primary"
              />
              Retiro Express (+$2.000)
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={seguro}
                onChange={() => setSeguro(!seguro)}
                className="accent-wash-primary"
              />
              Asegurar Pedido (+$3.000)
            </label>
          </div>

          {/* Total */}
          <div className="text-right">
            <p className="text-wash-primary font-semibold text-lg">
              Total estimado: ${total.toLocaleString("es-AR")}
            </p>
            <button
              onClick={onConfirmar}
              className="mt-2 bg-wash-primary hover:bg-wash-dark text-white px-6 py-2 rounded-full flex items-center gap-2 transition"
            >
              <CheckSquare className="w-5 h-5" />
              Confirmar Pedido
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormularioPedido;
