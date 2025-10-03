// src/app/layout.tsx
import "@/styles/globals.css";
import { Quicksand } from "next/font/google";
import type { Metadata } from "next";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer"; // 👈 importamos el Footer

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
    <html lang="es">
      <body className={`bg-wash-bg text-black ${quicksand.className}`}>
        {/* Header fijo */}
        <Header />

        {/* Contenido principal con espacio reservado */}
        <main className="w-full max-w-4xl mx-auto px-4 pt-24 pb-28">
          {children}
        </main>

        {/* Footer fijo */}
        <Footer />
      </body>
    </html>
  );
}
