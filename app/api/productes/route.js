import { NextResponse } from "next/server";
import db from "../../../db";

// GET: Llistar tots els productes
export async function GET() {
  const consulta = db.prepare("SELECT * FROM productes");
  const productes = consulta.all();
  return NextResponse.json(productes);
}

// POST: Afegir un nou producte
export async function POST(request) {
  const { nom, descripcio, preu, imatge, stock, animal, categoria } = await request.json(); // Ara recollim també stock, animal i categoria
  const insertar = db.prepare(`
    INSERT INTO productes (nom, descripcio, preu, imatge, stock, animal, categoria)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  insertar.run(nom, descripcio, preu, imatge, stock, animal, categoria);
  return NextResponse.json({ missatge: "Producte afegit ✅" });
}

