// src/app/layout.tsx
import "@/styles/globals.css";
import { Quicksand } from "next/font/google";
import type { Metadata } from "next";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WashApp",
  description: "Tu lavadero de confianza",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`bg-wash-bg text-black ${quicksand.className}`}>
        {/* 🔹 Header Global */}
        <header className="w-full fixed top-0 left-0 right-0 bg-wash-bg shadow z-50 px-4 py-3">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-wash-primary">
              WashApp
            </h1>
          </div>
        </header>

        {/* 🔹 Contenido */}
        <main className="pt-20 pb-20 min-h-screen max-w-4xl mx-auto px-4">
          {children}
        </main>

        {/* 🔹 Footer Global */}
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
      </body>
    </html>
  );
}
