// src/app/layout.tsx
import "./../styles/globals.css";
import type { Metadata } from "next";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "WashApp",
  description: "Lavandería fácil y rápida",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="with-header">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
