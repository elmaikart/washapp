"use client";

import React from "react";

export default function Footer() {
  return (
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
  );
}
