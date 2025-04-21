import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

// 🔥 GET: Llistar tots els productes
export async function GET() {
  const { data, error } = await supabase
    .from("productes")
    .select("*");

  if (error) {
    console.error("Error obtenint productes:", error);
    return NextResponse.json({ error: "Error obtenint productes" }, { status: 500 });
  }

  return NextResponse.json(data);
}

// 🔥 POST: Afegir un nou producte
export async function POST(request) {
  const { nom, descripcio, preu, imatge, stock, animal, categoria } = await request.json();

  const { data, error } = await supabase
    .from("productes")
    .insert([
      { nom, descripcio, preu, imatge, stock, animal, categoria }
    ]);

  if (error) {
    console.error("Error afegint producte:", error);
    return NextResponse.json({ error: "Error afegint producte" }, { status: 500 });
  }

  return NextResponse.json({ missatge: "Producte afegit ✅" });
}

