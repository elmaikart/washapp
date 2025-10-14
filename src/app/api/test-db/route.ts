import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import pool from '@/utils/db';

const prisma = new PrismaClient();

// Handler GET: prueba de conexión con PostgreSQL (usando pool.query)
export async function GET() {
  try {
    const result = await pool.query('SELECT NOW()');
    return NextResponse.json({ time: result.rows[0].now });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

// Handler POST: guarda pedidos en la tabla "Order"
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { service, date, timeSlot, address, notes } = body;

    if (!service || !date || !timeSlot || !address) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const newOrder = await prisma.order.create({
      data: {
        service,
        date: new Date(date),
        timeSlot,
        address,
        notes,
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("Error al crear pedido:", error);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
