import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

// 🔥 Funció per enviar missatge a Telegram
async function enviarMissatgeTelegram(missatge) {
  const token = "8046559054:AAFn2dismbKNVJ1JHzglZlan3sQ7EaQyVjs";
  const chatId = "5495392505";
  const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(missatge)}`;

  console.log("Intentant enviar missatge a Telegram...");

  const resposta = await fetch(url);

  if (!resposta.ok) {
    const errorText = await resposta.text();
    console.error("Error en enviar missatge a Telegram:", errorText);
  } else {
    console.log("Missatge enviat correctament a Telegram! ✅");
  }
}

// 🔵 GET: Llistar totes les comandes
export async function GET() {
  const { data, error } = await supabase
    .from("comandes")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error obtenint comandes:", error);
    return NextResponse.json({ error: "Error obtenint comandes" }, { status: 500 });
  }

  return NextResponse.json(data);
}

// 🟢 POST: Crear una nova comanda
export async function POST(request) {
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
	  .single(); // Retorna l'única fila creada


  if (errorComanda) {
    console.error("Error creant comanda:", errorComanda);
    return NextResponse.json({ error: "Error creant comanda" }, { status: 500 });
  }

  // 2. Actualitzar stock dels productes de la comanda
  for (const prod of productes) {
    // Primer llegim el stock actual
    const { data: producteActual, error: errorLectura } = await supabase
      .from("productes")
      .select("stock")
      .eq("id", prod.id)
      .single();

    if (errorLectura || !producteActual) {
      console.error(`Error llegint stock del producte ${prod.id}:`, errorLectura);
      continue; // Passar al següent producte
    }

    const stockNou = (producteActual.stock || 0) - (prod.quantitat || 1);

    // Actualitzem el nou stock
    const { error: errorUpdate } = await supabase
      .from("productes")
      .update({ stock: stockNou >= 0 ? stockNou : 0 })
      .eq("id", prod.id);

    if (errorUpdate) {
      console.error(`Error actualitzant stock del producte ${prod.id}:`, errorUpdate);
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
}


// 🟡 PUT: Actualitzar estat d'una comanda
export async function PUT(request, { params }) {
  const id = params.id;
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




