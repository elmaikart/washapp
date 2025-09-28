import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/globals.css";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body className="min-h-screen bg-wash-bg text-gray-900">
        <Header />
        <main className="max-w-4xl mx-auto px-4 pb-16">{children}</main>
      </body>
    </html>
  );
}
