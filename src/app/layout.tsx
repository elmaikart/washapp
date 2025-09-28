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
        {children}
      </body>
    </html>
  );
}
