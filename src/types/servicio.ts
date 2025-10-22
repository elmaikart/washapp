import { JSX } from "react";

export type Servicio = {
  name: string;
  description: string;
  price: number;
  icon: JSX.Element; // 👈 esto es clave para que funcione el prop icon
};
