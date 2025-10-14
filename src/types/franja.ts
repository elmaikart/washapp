// src/types/franja.ts

export type Franja = {
  /** Identificador único de la franja (ej: "retiro-0" o "devolucion-1") */
  id: string;

  /** Fecha seleccionada para la franja */
  fecha: string;

  /** Hora y minutos de inicio */
  desdeHora: string;
  desdeMinuto: string;

  /** Hora y minutos de fin */
  hastaHora: string;
  hastaMinuto: string;

  /** Indica si la franja está confirmada por el usuario */
  confirmada: boolean;
};
