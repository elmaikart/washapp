import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina múltiples clases Tailwind de forma segura,
 * aplicando merge inteligente (evita duplicar o pisar utilidades conflictivas)
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(...inputs));
}
