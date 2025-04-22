import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

// 🔵 GET: Obtenir un producte per id
export async function GET(request, context) {
  try {
    const { id } = context.params;

    const { data, error } = await supabase
      .from("productes")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error carregant producte:", error.message);
      return NextResponse.json({ error: "Error carregant producte" }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "Producte no trobat" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Error inesperat GET producte:", err.message);
    return NextResponse.json({ error: "Error inesperat" }, { status: 500 });
  }
}

// 🟠 PUT: Actualitzar preu i stock d'un producte
export async function PUT(request, context) {
  try {
    const { id } = context.params;
    const { preu, stock } = await request.json();

    const { error } = await supabase
      .from("productes")
      .update({ preu, stock })
      .eq("id", id);

    if (error) {
      console.error("Error actualitzant producte:", error.message);
      return NextResponse.json({ error: "Error actualitzant producte" }, { status: 500 });
    }

    return NextResponse.json({ missatge: "Producte actualitzat ✅" });
  } catch (err) {
    console.error("Error inesperat PUT producte:", err.message);
    return NextResponse.json({ error: "Error inesperat" }, { status: 500 });
  }
}

// 🔴 DELETE: Eliminar un producte
export async function DELETE(request, context) {
  try {
    const { id } = context.params;

    const { error } = await supabase
      .from("productes")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error eliminant producte:", error.message);
      return NextResponse.json({ error: "Error eliminant producte" }, { status: 500 });
    }

    return NextResponse.json({ missatge: "Producte eliminat ✅" });
  } catch (err) {
    console.error("Error inesperat DELETE producte:", err.message);
    return NextResponse.json({ error: "Error inesperat" }, { status: 500 });
  }
}



