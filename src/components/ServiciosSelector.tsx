"use client";

import React from "react";
import { ShoppingBasket } from "lucide-react";

type Servicio = {
  name: string;
  description: string;
  price: number;
};

type Props = {
  servicios: Servicio[];
  cantidades: number[];
  setCantidades: (val: number[]) => void;
};

export default function ServiciosSelector({ servicios, cantidades, setCantidades }: Props) {
  const handleCantidadChange = (index: number, value: number) => {
    const nuevasCantidades = [...cantidades];
    nuevasCantidades[index] = value;
    setCantidades(nuevasCantidades);
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {servicios.map((servicio, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-xl p-4 shadow-sm bg-white"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <ShoppingBasket className="w-10 h-10 text-wash-primary" />
              <div>
                <p className="font-bold text-lg">{servicio.name}</p>
                <p className="text-sm text-gray-600">{servicio.description}</p>
                <p className="text-wash-primary font-semibold mt-1">
                  ${servicio.price.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="bg-gray-200 px-3 py-1 rounded-full text-lg"
                onClick={() =>
                  handleCantidadChange(index, Math.max(0, cantidades[index] - 1))
                }
              >
                −
              </button>
              <span className="w-6 text-center">{cantidades[index]}</span>
              <button
                type="button"
                className="bg-gray-200 px-3 py-1 rounded-full text-lg"
                onClick={() =>
                  handleCantidadChange(index, cantidades[index] + 1)
                }
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
