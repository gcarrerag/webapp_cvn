import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Supabase admin per operacions sense auth
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// 🟡 PUT: Actualitzar estat d'una comanda
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { estat } = await request.json();

    // 🔥 Agafem el token si existeix
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");

    // 🔥 Creem instància de Supabase
    const supabase = token
      ? createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          { global: { headers: { Authorization: `Bearer ${token}` } } }
        )
      : supabaseAdmin; // Si no hi ha token, usem admin

    // 🔥 Actualitzem l'estat de la comanda
    const { error } = await supabase
      .from("comandes")
      .update({ estat })
      .eq("id", id);

    if (error) {
      console.error("Error actualitzant estat de la comanda:", error.message);
      return NextResponse.json({ error: "Error actualitzant comanda" }, { status: 500 });
    }

    return NextResponse.json({ missatge: "Comanda actualitzada ✅" });
  } catch (err) {
    console.error("Error inesperat actualitzant comanda:", err.message);
    return NextResponse.json({ error: "Error inesperat" }, { status: 500 });
  }
}

