"use client";

import React from "react";
import { Pencil } from "lucide-react";

interface Props {
  notas: string;
  setNotas: (value: string) => void;
}

const NotasInput: React.FC<Props> = ({ notas, setNotas }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 mt-4">
      <h3 className="font-semibold text-wash-primary text-base flex items-center gap-2 mb-2">
        <Pencil className="w-5 h-5 text-wash-primary" />
        Notas Adicionales
      </h3>
      <textarea
        value={notas}
        onChange={(e) => setNotas(e.target.value)}
        placeholder="Instrucciones extra, datos del timbre, piso o preferencias..."
        rows={3}
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-wash-primary outline-none text-sm resize-none"
      />
    </div>
  );
};

export default NotasInput;
