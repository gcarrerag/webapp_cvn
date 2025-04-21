import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

// GET: Obtenir un producte per id
export async function GET(request, context) {
  const { id } = await context.params;

  const { data, error } = await supabase
    .from("productes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error carregant producte:", error);
    return NextResponse.json({ error: "Error carregant producte" }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Producte no trobat" }, { status: 404 });
  }

  return NextResponse.json(data);
}

// PUT: Actualitzar preu i stock d'un producte
export async function PUT(request, context) {
  const { id } = await context.params;
  const { preu, stock } = await request.json();

  const { error } = await supabase
    .from("productes")
    .update({ preu, stock })
    .eq("id", id);

  if (error) {
    console.error("Error actualitzant producte:", error);
    return NextResponse.json({ error: "Error actualitzant producte" }, { status: 500 });
  }

  return NextResponse.json({ missatge: "Producte actualitzat ✅" });
}

// DELETE: Eliminar un producte
export async function DELETE(request, context) {
  const { id } = await context.params;

  const { error } = await supabase
    .from("productes")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error eliminant producte:", error);
    return NextResponse.json({ error: "Error eliminant producte" }, { status: 500 });
  }

  return NextResponse.json({ missatge: "Producte eliminat ✅" });
}



