"use client";

import React from "react";

interface Props {
  value: string;
  onChange: (valor: string) => void;
  disabled?: boolean; // 👈 agregado para que no tire error
}

const HorarioSelect: React.FC<Props> = ({ value, onChange, disabled = false }) => {
  const opciones = [
    "08:00", "08:15", "08:30", "08:45",
    "09:00", "09:15", "09:30", "09:45",
    "10:00", "10:15", "10:30", "10:45",
    "11:00", "11:15", "11:30", "11:45",
    "12:00", "12:15", "12:30", "12:45",
    "13:00", "13:15", "13:30", "13:45",
    "14:00", "14:15", "14:30", "14:45",
    "15:00", "15:15", "15:30", "15:45",
    "16:00", "16:15", "16:30", "16:45",
    "17:00", "17:15", "17:30", "17:45",
    "18:00", "18:15", "18:30", "18:45",
    "19:00", "19:15", "19:30", "19:45",
    "20:00",
  ];

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-wash-primary outline-none ${
        disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white"
      }`}
    >
      <option value="">--:--</option>
      {opciones.map((hora) => (
        <option key={hora} value={hora}>
          {hora}
        </option>
      ))}
    </select>
  );
};

export default HorarioSelect;
