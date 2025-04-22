import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

// 🔥 GET: Llistar tots els productes
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("productes")
      .select("*");

    if (error) {
      console.error("Error obtenint productes:", error.message);
      return NextResponse.json({ error: "Error obtenint productes" }, { status: 500 });
    }

    if (!Array.isArray(data)) {
      console.error("Dades no són array:", data);
      return NextResponse.json({ error: "Dades incorrectes de productes" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Error inesperat GET productes:", err.message);
    return NextResponse.json({ error: "Error inesperat en obtenir productes" }, { status: 500 });
  }
}

// 🔥 POST: Afegir un nou producte
export async function POST(request) {
  try {
    const body = await request.json();
    const { nom, descripcio, preu, imatge, stock, animal, categoria } = body;

    const { error } = await supabase
      .from("productes")
      .insert([{ nom, descripcio, preu, imatge, stock, animal, categoria }]);

    if (error) {
      console.error("Error afegint producte:", error.message);
      return NextResponse.json({ error: "Error afegint producte" }, { status: 500 });
    }

    return NextResponse.json({ missatge: "Producte afegit ✅" });
  } catch (err) {
    console.error("Error inesperat POST productes:", err.message);
    return NextResponse.json({ error: "Error inesperat en afegir producte" }, { status: 500 });
  }
}

