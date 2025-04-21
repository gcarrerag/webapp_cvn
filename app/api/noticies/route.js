import { NextResponse } from "next/server";
import db from "../../../db";

// 🔥 GET: Llistar totes les notícies
export async function GET() {
  const consulta = db.prepare("SELECT * FROM noticies ORDER BY id DESC");
  const noticies = consulta.all();
  return NextResponse.json(noticies);
}

// 🔥 POST: Crear una nova notícia
export async function POST(request) {
  const formData = await request.formData(); // 👈🏻 Recollim FormData
  const titol = formData.get("titol");
  const contingut = formData.get("cos");
  const imatge = formData.get("imatge")?.name || null; // 👈🏻 Agafem només el nom, o null

  const dataActual = new Date().toISOString();

  const inserir = db.prepare(`
    INSERT INTO noticies (titol, contingut, imatge, data)
    VALUES (?, ?, ?, ?)
  `);
  inserir.run(titol, contingut, imatge, dataActual);

  return NextResponse.json({ missatge: "Notícia creada ✅" });
}

