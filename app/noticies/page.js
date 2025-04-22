"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

export default function Noticies() {
  const [noticies, setNoticies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarNoticies = async () => {
      try {
        const res = await fetch("/api/noticies");
        if (!res.ok) {
          throw new Error("Error carregant notícies");
        }
        const dades = await res.json();
        if (Array.isArray(dades)) {
          setNoticies(dades);
        } else {
          throw new Error("Format de dades incorrecte");
        }
      } catch (err) {
        console.error("Error carregant notícies:", err);
        setError("No s'han pogut carregar les notícies.");
      }
    };
    carregarNoticies();
  }, []);

  return (
    <div>
      <Navbar />
      <main className="p-8 bg-gray-50 min-h-screen max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-800 mb-10 text-center">📰 Últimes notícies</h1>

        {error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : noticies.length === 0 ? (
          <p className="text-center text-gray-600">Encara no hi ha notícies.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {noticies.map((noticia) => (
              <div key={noticia.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                {noticia.imatge && (
                  <img
                    src={`/${noticia.imatge}`}
                    alt={noticia.titol}
                    className="w-full h-56 object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{noticia.titol}</h2>
                  <p className="text-gray-600 text-sm mb-4">
                    {new Date(noticia.data).toLocaleDateString()}
                  </p>
                  
                  <div
                    className="text-gray-700 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: noticia.contingut }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

