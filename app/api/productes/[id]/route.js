import { NextResponse } from "next/server";
import db from "../../../../db";

// GET: Obtenir un producte per id
export async function GET(request, context) {
  const { id } = await context.params; // ✅ await aquí
  const consulta = db.prepare("SELECT * FROM productes WHERE id = ?");
  const producte = consulta.get(id);

  if (!producte) {
    return NextResponse.json({ error: "Producte no trobat" }, { status: 404 });
  }

  return NextResponse.json(producte);
}

// PUT: Actualitzar preu i stock d'un producte
export async function PUT(request, context) {
  const { id } = await context.params; // ✅ await aquí
  const { preu, stock } = await request.json();

  const actualitzar = db.prepare("UPDATE productes SET preu = ?, stock = ? WHERE id = ?");
  actualitzar.run(preu, stock, id);

  return NextResponse.json({ missatge: "Producte actualitzat ✅" });
}

// DELETE: Eliminar un producte
export async function DELETE(request, context) {
  const { id } = await context.params; // ✅ await aquí
  const eliminar = db.prepare("DELETE FROM productes WHERE id = ?");
  eliminar.run(id);

  return NextResponse.json({ missatge: "Producte eliminat ✅" });
}

