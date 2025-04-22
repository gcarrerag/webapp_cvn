"use client";

import { useState } from "react";
import Navbar from "../../../components/Navbar";
import { Toaster, toast } from "react-hot-toast";
import Editor from "../../../components/Editor";
import withAuth from "../../../components/WithAuth";

function AdminNoticies() {
  const [titol, setTitol] = useState("");
  const [cos, setCos] = useState("");
  const [imatge, setImatge] = useState(null);
  const [carregant, setCarregant] = useState(false);

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
      if (imatge) {
        formData.append("imatge", imatge);
      }

      const res = await fetch("/api/noticies", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Error resposta servidor:", errorData);
        toast.error(errorData.error || "Error en publicar notícia.");
      } else {
        toast.success("Notícia publicada!");
        setTitol("");
        setCos("");
        setImatge(null);
      }
    } catch (err) {
      console.error("Error inesperat:", err);
      toast.error("Error inesperat en publicar.");
    } finally {
      setCarregant(false);
    }
  };

  return (
    <div>
      <Navbar />
      <Toaster />

      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-center mb-8">📰 Crear nova notícia</h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
          <input
            type="text"
            placeholder="Títol de la notícia"
            value={titol}
            onChange={(e) => setTitol(e.target.value)}
            className="border w-full px-4 py-2 rounded"
            required
          />

          {/* 🔥 Editor TipTap */}
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
            {carregant ? "Publicant..." : "Publicar notícia"}
          </button>
        </form>
      </main>
    </div>
  );
}

export default withAuth(AdminNoticies);

