import { NextResponse } from "next/server"
import supabase from "@/lib/supabase"

// 🔍 GET: Obtenir una notícia per ID
export async function GET(request, context) {
  const id = await context.params?.id // ✅ Clau per evitar el warning

  if (!id) {
    return NextResponse.json({ error: "ID no proporcionat" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("noticies")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error obtenint notícia:", error)
    return NextResponse.json({ error: "Notícia no trobada" }, { status: 404 })
  }

  return NextResponse.json(data)
}

