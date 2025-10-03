"use client";

import React, { useEffect, useRef } from "react";
import { ShoppingBasket, Layers, Clock, Calendar } from "lucide-react";

// Lista de servicios con descripción y precios
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

export default function InicioPage() {
  // Estado para cantidades
  const [cantidades, setCantidades] = React.useState<number[]>(
    services.map(() => 0)
  );

  // Estado para opciones extra
  const [express, setExpress] = React.useState(false);
  const [seguro, setSeguro] = React.useState(false);

  // Estado para franjas horarias
  const [retiros, setRetiros] = React.useState([
    {
      fecha: "",
      desdeHora: "--",
      desdeMinuto: "--",
      hastaHora: "--",
      hastaMinuto: "--",
    },
  ]);
  const [devoluciones, setDevoluciones] = React.useState([
    {
      fecha: "",
      desdeHora: "--",
      desdeMinuto: "--",
      hastaHora: "--",
      hastaMinuto: "--",
    },
  ]);

  // Direcciones
  const [direccionRetiro, setDireccionRetiro] = React.useState("");
  const [direccionDevolucion, setDireccionDevolucion] = React.useState("");

  // Total calculado
  const subtotal = cantidades.reduce(
    (acc, qty, idx) => acc + qty * services[idx].price,
    0
  );
  const total = subtotal + (express ? 2000 : 0) + (seguro ? 3000 : 0);

  // Arrays para horas y minutos
  const horas = Array.from({ length: 12 }, (_, i) =>
    (i + 8).toString().padStart(2, "0")
  );
  const minutos = ["00", "15", "30", "45"];

  // Helpers
  const toMinutes = (h: string, m: string) => {
    if (h === "--" || m === "--") return null;
    return parseInt(h) * 60 + parseInt(m);
  };

  // 🔹 Bloque compacto hora:minuto con límites y cierre onClick afuera
  const TimeBlock = ({
    hora,
    minuto,
    setHora,
    setMinuto,
    minMinutes = null, // si se setea, fuerza que hora:min > minMinutes
  }: {
    hora: string;
    minuto: string;
    setHora: (v: string) => void;
    setMinuto: (v: string) => void;
    minMinutes?: number | null;
  }) => {
    const [showHoras, setShowHoras] = React.useState(false);
    const [showMinutos, setShowMinutos] = React.useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Cerrar dropdowns al click afuera
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          setShowHoras(false);
          setShowMinutos(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Derivados para deshabilitar opciones
    const minH =
      minMinutes !== null ? Math.floor(minMinutes / 60).toString().padStart(2, "0") : null;
    const minM = minMinutes !== null ? minMinutes % 60 : null;

    const hourDisabled = (h: string) => {
      if (minMinutes === null) return false;
      // Horas estrictamente menores al mínimo, deshabilitadas
      return parseInt(h) < parseInt(minH!);
    };

    const minuteDisabled = (m: string, hCurrent: string) => {
      if (minMinutes === null) return false;
      // Si estamos en la hora mínima, los minutos <= mínimo quedan deshabilitados
      if (hCurrent === minH) {
        return parseInt(m) <= (minM as number);
      }
      return false;
    };

    const pickHour = (h: string) => {
      if (hourDisabled(h)) return;
      setHora(h);
      // Si al cambiar la hora, el minuto deja de ser válido, lo reseteo
      if (minMinutes !== null && h === minH && minuto !== "--" && parseInt(minuto) <= (minM as number)) {
        setMinuto("--");
      }
      setShowHoras(false);
    };

    const pickMinute = (m: string) => {
      if (minuteDisabled(m, hora)) return;
      setMinuto(m);
      setShowMinutos(false);
    };

    return (
      <div
        ref={ref}
        className="relative flex items-center bg-wash-primary text-white rounded-md px-2 py-1"
      >
        {/* Selector de horas */}
        <button
          type="button"
          className="px-2 py-1"
          onClick={() => {
            setShowHoras(!showHoras);
            setShowMinutos(false);
          }}
        >
          {hora}
        </button>

        {showHoras && (
          <div className="absolute top-full left-0 mt-1 grid grid-cols-4 gap-2 bg-white text-black p-2 rounded shadow z-50 w-40">
            {horas.map((h) => {
              const disabled = hourDisabled(h);
              return (
                <button
                  key={h}
                  onClick={() => pickHour(h)}
                  className={`px-2 py-1 rounded text-sm text-center ${
                    disabled
                      ? "opacity-40 cursor-not-allowed"
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

        {/* Selector de minutos */}
        <button
          type="button"
          className="px-2 py-1"
          onClick={() => {
            setShowMinutos(!showMinutos);
            setShowHoras(false);
          }}
        >
          {minuto}
        </button>

        {showMinutos && (
          <div className="absolute top-full left-0 mt-1 grid grid-cols-2 gap-2 bg-white text-black p-2 rounded shadow z-50 w-24">
            {minutos.map((m) => {
              const disabled = minuteDisabled(m, hora);
              return (
                <button
                  key={m}
                  onClick={() => pickMinute(m)}
                  className={`px-2 py-1 rounded text-sm text-center ${
                    disabled
                      ? "opacity-40 cursor-not-allowed"
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
  };

  return (
    <main className="min-h-screen pb-32 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl pt-20">
        {/* Canasto de Ropa Blanca */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Canasto de Ropa Blanca</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto p-2">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex flex-col justify-between items-center p-6 bg-white rounded-xl shadow hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 min-h-[360px]"
              >
                {service.icon}
                <span className="text-base font-semibold text-center mt-2 mb-2">
                  {service.name}
                </span>
                <p className="text-sm text-gray-700 text-center mb-2">
                  {service.description}
                </p>
                <p className="text-wash-primary font-bold mb-3">
                  ${service.price.toLocaleString()}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <label
                    className="text-sm text-gray-600 font-medium"
                    htmlFor={`cantidad-${index}`}
                  >
                    Cantidad:
                  </label>
                  <input
                    type="number"
                    id={`cantidad-${index}`}
                    min={0}
                    value={cantidades[index]}
                    onChange={(e) => {
                      const nuevaCantidad = parseInt(e.target.value) || 0;
                      const nuevasCantidades = [...cantidades];
                      nuevasCantidades[index] = nuevaCantidad;
                      setCantidades(nuevasCantidades);
                    }}
                    className="w-20 text-center border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-wash-primary text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pedido de Canastos */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">
            Pedido de Canastos de Ropa Blanca
          </h2>
          <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Horario de Retiro */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Horario de Retiro
                </label>

                <div className="flex items-center mb-2">
                  <Calendar className="w-5 h-5 text-wash-primary mr-2" />
                  <input
                    type="date"
                    value={retiros[0].fecha}
                    onChange={(e) => {
                      const nuevaFecha = e.target.value;
                      const nuevos = retiros.map((f) => ({ ...f, fecha: nuevaFecha }));
                      setRetiros(nuevos);
                    }}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  />
                </div>

                {retiros.map((r, i) => {
                  const minForHasta = toMinutes(r.desdeHora, r.desdeMinuto);
                  return (
                    <div key={i} className="mb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-wash-primary" />
                        <span className="text-sm">Entre</span>

                        {/* Desde */}
                        <TimeBlock
                          hora={r.desdeHora}
                          minuto={r.desdeMinuto}
                          setHora={(val) => {
                            const nuevos = [...retiros];
                            nuevos[i].desdeHora = val;
                            setRetiros(nuevos);
                          }}
                          setMinuto={(val) => {
                            const nuevos = [...retiros];
                            nuevos[i].desdeMinuto = val;
                            setRetiros(nuevos);
                          }}
                        />

                        <span className="text-sm">y</span>

                        {/* Hasta (con límite > desde) */}
                        <TimeBlock
                          hora={r.hastaHora}
                          minuto={r.hastaMinuto}
                          setHora={(val) => {
                            const nuevos = [...retiros];
                            nuevos[i].hastaHora = val;
                            setRetiros(nuevos);
                          }}
                          setMinuto={(val) => {
                            const nuevos = [...retiros];
                            nuevos[i].hastaMinuto = val;
                            setRetiros(nuevos);
                          }}
                          minMinutes={minForHasta} // <-- regla acá
                        />
                        <span className="text-sm">Hs</span>
                      </div>
                    </div>
                  );
                })}

                {retiros.length < 3 && (
                  <button
                    type="button"
                    onClick={() =>
                      setRetiros([
                        ...retiros,
                        {
                          fecha: retiros[0]?.fecha || "",
                          desdeHora: "--",
                          desdeMinuto: "--",
                          hastaHora: "--",
                          hastaMinuto: "--",
                        },
                      ])
                    }
                    className="flex items-center text-sm text-wash-primary hover:underline"
                  >
                    + Agregar franja horaria
                  </button>
                )}

                {/* Dirección de Retiro */}
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">
                    Dirección de Retiro
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Av. Patria 1487"
                    value={direccionRetiro}
                    onChange={(e) => setDireccionRetiro(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-wash-primary"
                  />
                </div>
              </div>

              {/* Horario de Devolución */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Horario de Devolución
                </label>

                <div className="flex items-center mb-2">
                  <Calendar className="w-5 h-5 text-wash-primary mr-2" />
                  <input
                    type="date"
                    value={devoluciones[0].fecha}
                    onChange={(e) => {
                      const nuevaFecha = e.target.value;
                      const nuevos = devoluciones.map((f) => ({
                        ...f,
                        fecha: nuevaFecha,
                      }));
                      setDevoluciones(nuevos);
                    }}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  />
                </div>

                {devoluciones.map((d, i) => {
                  const minForHasta = toMinutes(d.desdeHora, d.desdeMinuto);
                  return (
                    <div key={i} className="mb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-wash-primary" />
                        <span className="text-sm">Entre</span>

                        {/* Desde */}
                        <TimeBlock
                          hora={d.desdeHora}
                          minuto={d.desdeMinuto}
                          setHora={(val) => {
                            const nuevos = [...devoluciones];
                            nuevos[i].desdeHora = val;
                            setDevoluciones(nuevos);
                          }}
                          setMinuto={(val) => {
                            const nuevos = [...devoluciones];
                            nuevos[i].desdeMinuto = val;
                            setDevoluciones(nuevos);
                          }}
                        />

                        <span className="text-sm">y</span>

                        {/* Hasta (con límite > desde) */}
                        <TimeBlock
                          hora={d.hastaHora}
                          minuto={d.hastaMinuto}
                          setHora={(val) => {
                            const nuevos = [...devoluciones];
                            nuevos[i].hastaHora = val;
                            setDevoluciones(nuevos);
                          }}
                          setMinuto={(val) => {
                            const nuevos = [...devoluciones];
                            nuevos[i].hastaMinuto = val;
                            setDevoluciones(nuevos);
                          }}
                          minMinutes={minForHasta} // <-- regla acá
                        />
                        <span className="text-sm">Hs</span>
                      </div>
                    </div>
                  );
                })}

                {devoluciones.length < 3 && (
                  <button
                    type="button"
                    onClick={() =>
                      setDevoluciones([
                        ...devoluciones,
                        {
                          fecha: devoluciones[0]?.fecha || "",
                          desdeHora: "--",
                          desdeMinuto: "--",
                          hastaHora: "--",
                          hastaMinuto: "--",
                        },
                      ])
                    }
                    className="flex items-center text-sm text-wash-primary hover:underline"
                  >
                    + Agregar franja horaria
                  </button>
                )}

                {/* Dirección de Devolución */}
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">
                    Dirección de Devolución
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Calle San Martín 2000"
                    value={direccionDevolucion}
                    onChange={(e) => setDireccionDevolucion(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-wash-primary"
                  />
                </div>
              </div>
            </div>

            {/* Nota */}
            <p className="text-xs text-gray-500">
              Por favor, asegurá que haya una persona responsable disponible en
              los horarios seleccionados para la entrega o retiro de tus pedidos.
            </p>

            {/* Opciones */}
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
                Asegurar Pedido con aseguradora externa (+$3.000)
              </label>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center">
              <div className="text-lg font-bold text-wash-primary">
                Total estimado: ${total.toLocaleString()}
              </div>
              <button className="bg-wash-primary text-white px-6 py-2 rounded-md hover:bg-blue-800 transition">
                Confirmar Pedido
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-wash-primary text-white py-3 shadow-inner z-50">
        <div className="mx-auto max-w-[800px] px-4 flex justify-between items-center">
          <button className="flex flex-col items-center text-xs">
            <span>🏠</span>
            <span>Inicio</span>
          </button>
          <button className="flex flex-col items-center text-xs">
            <span>📋</span>
            <span>Actividades</span>
          </button>
          <button className="flex flex-col items-center text-xs">
            <span>👤</span>
            <span>Cuenta</span>
          </button>
        </div>
      </footer>
    </main>
  );
}
