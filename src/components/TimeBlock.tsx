"use client";

import React from "react";

const horas = Array.from({ length: 12 }, (_, i) => String(i + 8).padStart(2, "0"));
const minutos = ["00", "15", "30", "45"];

type Props = {
  desdeHora: string;
  desdeMinuto: string;
  hastaHora: string;
  hastaMinuto: string;
  onChange: (desdeH: string, desdeM: string, hastaH: string, hastaM: string) => void;
};

export default function TimeBlock({
  desdeHora,
  desdeMinuto,
  hastaHora,
  hastaMinuto,
  onChange,
}: Props) {
  const [showHorasDesde, setShowHorasDesde] = React.useState(false);
  const [showMinutosDesde, setShowMinutosDesde] = React.useState(false);
  const [showHorasHasta, setShowHorasHasta] = React.useState(false);
  const [showMinutosHasta, setShowMinutosHasta] = React.useState(false);

  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowHorasDesde(false);
        setShowMinutosDesde(false);
        setShowHorasHasta(false);
        setShowMinutosHasta(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="flex gap-1 text-white text-sm bg-wash-primary rounded-md px-2 py-1 relative">
      {/* DESDE */}
      <div className="flex items-center gap-1">
        <button type="button" onClick={() => setShowHorasDesde(!showHorasDesde)}>
          {desdeHora}
        </button>
        :
        <button type="button" onClick={() => setShowMinutosDesde(!showMinutosDesde)}>
          {desdeMinuto}
        </button>
        {showHorasDesde && (
          <div className="absolute top-full mt-1 left-0 grid grid-cols-4 gap-1 bg-white text-black p-2 rounded shadow z-50">
            {horas.map((h) => (
              <button
                key={h}
                onClick={() => {
                  onChange(h, desdeMinuto, hastaHora, hastaMinuto);
                  setShowHorasDesde(false);
                }}
                className="px-2 py-1 hover:bg-wash-primary hover:text-white rounded"
              >
                {h}
              </button>
            ))}
          </div>
        )}
        {showMinutosDesde && (
          <div className="absolute top-full mt-1 left-0 grid grid-cols-2 gap-1 bg-white text-black p-2 rounded shadow z-50 w-24">
            {minutos.map((m) => (
              <button
                key={m}
                onClick={() => {
                  onChange(desdeHora, m, hastaHora, hastaMinuto);
                  setShowMinutosDesde(false);
                }}
                className="px-2 py-1 hover:bg-wash-primary hover:text-white rounded"
              >
                {m}
              </button>
            ))}
          </div>
        )}
      </div>

      <span>-</span>

      {/* HASTA */}
      <div className="flex items-center gap-1">
        <button type="button" onClick={() => setShowHorasHasta(!showHorasHasta)}>
          {hastaHora}
        </button>
        :
        <button type="button" onClick={() => setShowMinutosHasta(!showMinutosHasta)}>
          {hastaMinuto}
        </button>
        {showHorasHasta && (
          <div className="absolute top-full mt-1 right-0 grid grid-cols-4 gap-1 bg-white text-black p-2 rounded shadow z-50">
            {horas.map((h) => (
              <button
                key={h}
                onClick={() => {
                  onChange(desdeHora, desdeMinuto, h, hastaMinuto);
                  setShowHorasHasta(false);
                }}
                className="px-2 py-1 hover:bg-wash-primary hover:text-white rounded"
              >
                {h}
              </button>
            ))}
          </div>
        )}
        {showMinutosHasta && (
          <div className="absolute top-full mt-1 right-0 grid grid-cols-2 gap-1 bg-white text-black p-2 rounded shadow z-50 w-24">
            {minutos.map((m) => (
              <button
                key={m}
                onClick={() => {
                  onChange(desdeHora, desdeMinuto, hastaHora, m);
                  setShowMinutosHasta(false);
                }}
                className="px-2 py-1 hover:bg-wash-primary hover:text-white rounded"
              >
                {m}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}