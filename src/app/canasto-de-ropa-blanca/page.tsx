"use client";

import React from "react";
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

export default function CanastoRopaBlancaPage() {
  // Estado para cantidades
  const [cantidades, setCantidades] = React.useState<number[]>(
    services.map(() => 0)
  );

  // Estado para opciones extra
  const [express, setExpress] = React.useState(false);
  const [seguro, setSeguro] = React.useState(false);

  // Estado para franjas horarias
  const [retiros, setRetiros] = React.useState([
    { fecha: "", desdeHora: "--", desdeMinuto: "--", hastaHora: "--", hastaMinuto: "--" },
  ]);
  const [devoluciones, setDevoluciones] = React.useState([
    { fecha: "", desdeHora: "--", desdeMinuto: "--", hastaHora: "--", hastaMinuto: "--" },
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
  const horas = Array.from({ length: 12 }, (_, i) => (i + 8).toString().padStart(2, "0"));
  const minutos = ["00", "15", "30", "45"];

  // 🔹 TimeBlock con cierre automático y validación
  const TimeBlock = ({
    hora,
    minuto,
    setHora,
    setMinuto,
    minHora = "08",
  }: {
    hora: string;
    minuto: string;
    setHora: (v: string) => void;
    setMinuto: (v: string) => void;
    minHora?: string;
  }) => {
    const [showHoras, setShowHoras] = React.useState(false);
    const [showMinutos, setShowMinutos] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>(null);

    // 🔹 Cerrar si hago clic fuera
    React.useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setShowHoras(false);
          setShowMinutos(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <div ref={ref} className="relative flex items-center bg-wash-primary text-white rounded-md px-2 py-1">
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
            {minutos.map((m) => (
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
  };

  return (
    <div>
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
        <h2 className="text-xl font-semibold mb-4">Pedido de Canastos de Ropa Blanca</h2>
        <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
          {/* 🧾 Resumen */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Resumen:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              {services.map((service, index) => {
                const quantity = cantidades[index];
                if (quantity > 0) {
                  return (
                    <li key={index}>
                      {service.name}: {quantity} × ${service.price.toLocaleString()} = ${(
                        quantity * service.price
                      ).toLocaleString()}
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </div>

          {/* 🕒 Horarios + Direcciones */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Horario de Retiro */}
            <div>
              <label className="block text-sm font-medium mb-2">Horario de Retiro</label>
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

              {retiros.map((r, i) => (
                <div key={i} className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-wash-primary" />
                  <span className="text-sm">Entre</span>
                  <TimeBlock
                    hora={r.desdeHora}
                    minuto={r.desdeMinuto}
                    setHora={(val: string) => {
                      const nuevos = [...retiros];
                      nuevos[i].desdeHora = val;
                      setRetiros(nuevos);
                    }}
                    setMinuto={(val: string) => {
                      const nuevos = [...retiros];
                      nuevos[i].desdeMinuto = val;
                      setRetiros(nuevos);
                    }}
                  />
                  <span className="text-sm">y</span>
                  <TimeBlock
                    hora={r.hastaHora}
                    minuto={r.hastaMinuto}
                    setHora={(val: string) => {
                      const nuevos = [...retiros];
                      nuevos[i].hastaHora = val;
                      setRetiros(nuevos);
                    }}
                    setMinuto={(val: string) => {
                      const nuevos = [...retiros];
                      nuevos[i].hastaMinuto = val;
                      setRetiros(nuevos);
                    }}
                    minHora={r.desdeHora !== "--" ? r.desdeHora : "08"}
                  />
                  <span className="text-sm">Hs</span>
                </div>
              ))}

              {retiros.length < 3 && (
                <button
                  type="button"
                  onClick={() =>
                    setRetiros([
                      ...retiros,
                      { fecha: retiros[0]?.fecha || "", desdeHora: "--", desdeMinuto: "--", hastaHora: "--", hastaMinuto: "--" },
                    ])
                  }
                  className="flex items-center text-sm text-wash-primary hover:underline"
                >
                  + Agregar franja horaria
                </button>
              )}

              {/* Dirección de Retiro */}
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Dirección de Retiro</label>
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
              <label className="block text-sm font-medium mb-2">Horario de Devolución</label>
              <div className="flex items-center mb-2">
                <Calendar className="w-5 h-5 text-wash-primary mr-2" />
                <input
                  type="date"
                  value={devoluciones[0].fecha}
                  onChange={(e) => {
                    const nuevaFecha = e.target.value;
                    const nuevos = devoluciones.map((f) => ({ ...f, fecha: nuevaFecha }));
                    setDevoluciones(nuevos);
                  }}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
              </div>

              {devoluciones.map((d, i) => (
                <div key={i} className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-wash-primary" />
                  <span className="text-sm">Entre</span>
                  <TimeBlock
                    hora={d.desdeHora}
                    minuto={d.desdeMinuto}
                    setHora={(val: string) => {
                      const nuevos = [...devoluciones];
                      nuevos[i].desdeHora = val;
                      setDevoluciones(nuevos);
                    }}
                    setMinuto={(val: string) => {
                      const nuevos = [...devoluciones];
                      nuevos[i].desdeMinuto = val;
                      setDevoluciones(nuevos);
                    }}
                  />
                  <span className="text-sm">y</span>
                  <TimeBlock
                    hora={d.hastaHora}
                    minuto={d.hastaMinuto}
                    setHora={(val: string) => {
                      const nuevos = [...devoluciones];
                      nuevos[i].hastaHora = val;
                      setDevoluciones(nuevos);
                    }}
                    setMinuto={(val: string) => {
                      const nuevos = [...devoluciones];
                      nuevos[i].hastaMinuto = val;
                      setDevoluciones(nuevos);
                    }}
                    minHora={d.desdeHora !== "--" ? d.desdeHora : "08"}
                  />
                  <span className="text-sm">Hs</span>
                </div>
              ))}

              {devoluciones.length < 3 && (
                <button
                  type="button"
                  onClick={() =>
                    setDevoluciones([
                      ...devoluciones,
                      { fecha: devoluciones[0]?.fecha || "", desdeHora: "--", desdeMinuto: "--", hastaHora: "--", hastaMinuto: "--" },
                    ])
                  }
                  className="flex items-center text-sm text-wash-primary hover:underline"
                >
                  + Agregar franja horaria
                </button>
              )}

              {/* Dirección de Devolución */}
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Dirección de Devolución</label>
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

          {/* ⚠️ Nota amable */}
          <p className="text-xs text-gray-500">
            Por favor, asegurá que haya una persona responsable disponible en los horarios seleccionados para la entrega o retiro de tus pedidos.
          </p>

          {/* ⚙️ Opciones */}
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

          {/* 💳 Total */}
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
  );
}
