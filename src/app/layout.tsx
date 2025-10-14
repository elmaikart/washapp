<header className="w-full bg-wash-primary text-white px-4 py-3 flex items-center">
  <h1 className="text-xl font-bold tracking-wide">WashApp</h1>
</header>

// src/app/layout.tsx
import "@/styles/globals.css";
import { Quicksand } from "next/font/google";
import type { Metadata } from "next";
import React from "react";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ✅ Tipografía principal
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WashApp",
  description: "Tu lavadero de confianza",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {/* ✅ Google Maps Script, solo si la variable está definida */}
        {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
          <Script
            async
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body
        className={`bg-wash-bg text-black font-sans antialiased ${quicksand.className}`}
      >
        {/* 🔹 Header fijo (siempre visible) */}
        <Header />

        {/* 🔹 Contenido principal */}
        <main className="w-full max-w-4xl mx-auto px-4 pb-32 pt-12">
          {children}
        </main>

        {/* 🔹 Footer con espacio inferior para evitar solapamiento */}
        <Footer />
      </body>
    </html>
  );
}
