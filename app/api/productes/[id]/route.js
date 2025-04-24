import { NextResponse } from "next/server"
import supabase from "@/lib/supabase"

export async function GET(request, context) {
  const { id } = await context.params

  try {
    const { data, error } = await supabase
      .from("productes")
      .select("*")
      .eq("id", id)
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PUT(request, context) {
  const { id } = await context.params
  const body = await request.json()

  try {
    const { error } = await supabase
      .from("productes")
      .update({ preu: body.preu, stock: body.stock })
      .eq("id", id)

    if (error) throw error

    return NextResponse.json({ missatge: "Producte actualitzat ✅" })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(request, context) {
  const { id } = await context.params

  try {
    const { error } = await supabase
      .from("productes")
      .delete()
      .eq("id", id)

    if (error) throw error

    return NextResponse.json({ missatge: "Producte eliminat ✅" })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}


