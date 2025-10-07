// src/app/layout.tsx
import "@/styles/globals.css";
import { Quicksand } from "next/font/google";
import type { Metadata } from "next";
import React from "react";
import Script from "next/script"; // 👈 importamos el componente Script
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
      <head>
        {/* 👇 Google Maps Script */}
        <Script
          async
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />
      </head>
      <body className={`bg-wash-bg text-black ${quicksand.className}`}>
        {/* Header fijo */}
        <Header />

        {/* Contenido principal */}
        <main className="w-full max-w-4xl mx-auto px-4 pb-28 with-header">
          {children}
        </main>

        {/* Footer fijo */}
        <Footer />
      </body>
    </html>
  );
}
