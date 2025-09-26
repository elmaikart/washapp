// src/app/servicios/page.tsx

import React from "react";
import { Card, CardContent } from "@/components/card";
import  Input from "@/components/input";
import  Button from "@/components/button";
import { Search, Home, ShoppingCart, ListChecks, User, Shirt, Package, Star } from "lucide-react";

const services = [
  { label: "Canasto de Ropa", icon: <Package className="w-8 h-8 mb-2 text-[#0A2A45]" /> },
  { label: "Acolchados", icon: <Package className="w-8 h-8 mb-2 text-[#0A2A45]" /> },
  { label: "Camperas", icon: <Package className="w-8 h-8 mb-2 text-[#0A2A45]" /> },
  { label: "Sábanas", icon: <Package className="w-8 h-8 mb-2 text-[#0A2A45]" /> },
  { label: "Toallas", icon: <Package className="w-8 h-8 mb-2 text-[#0A2A45]" /> },
  { label: "Manteles", icon: <Package className="w-8 h-8 mb-2 text-[#0A2A45]" /> },
  { label: "Cortinas", icon: <Package className="w-8 h-8 mb-2 text-[#0A2A45]" /> },
  { label: "Secado", icon: <Package className="w-8 h-8 mb-2 text-[#0A2A45]" /> },
];

export default function ServiciosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5D7]">
      {/* Header con logo */}
      <header className="py-6 text-center">
        <h1 className="text-3xl font-bold text-[#0A2A45]">WashApp</h1>
      </header>

      {/* Contenido principal */}
      <main className="flex-1 px-4 py-6 space-y-6">
        {/* Buscador */}
        <div className="flex items-center gap-2 mb-6">
          <Input
            placeholder="¿Qué lavamos hoy?"
            className="rounded-full px-4 py-2 bg-white"
          />
          <Button className="flex items-center gap-1 rounded-full bg-[#0A2A45] text-white px-4 py-2">
            <Search className="w-4 h-4" />
            Buscar
          </Button>
        </div>

        {/* Servicios */}
        <div>
          <h2 className="text-xl font-semibold text-[#0A2A45] mb-3">Servicios</h2>
          <div className="grid grid-cols-4 gap-4">
            {services.map((service, index) => (
              <Card key={index} className="bg-white text-center p-2 border border-gray-300 shadow rounded-xl">
                <CardContent className="flex flex-col items-center justify-center p-2">
                  {service.icon}
                  <p className="text-sm font-medium text-[#0A2A45]">{service.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Banners Promocionales */}
        <div className="space-y-4">
          <Card className="bg-[#0A2A45] text-white rounded-xl shadow border border-gray-300">
            <CardContent className="p-4 flex items-center gap-3">
              <Star className="w-8 h-8" />
              <div className="flex flex-col">
                <p className="text-lg font-semibold">Promo: 50% de Descuento</p>
                <p className="text-sm">en el 3er Canasto</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#FFD700] text-[#0A2A45] rounded-xl shadow border border-gray-300">
            <CardContent className="p-4 flex items-center gap-3">
              <Package className="w-8 h-8" />
              <div className="flex flex-col">
                <p className="text-lg font-semibold">Compra el Bolso Oficial</p>
                <p className="text-sm">50% de Reintegro en tu 1er pedido</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer de navegación */}
      <footer className="border-t bg-white py-3">
        <nav className="flex justify-around text-[#0A2A45] text-sm">
          <a href="/" className="flex flex-col items-center">
            <Home className="w-5 h-5 mb-1" />
            <span>Inicio</span>
          </a>
          <a href="/servicios" className="flex flex-col items-center">
            <Shirt className="w-5 h-5 mb-1" />
            <span>Servicios</span>
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
