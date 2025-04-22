"use client";

import { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import { Toaster, toast } from "react-hot-toast";
import Editor from "../../../components/Editor";
import withAuth from "../../../components/WithAuth";
import { createClient } from "@supabase/supabase-js"; // 🔥 Importa supabase

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function AdminNoticies() {
  const [titol, setTitol] = useState("");
  const [cos, setCos] = useState("");
  const [imatge, setImatge] = useState(null);
  const [carregant, setCarregant] = useState(false);
  const [noticies, setNoticies] = useState([]);
  const [editantId, setEditantId] = useState(null);

  useEffect(() => {
    carregarNoticies();
  }, []);

  const carregarNoticies = async () => {
    try {
      const res = await fetch("/api/noticies");
      const dades = await res.json();
      if (Array.isArray(dades)) setNoticies(dades);
    } catch (error) {
      console.error("Error carregant notícies:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titol || !cos) {
      toast.error("Omple tots els camps!");
      return;
    }

    try {
      setCarregant(true);

      const formData = new FormData();
      formData.append("titol", titol);
      formData.append("cos", cos);
      if (imatge) formData.append("imatge", imatge);

      if (editantId) {
        formData.append("id", editantId);
        const imatgeAntiga = noticies.find((n) => n.id === editantId)?.imatge || "";
        formData.append("imatgeAntiga", imatgeAntiga);
      }

      const url = "/api/noticies";
      const method = editantId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Error resposta servidor:", errorData);
        toast.error(errorData.error || "Error en publicar notícia.");
      } else {
        toast.success(editantId ? "Notícia editada!" : "Notícia publicada!");
        setTitol("");
        setCos("");
        setImatge(null);
        setEditantId(null);
        carregarNoticies();
      }
    } catch (err) {
      console.error("Error inesperat:", err);
      toast.error("Error inesperat en publicar.");
    } finally {
      setCarregant(false);
    }
  };

  const eliminarNoticia = async (id, imatgeURL) => {
    const confirmar = confirm("Segur que vols eliminar aquesta notícia?");
    if (!confirmar) return;

    try {
      const res = await fetch("/api/noticies", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, imatgeURL }),
      });

      if (res.ok) {
        toast.success("Notícia eliminada ✅");
        setNoticies((prev) => prev.filter((n) => n.id !== id));
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Error eliminant notícia.");
      }
    } catch (error) {
      console.error("Error eliminant notícia:", error);
      toast.error("Error inesperat en eliminar.");
    }
  };

  const iniciarEdicio = (noticia) => {
    setTitol(noticia.titol);
    setCos(noticia.contingut);
    setImatge(null);
    setEditantId(noticia.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const tancarSessio = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error tancant sessió:", error);
    } else {
      window.location.href = "/login"; // 🔥 Redireccionem a login
    }
  };

  return (
    <div>
      <Navbar />
      <Toaster />

      <main className="max-w-5xl mx-auto p-8">
        {/* Botó per tancar sessió */}
        <div className="flex justify-end mb-4">
          <button
            onClick={tancarSessio}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Tancar sessió
          </button>
        </div>

        <h1 className="text-3xl font-bold text-center mb-8">
          {editantId ? "✏️ Editar notícia" : "📰 Crear nova notícia"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow mb-10">
          <input
            type="text"
            placeholder="Títol de la notícia"
            value={titol}
            onChange={(e) => setTitol(e.target.value)}
            className="border w-full px-4 py-2 rounded"
            required
          />

          <Editor value={cos} onChange={setCos} />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImatge(e.target.files[0])}
            className="border w-full px-4 py-2 rounded"
          />

          <button
            type="submit"
            disabled={carregant}
            className={`bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 ${carregant ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {carregant ? (editantId ? "Guardant..." : "Publicant...") : (editantId ? "Guardar canvis" : "Publicar notícia")}
          </button>
        </form>

        <h2 className="text-2xl font-bold mb-6">🗞️ Notícies publicades</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {noticies.map((noticia) => (
            <div key={noticia.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              {noticia.imatge && (
                <img
                  src={noticia.imatge}
                  alt={noticia.titol}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{noticia.titol}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {new Date(noticia.data).toLocaleDateString()}
                </p>
                <div
                  className="text-gray-700 text-sm mb-4"
                  dangerouslySetInnerHTML={{ __html: noticia.contingut }}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => iniciarEdicio(noticia)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 rounded"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => eliminarNoticia(noticia.id, noticia.imatge)}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default withAuth(AdminNoticies);




