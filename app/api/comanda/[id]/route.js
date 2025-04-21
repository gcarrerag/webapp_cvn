import { NextResponse } from "next/server";
import db from "../../../../db";

// PUT: Actualitzar estat de la comanda
export async function PUT(request, { params }) {
  const { estat } = await request.json();
  const actualitzar = db.prepare("UPDATE comandes SET estat = ? WHERE id = ?");
  actualitzar.run(estat, params.id);
  return NextResponse.json({ missatge: "Estat actualitzat ✅" });
}
