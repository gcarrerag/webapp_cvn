import { NextResponse } from "next/server";
import db from "../../../db";

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


// GET: Llistar totes les comandes
export async function GET() {
  const consulta = db.prepare("SELECT * FROM comandes ORDER BY id DESC");
  const comandes = consulta.all();
  return NextResponse.json(comandes);
}

// POST: Crear una nova comanda
export async function POST(request) {
  const { nom, telefon, adreca, observacions, enviament, productes } = await request.json();
  const dataActual = new Date().toISOString();

  // 1. Inserir la comanda
  const insertarComanda = db.prepare(`
    INSERT INTO comandes (nom, telefon, adreca, observacions, enviament, estat, productes, data)
    VALUES (?, ?, ?, ?, ?, 'pendent', ?, ?)
  `);
  insertarComanda.run(nom, telefon, adreca, observacions, enviament, JSON.stringify(productes), dataActual);

  // 2. Actualitzar stock
  const updateStock = db.prepare(`
    UPDATE productes
    SET stock = stock - ?
    WHERE id = ?
  `);

  for (const prod of productes) {
    updateStock.run(prod.quantitat || 1, prod.id);
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

// PUT: Actualitzar estat
export async function PUT(request, { params }) {
  const id = params.id;
  const { estat } = await request.json();

  const update = db.prepare(`
    UPDATE comandes SET estat = ? WHERE id = ?
  `);
  update.run(estat, id);

  return NextResponse.json({ missatge: "Comanda actualitzada ✅" });
}



