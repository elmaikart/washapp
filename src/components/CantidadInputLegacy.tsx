"use client";

import React from "react";
import CantidadInput from "@/components/CantidadInput";

interface CantidadInputLegacyProps {
  value: number;
  onChange: (val: number) => void;
}

export default function CantidadInputLegacy({ value, onChange }: CantidadInputLegacyProps) {
  return (
    <CantidadInput
      cantidad={value}
      setCantidad={onChange}
    />
  );
}
