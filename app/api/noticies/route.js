import { NextResponse } from "next/server";
import supabase from "@/lib/supabaseAdmin"; // Client amb permisos elevats

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

      const { error: storageError } = await supabase
        .storage
        .from("noticies")
        .upload(nomArxiu, imatge, { cacheControl: "3600", upsert: false });

      if (storageError) {
        console.error("Error pujant imatge:", storageError);
        return NextResponse.json({ error: "Error pujant imatge" }, { status: 500 });
      }

      imatgeURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/noticies/${nomArxiu}`;
    }

    const dataActual = new Date().toISOString();

    const { error } = await supabase
      .from("noticies")
      .insert([{ titol, contingut: cos, imatge: imatgeURL, data: dataActual }]);

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

// 🟠 PUT: Editar notícia existent
export async function PUT(request) {
  try {
    const formData = await request.formData();
    const id = formData.get("id");
    const titol = formData.get("titol");
    const cos = formData.get("cos");
    const novaImatge = formData.get("imatge");
    const imatgeAntiga = formData.get("imatgeAntiga");

    if (!id) {
      return NextResponse.json({ error: "ID no proporcionat" }, { status: 400 });
    }

    let imatgeURL = imatgeAntiga || "";

    if (novaImatge && novaImatge.size > 0) {
      const nomArxiu = `${Date.now()}_${novaImatge.name}`;

      const { error: storageError } = await supabase
        .storage
        .from("noticies")
        .upload(nomArxiu, novaImatge, { cacheControl: "3600", upsert: false });

      if (storageError) {
        console.error("Error pujant nova imatge:", storageError);
        return NextResponse.json({ error: "Error pujant nova imatge" }, { status: 500 });
      }

      imatgeURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/noticies/${nomArxiu}`;

      // Esborrar la imatge antiga
      if (imatgeAntiga) {
        const parts = imatgeAntiga.split("/");
        const arxiuAntic = parts[parts.length - 1];
        await supabase.storage.from("noticies").remove([arxiuAntic]);
      }
    }

    const { error } = await supabase
      .from("noticies")
      .update({ titol, contingut: cos, imatge: imatgeURL })
      .eq("id", id);

    if (error) {
      console.error("Error editant notícia:", error);
      return NextResponse.json({ error: "Error editant notícia" }, { status: 500 });
    }

    return NextResponse.json({ missatge: "Notícia editada ✅" });
  } catch (error) {
    console.error("Error processant l'edició:", error);
    return NextResponse.json({ error: "Error processant l'edició" }, { status: 400 });
  }
}

// 🧹 DELETE: Esborrar notícia i imatge
export async function DELETE(request) {
  try {
    const { id, imatgeURL } = await request.json();

    if (imatgeURL) {
      const parts = imatgeURL.split("/");
      const arxiuAntic = parts[parts.length - 1];

      const { error: storageError } = await supabase
        .storage
        .from("noticies")
        .remove([arxiuAntic]);

      if (storageError) {
        console.error("Error esborrant imatge:", storageError);
      }
    }

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




