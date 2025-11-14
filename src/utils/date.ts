// =============================================================
// 🕒 Utilidades de fechas y horarios para WashApp (v7 estable)
// =============================================================

// ---------- Tipos ----------
export type MinAbs = { date: string; hh: string; mm: string };

// ---------- Utilidades básicas ----------
export const pad2 = (n: number): string => String(n).padStart(2, "0");

export const toMins = (hh: string, mm: string): number =>
    parseInt(hh) * 60 + parseInt(mm);

// ---------- Detección de días ----------
export const isSaturday = (date: string): boolean =>
    new Date(date + "T00:00:00").getDay() === 6;

export const isSunday = (date: string): boolean =>
    new Date(date + "T00:00:00").getDay() === 0;

// ---------- Detección de feriados ----------
const HOLIDAYS = [
    "2025-01-01", "2025-03-24", "2025-04-02", "2025-05-01",
    "2025-05-25", "2025-06-20", "2025-07-09", "2025-08-17",
    "2025-10-12", "2025-11-20", "2025-12-08", "2025-12-25"
];
export const isHoliday = (date: string): boolean => HOLIDAYS.includes(date);

// ---------- Ventana de horario laboral ----------
export const getBusinessWindow = (date: string) => {
    if (isSunday(date) || isHoliday(date)) return null;
    if (isSaturday(date))
        return { open: { hh: "09", mm: "00" }, close: { hh: "13", mm: "00" } };
    return { open: { hh: "08", mm: "00" }, close: { hh: "19", mm: "30" } };
};

// =============================================================
// 🧭 FUNCIONES PRINCIPALES
// =============================================================

// ---------- Sumar horas de procesamiento ----------
export function addProcessHours(base: MinAbs, hoursToAdd: number): MinAbs {
    try {
        const baseDate = new Date(`${base.date}T${base.hh}:${base.mm}:00`);
        if (isNaN(baseDate.getTime())) {
            console.warn("⚠️ Fecha inválida en addProcessHours:", base);
            return base;
        }

        baseDate.setHours(baseDate.getHours() + hoursToAdd);

        // construir fecha manualmente (sin toISOString)
        const nextDate = `${baseDate.getFullYear()}-${pad2(baseDate.getMonth() + 1)}-${pad2(baseDate.getDate())}`;
        const hh = pad2(baseDate.getHours());
        const mm = pad2(baseDate.getMinutes());

        return normalizeToBusiness({ date: nextDate, hh, mm });
    } catch (err) {
        console.error("❌ Error en addProcessHours:", err);
        return base;
    }
}

// ---------- Normalizar fecha/hora a día hábil ----------
export function normalizeToBusiness({ date, hh, mm }: MinAbs): MinAbs {
    try {
        const d = new Date(`${date}T${hh}:${mm}:00`);
        if (isNaN(d.getTime())) {
            console.warn("⚠️ Fecha inválida en normalizeToBusiness:", { date, hh, mm });
            return { date, hh, mm };
        }

        // obtener info de día
        let currentDate = new Date(d);
        let day = currentDate.getDay();

        // corregir domingos y sábados
        if (day === 0) currentDate.setDate(currentDate.getDate() + 1);
        if (day === 6) currentDate.setDate(currentDate.getDate() + 2);

        const formattedDate = `${currentDate.getFullYear()}-${pad2(currentDate.getMonth() + 1)}-${pad2(currentDate.getDate())}`;
        const window = getBusinessWindow(formattedDate);

        if (!window) {
            // feriado o día no hábil: avanzar al siguiente día hábil
            currentDate.setDate(currentDate.getDate() + 1);
            const newDate = `${currentDate.getFullYear()}-${pad2(currentDate.getMonth() + 1)}-${pad2(currentDate.getDate())}`;
            return normalizeToBusiness({ date: newDate, hh: "08", mm: "00" });
        }

        const open = toMins(window.open.hh, window.open.mm);
        const close = toMins(window.close.hh, window.close.mm);
        const now = toMins(pad2(currentDate.getHours()), pad2(currentDate.getMinutes()));

        // antes de apertura
        if (now < open)
            return { date: formattedDate, hh: window.open.hh, mm: window.open.mm };

        // después del cierre → siguiente día hábil 08:00
        if (now > close) {
            currentDate.setDate(currentDate.getDate() + 1);
            const newDate = `${currentDate.getFullYear()}-${pad2(currentDate.getMonth() + 1)}-${pad2(currentDate.getDate())}`;
            return normalizeToBusiness({ date: newDate, hh: "08", mm: "00" });
        }

        // dentro del rango hábil
        return {
            date: formattedDate,
            hh: pad2(currentDate.getHours()),
            mm: pad2(currentDate.getMinutes()),
        };
    } catch (err) {
        console.error("❌ Error en normalizeToBusiness:", err);
        return { date, hh, mm };
    }
}
