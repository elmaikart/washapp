"use client";

import React from "react";

type HorarioSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label: string;
};

export default function HorarioSelect({
  value,
  onChange,
  options,
  label,
}: HorarioSelectProps) {
  return (
    <div className="flex flex-col items-start">
      <label className="text-sm font-medium mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border p-2 rounded w-24"
      >
        <option value="--">--</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
