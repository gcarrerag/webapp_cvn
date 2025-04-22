import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Supabase admin per coses generals (sense auth)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// 🔥 Funció per enviar missatge a Telegram
async function enviarMissatgeTelegram(missatge) {
  const token = process.env.TELEGRAM_TOKEN; // 🔥 Idealment a env
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(missatge)}`;

  try {
    const resposta = await fetch(url);
    if (!resposta.ok) {
      const errorText = await resposta.text();
      console.error("Error en enviar missatge a Telegram:", errorText);
    } else {
      console.log("Missatge enviat correctament a Telegram! ✅");
    }
  } catch (err) {
    console.error("Error inesperat enviant missatge a Telegram:", err.message);
  }
}

// 🔵 GET: Llistar totes les comandes
export async function GET(request) {
  try {
    const { data, error } = await supabaseAdmin
      .from("comandes")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Error obtenint comandes:", error.message);
      return NextResponse.json({ error: "Error obtenint comandes" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Error inesperat GET comandes:", err.message);
    return NextResponse.json({ error: "Error inesperat" }, { status: 500 });
  }
}

// 🟢 POST: Crear una nova comanda
export async function POST(request) {
  try {
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    );

    const { nom, telefon, adreca, observacions, enviament, productes } = await request.json();
    const dataActual = new Date().toISOString();

    // 1. Inserir la comanda
    const { data: novaComanda, error: errorComanda } = await supabase
      .from("comandes")
      .insert([
        {
          nom,
          telefon,
          adreca,
          observacions,
          enviament,
          estat: "pendent",
          productes: JSON.stringify(productes),
          data: dataActual,
        }
      ])
      .select()
      .single();

    if (errorComanda) {
      console.error("Error creant comanda:", errorComanda.message);
      return NextResponse.json({ error: "Error creant comanda" }, { status: 500 });
    }

    // 2. Actualitzar stock dels productes
    for (const prod of productes) {
      const { data: producteActual, error: errorLectura } = await supabase
        .from("productes")
        .select("stock")
        .eq("id", prod.id)
        .single();

      if (errorLectura || !producteActual) {
        console.error(`Error llegint stock producte ${prod.id}:`, errorLectura?.message);
        continue;
      }

      const stockNou = (producteActual.stock || 0) - (prod.quantitat || 1);

      const { error: errorUpdate } = await supabase
        .from("productes")
        .update({ stock: stockNou >= 0 ? stockNou : 0 })
        .eq("id", prod.id);

      if (errorUpdate) {
        console.error(`Error actualitzant stock producte ${prod.id}:`, errorUpdate.message);
      }
    }

    // 3. Enviar missatge a Telegram
    const resumProductes = productes.map((p) => `${p.nom} x${p.quantitat || 1}`).join(", ");
    const missatgeTelegram = `
🛒 Nova comanda rebuda!

👤 Nom: ${nom}
📞 Telèfon: ${telefon}
🏠 Enviament: ${enviament === "domicili" ? "A domicili" : "Recollida al local"}
🛍️ Productes: ${resumProductes}
📄 Observacions: ${observacions || "Cap"}
`.trim();

    await enviarMissatgeTelegram(missatgeTelegram);

    return NextResponse.json({ missatge: "Comanda creada, stock actualitzat i notificació enviada ✅" });
  } catch (err) {
    console.error("Error inesperat POST comanda:", err.message);
    return NextResponse.json({ error: "Error inesperat" }, { status: 500 });
  }
}






