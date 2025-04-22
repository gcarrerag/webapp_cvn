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
  try {
    const formData = await request.formData();
    const titol = formData.get("titol");
    const cos = formData.get("cos");
    const imatge = formData.get("imatge");

    let imatgeURL = "";

    if (imatge && imatge.size > 0) {
      const nomArxiu = `${Date.now()}_${imatge.name}`;

      const { data: storageData, error: storageError } = await supabase
        .storage
        .from("noticies")
        .upload(nomArxiu, imatge, {
          cacheControl: "3600",
          upsert: false
        });

      if (storageError) {
        console.error("Error pujant imatge:", storageError);
        return NextResponse.json({ error: "Error pujant imatge" }, { status: 500 });
      }

      imatgeURL = `https://${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/noticies/${nomArxiu}`;
    }

    const dataActual = new Date().toISOString();

    const { data, error } = await supabase
      .from("noticies")
      .insert([
        { titol, contingut: cos, imatge: imatgeURL, data: dataActual }
      ]);

    if (error) {
      console.error("Error creant notícia:", error);
      return NextResponse.json({ error: "Error creant notícia" }, { status: 500 });
    }

    return NextResponse.json({ missatge: "Notícia creada ✅" });
  } catch (error) {
    console.error("Error processant la notícia:", error);
    return NextResponse.json({ error: "Error processant la notícia" }, { status: 400 });
  }
}

// 🧹 DELETE: Esborrar una notícia i la seva imatge
export async function DELETE(request) {
  try {
    const { id, imatgeURL } = await request.json();

    // 🔥 1. Esborrar la imatge si existeix
    if (imatgeURL) {
      const parts = imatgeURL.split("/");
      const nomArxiu = parts[parts.length - 1];

      const { error: storageError } = await supabase
        .storage
        .from("noticies")
        .remove([nomArxiu]);

      if (storageError) {
        console.error("Error esborrant imatge de Storage:", storageError);
        // Seguim igualment esborrant la notícia encara que falli la imatge
      }
    }

    // 🔥 2. Esborrar la notícia
    const { error } = await supabase
      .from("noticies")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error esborrant notícia:", error);
      return NextResponse.json({ error: "Error esborrant notícia" }, { status: 500 });
    }

    return NextResponse.json({ missatge: "Notícia esborrada ✅" });
  } catch (error) {
    console.error("Error processant esborrat:", error);
    return NextResponse.json({ error: "Error processant esborrat" }, { status: 400 });
  }
}

