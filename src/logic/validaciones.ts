// src/logic/validaciones.ts
// =============================================================
// 🧠 Núcleo central de validaciones y lógica horaria de WashApp
// =============================================================

import {
    addHours,
    isSaturday,
    isSunday,
    format,
    parseISO,
    addDays,
} from "date-fns";

/* =============================================================
   🕒 CONFIGURACIÓN GENERAL DE HORARIOS
   ============================================================= */
export const HORARIOS = {
    semana: { apertura: 8, cierre: 20 }, // lunes a viernes
    sabado: { apertura: 9, cierre: 13 },
    domingo: { cerrado: true },
};

/* =============================================================
   📅 FERIADOS 2025 (Argentina)
   ============================================================= */
export const FERIADOS_2025 = [
    "2025-01-01",
    "2025-03-03",
    "2025-03-04",
    "2025-03-24",
    "2025-04-02",
    "2025-05-01",
    "2025-05-25",
    "2025-06-20",
    "2025-07-09",
    "2025-12-08",
    "2025-12-25",
];

export function esFeriado(fecha: Date | string | null | undefined): boolean {
    if (!fecha) return false;
    const dateObj = typeof fecha === "string" ? new Date(fecha) : fecha;
    if (isNaN(dateObj.getTime())) return false; // evita "Invalid time value"
    const f = format(dateObj, "yyyy-MM-dd");
    return FERIADOS_2025.includes(f);
}

/* =============================================================
   🧠 FUNCIONES PRINCIPALES DE NEGOCIO
   ============================================================= */

// 🕓 Verificar si la fecha/hora está dentro del horario laboral
export function estaDentroDelHorario(fecha: Date): boolean {
    if (isSunday(fecha) || esFeriado(fecha)) return false;
    const isSabado = isSaturday(fecha);
    const { apertura, cierre } = isSabado ? HORARIOS.sabado : HORARIOS.semana;
    const hora = fecha.getHours() + fecha.getMinutes() / 60;
    return hora >= apertura && hora < cierre;
}

// ⏳ Bloquear horarios pasados
export function esHorarioPasado(fecha: Date, hora: number, minuto: number) {
    const ahora = new Date();
    const f = new Date(fecha);
    f.setHours(hora, minuto, 0, 0);
    return f < ahora;
}

// ⏩ Calcular hora mínima de devolución (5h después del retiro)
export function calcularMinDevolucion(retiro: Date): Date {
    return addHours(retiro, 5);
}

// 🔄 Ajustar horario al siguiente día hábil si excede el cierre
export function normalizarHorario(hora: Date): Date {
    const isSabado = isSaturday(hora);
    const isDomingo = isSunday(hora);
    const feriado = esFeriado(hora);

    if (isDomingo || feriado) {
        const next = addDays(hora, 1);
        return normalizarHorario(next);
    }

    const { apertura, cierre } = isSabado ? HORARIOS.sabado : HORARIOS.semana;
    const horaNum = hora.getHours() + hora.getMinutes() / 60;

    if (horaNum >= cierre) {
        const nextDay = addDays(hora, 1);
        nextDay.setHours(apertura, 0, 0, 0);
        return normalizarHorario(nextDay);
    }

    return hora;
}

// ⏱ Validar que la franja mínima sea de al menos 1 hora
export function validarFranjaMinima(inicio: Date, fin: Date): boolean {
    const diff = (fin.getTime() - inicio.getTime()) / (1000 * 60 * 60);
    return diff >= 1;
}

// 🧮 Calcular franja válida de devolución
export function calcularFranjaDevolucion(fechaRetiro: Date): Date {
    const minDev = calcularMinDevolucion(fechaRetiro);
    return normalizarHorario(minDev);
}

// 🔐 Obtener rango de horario válido para el día
export function getBusinessWindow(fecha: Date) {
    if (isSunday(fecha) || esFeriado(fecha)) return null;
    const isSabado = isSaturday(fecha);
    const { apertura, cierre } = isSabado ? HORARIOS.sabado : HORARIOS.semana;
    return { apertura, cierre };
}
export { isSunday, isSaturday };
