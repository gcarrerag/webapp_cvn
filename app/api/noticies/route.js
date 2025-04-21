import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

// 🔵 GET: Llistar totes les notícies
export async function GET() {
  const { data, error } = await supabase
    .from("noticies")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error obtenint notícies:", error);
    return NextResponse.json({ error: "Error obtenint notícies" }, { status: 500 });
  }

  return NextResponse.json(data);
}

// 🟢 POST: Crear una nova notícia
export async function POST(request) {
  const { titol, contingut, imatge } = await request.json();
  const dataActual = new Date().toISOString();

  const { data, error } = await supabase
    .from("noticies")
    .insert([
      { titol, contingut, imatge, data: dataActual }
    ]);

  if (error) {
    console.error("Error creant notícia:", error);
    return NextResponse.json({ error: "Error creant notícia" }, { status: 500 });
  }

  return NextResponse.json({ missatge: "Notícia creada ✅" });
}

