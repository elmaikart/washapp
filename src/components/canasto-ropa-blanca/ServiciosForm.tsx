"use client";

import React from "react";
import { ShoppingBasket, Layers } from "lucide-react";
import CantidadInput from "@/components/CantidadInput";

const defaultServicios = [
  {
    name: "Blanca Eco",
    description: "Lavado y Secado. Jabón y Suavizante Genérico. Sin Blanqueador.",
    icon: <ShoppingBasket className="w-12 h-12 text-wash-primary mb-2" />,
    price: 10000,
  },
  {
    name: "Blanca Confort",
    description: "Lavado y Secado. Jabón Líquido + Suavizante Premium + Detergente Neutro.",
    icon: <ShoppingBasket className="w-12 h-12 text-wash-primary mb-2" />,
    price: 12000,
  },
  {
    name: "Blanca Extra",
    description: "Incluye Blanqueador + Detergente Neutro + Perfume para Ropa.",
    icon: <Layers className="w-12 h-12 text-wash-primary mb-2" />,
    price: 13500,
  },
];

export default function ServiciosForm({ servicios = defaultServicios, cantidades = {}, setCantidades }: any) {
  const handleChange = (index: number, nuevaCantidad: number) => {
    const updated = { ...cantidades, [index]: nuevaCantidad };
    setCantidades(updated);
  };

  return (
    <div className="bg-transparent pb-4">
      <h2 className="text-center text-xl md:text-2xl font-bold text-wash-primary pt-6 pb-2">
        Pedido de Canasto de Ropa Blanca
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center items-start px-4 max-w-6xl mx-auto mt-4">
        {servicios?.map((servicio: any, index: number) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 text-center flex flex-col justify-between min-h-[300px]"
          >
            <div className="flex flex-col items-center">
              {servicio.icon}
              <h3 className="text-wash-primary text-md font-semibold mb-2">{servicio.name}</h3>
              <p className="text-sm text-gray-600">{servicio.description}</p>
              <p className="text-wash-primary font-bold mt-2">${servicio.price.toLocaleString()}</p>
            </div>
            <div className="mt-4 flex justify-center">
              <CantidadInput
                cantidad={cantidades[index] || 0}
                setCantidad={(nuevaCantidad: number) => handleChange(index, nuevaCantidad)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
