// src/app/layout.tsx
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Header from "@/components/header";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WashApp",
  description: "Tu app de lavandería en un solo clic.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body className="min-h-screen bg-[#FFF9E6] text-gray-900 flex flex-col">
        {/* Header */}
        <Header />

        {/* Contenido principal */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <footer className="bg-[#0A2A5E] text-white text-center py-4">
          <p className="text-sm">© 2025 WashApp · Todos los derechos reservados</p>
        </footer>
      </body>
    </html>
  );
}
