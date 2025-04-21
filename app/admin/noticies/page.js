"use client";

import { useState } from "react";
import Navbar from "../../../components/Navbar";
import { Toaster, toast } from "react-hot-toast";
import Editor from "../../../components/Editor"; // 👉🏻 Editor TipTap
import withAuth from "../../../components/WithAuth"; // ✅ Importem la protecció

function AdminNoticies() {
  const [titol, setTitol] = useState("");
  const [cos, setCos] = useState("");
  const [imatge, setImatge] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titol || !cos) {
      toast.error("Omple tots els camps!");
      return;
    }

    const formData = new FormData();
    formData.append("titol", titol);
    formData.append("cos", cos);
    if (imatge) {
      formData.append("imatge", imatge);
    }

    try {
      const res = await fetch("/api/noticies", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("Notícia publicada!");
        setTitol("");
        setCos("");
        setImatge(null);
      } else {
        toast.error("Error en publicar notícia.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error inesperat.");
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
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700"
          >
            Publicar notícia
          </button>
        </form>
      </main>
    </div>
  );
}

export default withAuth(AdminNoticies); // ✅ Protegim la pàgina


