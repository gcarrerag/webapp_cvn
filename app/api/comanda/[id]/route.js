import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

// PUT: Actualitzar estat de la comanda
export async function PUT(request, { params }) {
  const { id } = params;
  const { estat } = await request.json();

  const { error } = await supabase
    .from("comandes")
    .update({ estat })
    .eq("id", id);

  if (error) {
    console.error("Error actualitzant estat de la comanda:", error);
    return NextResponse.json({ error: "Error actualitzant comanda" }, { status: 500 });
  }

  return NextResponse.json({ missatge: "Comanda actualitzada ✅" });
}

