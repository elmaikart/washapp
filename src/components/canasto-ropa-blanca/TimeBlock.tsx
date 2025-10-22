"use client";

import { Clock } from "lucide-react";

interface TimeBlockProps {
  label: string;
  hora: string;
  onClick: () => void;
  active?: boolean;
}

export default function TimeBlock({
  label,
  hora,
  onClick,
  active = false,
}: TimeBlockProps) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer border border-gray-300 rounded-xl p-4 flex flex-col items-center gap-2 text-sm transition-all duration-300 ease-in-out ${
        active ? "bg-blue-100 border-blue-500" : "hover:bg-gray-100"
      }`}
    >
      <Clock className="text-wash-primary" />
      <span className="font-semibold">{label}</span>
      <span className="text-gray-500">{hora}</span>
    </div>
  );
}
