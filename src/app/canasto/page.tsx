// src/app/canasto/page.tsx
"use client";

import React from "react";
import Card, { CardContent } from "@/components/card"; 
import Input from "@/components/input";
import Button from "@/components/button";
import { Search, Home, ShoppingCart, ListChecks, User, Shirt, Package, Star } from "lucide-react";

const prendasBlancas = [
  { title: "Blanco Eco", desc: "Prendas blancas - servicio económico", price: 10000 },
  { title: "Extra Blanco Eco", desc: "Prendas blancas con blanqueador - servicio económico", price: 12000 },
  { title: "Blanco Confort", desc: "Prendas blancas con Skip + Confort", price: 13000 },
  { title: "Extra Blanco Confort", desc: "Prendas blancas con blanqueador + Skip + Confort", price: 15000 },
];

const prendasColor = [
  { title: "Color Eco", desc: "Prendas de color - servicio económico", price: 10000 },
  { title: "Color Confort", desc: "Prendas de color con Skip + Confort", price: 13000 },
  { title: "Secado", desc: "Solo servicio de secado", price: 7000 },
];

export default function CanastoPage() {
  const [cantidadesBlanco, setCantidadesBlanco] = useState<number[]>(Array(prendasBlancas.length).fill(0));
  const [cantidadesColor, setCantidadesColor] = useState<number[]>(Array(prendasColor.length).fill(0));

  const handleChange = (index: number, value: number, tipo: "blanco" | "color") => {
    if (tipo === "blanco") {
      const nuevas = [...cantidadesBlanco];
      nuevas[index] = value;
      setCantidadesBlanco(nuevas);
    } else {
      const nuevas = [...cantidadesColor];
      nuevas[index] = value;
      setCantidadesColor(nuevas);
    }
  };

  const total =
    prendasBlancas.reduce((acc, c, i) => acc + c.price * cantidadesBlanco[i], 0) +
    prendasColor.reduce((acc, c, i) => acc + c.price * cantidadesColor[i], 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5D7]">
      {/* Header con logo */}
      <header className="py-6 text-center">
        <h1 className="text-3xl font-bold text-[#0A2A45]">WashApp</h1>
      </header>

      {/* Título de la página */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold text-[#0A2A45]">
          Pedido de Canasto de Ropa
        </h2>
      </div>

      {/* Galería en dos columnas */}
      <main className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4 gap-6">
          {/* Columna prendas blancas */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#0A2A45] mb-2">Prendas Blancas</h3>
            {prendasBlancas.map((item, index) => (
              <Card key={index} className="bg-white border border-gray-300 shadow rounded-xl">
                <CardContent className="flex flex-col p-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <Package className="w-8 h-8 text-[#0A2A45]" />
                    <h4 className="text-md font-semibold text-[#0A2A45]">{item.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                  <p className="text-md font-bold text-[#0A2A45]">${item.price.toLocaleString()}</p>
                  <div className="flex items-center gap-2">
                    <label className="text-sm">Cantidad:</label>
                    <Input
                      type="number"
                      min="0"
                      value={cantidadesBlanco[index]}
                      onChange={(e) => handleChange(index, parseInt(e.target.value) || 0, "blanco")}
                      className="w-20 text-center"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Columna prendas color */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#0A2A45] mb-2">Prendas de Color</h3>
            {prendasColor.map((item, index) => (
              <Card key={index} className="bg-white border border-gray-300 shadow rounded-xl">
                <CardContent className="flex flex-col p-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <Package className="w-8 h-8 text-[#0A2A45]" />
                    <h4 className="text-md font-semibold text-[#0A2A45]">{item.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                  <p className="text-md font-bold text-[#0A2A45]">${item.price.toLocaleString()}</p>
                  <div className="flex items-center gap-2">
                    <label className="text-sm">Cantidad:</label>
                    <Input
                      type="number"
                      min="0"
                      value={cantidadesColor[index]}
                      onChange={(e) => handleChange(index, parseInt(e.target.value) || 0, "color")}
                      className="w-20 text-center"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Total del pedido */}
      <footer className="border-t bg-white py-4 px-6 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-[#0A2A45]">Total:</h2>
        <p className="text-xl font-bold text-[#0A2A45]">${total.toLocaleString()}</p>
        <Button className="bg-[#0A2A45] text-white rounded-full px-6">
          Confirmar Pedido
        </Button>
      </footer>

      {/* Footer navegación */}
      <footer className="border-t bg-white py-3">
        <nav className="flex justify-around text-[#0A2A45] text-sm">
          <a href="/servicios" className="flex flex-col items-center">
            <Home className="w-5 h-5 mb-1" />
            <span>Inicio</span>
          </a>
          <a href="/carrito" className="flex flex-col items-center">
            <ShoppingCart className="w-5 h-5 mb-1" />
            <span>Carrito</span>
          </a>
          <a href="/actividades" className="flex flex-col items-center">
            <ListChecks className="w-5 h-5 mb-1" />
            <span>Actividades</span>
          </a>
          <a href="/cuenta" className="flex flex-col items-center">
            <User className="w-5 h-5 mb-1" />
            <span>Cuenta</span>
          </a>
        </nav>
      </footer>
    </div>
  );
}
