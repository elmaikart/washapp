"use client";

import React from "react";
import { ShoppingBasket, Layers, Clock } from "lucide-react";

// Lista de servicios con descripción y precios
const services = [
  {
    name: "Blanca Eco",
    description: "Lavado y Secado. Jabón y Suavizante Genérico. Sin Blanqueador.",
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
    description: "Incluye Blanqueador + Detergente Neutro + Perfume para Ropa.",
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

  // Estado para horarios dinámicos
  const [retiros, setRetiros] = React.useState<string[]>([""]);
  const [devoluciones, setDevoluciones] = React.useState<string[]>([""]);

  // Total calculado
  const subtotal = cantidades.reduce(
    (acc, qty, idx) => acc + qty * services[idx].price,
    0
  );
  const total = subtotal + (express ? 2000 : 0) + (seguro ? 3000 : 0);

  return (
    <main className="min-h-screen pb-32 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl pt-20">
        <header className="w-full fixed top-0 left-0 right-0 bg-wash-bg shadow z-50 px-4 py-3">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-wash-primary">
              WashApp
            </h1>
          </div>
        </header>

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
                {/* 💲 Precio */}
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
            {/* 🧾 Resumen */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Resumen:</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                {services.map((service, index) => {
                  const quantity = cantidades[index];
                  if (quantity > 0) {
                    return (
                      <li key={index}>
                        {service.name}: {quantity} × $
                        {service.price.toLocaleString()} = $
                        {(quantity * service.price).toLocaleString()}
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>

            {/* 🕒 Horarios y direcciones */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Horario de Retiro */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Horario de Retiro
                </label>
                {retiros.map((r, i) => (
                  <input
                    key={i}
                    type="datetime-local"
                    value={r}
                    onChange={(e) => {
                      const nuevos = [...retiros];
                      nuevos[i] = e.target.value;
                      setRetiros(nuevos);
                    }}
                    className="w-full mb-2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-wash-primary"
                  />
                ))}
                <button
                  type="button"
                  onClick={() => setRetiros([...retiros, ""])}
                  className="flex items-center text-sm text-wash-primary hover:underline"
                >
                  <Clock className="w-4 h-4 mr-1" /> Agregar horario
                </button>
              </div>

              {/* Horario de Devolución */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Horario de Devolución
                </label>
                {devoluciones.map((d, i) => (
                  <input
                    key={i}
                    type="datetime-local"
                    value={d}
                    onChange={(e) => {
                      const nuevos = [...devoluciones];
                      nuevos[i] = e.target.value;
                      setDevoluciones(nuevos);
                    }}
                    className="w-full mb-2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-wash-primary"
                  />
                ))}
                <button
                  type="button"
                  onClick={() => setDevoluciones([...devoluciones, ""])}
                  className="flex items-center text-sm text-wash-primary hover:underline"
                >
                  <Clock className="w-4 h-4 mr-1" /> Agregar horario
                </button>
              </div>

              {/* Dirección de Retiro */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Dirección de Retiro
                </label>
                <input
                  type="text"
                  placeholder="Ej: Av. Patria 1487"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-wash-primary"
                />
              </div>

              {/* Dirección de Devolución */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Dirección de Devolución
                </label>
                <input
                  type="text"
                  placeholder="Ej: Calle San Martín 2000"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-wash-primary"
                />
              </div>
            </div>

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
