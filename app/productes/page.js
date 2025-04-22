"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Link from "next/link";

export default function Productes() {
  const [productes, setProductes] = useState([]);
  const [filtreAnimal, setFiltreAnimal] = useState("tots");
  const [filtreCategoria, setFiltreCategoria] = useState("tots");

  useEffect(() => {
    const carregar = async () => {
      try {
        const res = await fetch("/api/productes");
        const dades = await res.json();

        if (Array.isArray(dades)) {
          setProductes(dades);
        } else {
          console.error("Resposta inesperada de /api/productes:", dades);
          setProductes([]);
        }
      } catch (error) {
        console.error("Error carregant productes:", error);
        setProductes([]);
      }
    };
    carregar();
  }, []);

  const productesFiltrats = productes.filter((prod) => {
    const compleixAnimal = filtreAnimal === "tots" || prod.animal === filtreAnimal;
    const compleixCategoria = filtreCategoria === "tots" || prod.categoria === filtreCategoria;
    return compleixAnimal && compleixCategoria;
  });

  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-white py-8 px-6 md:px-20 flex gap-8">
        
        {/* 🧩 Sidebar de Filtres (esquerra) */}
        <aside className="hidden md:block w-1/4 bg-gray-50 p-6 rounded shadow h-fit">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">Filtres</h2>

          <div className="mb-6">
            <h3 className="text-gray-600 font-semibold mb-2">Animal</h3>
            <select
              value={filtreAnimal}
              onChange={(e) => setFiltreAnimal(e.target.value)}
              className="w-full border px-4 py-2 rounded"
            >
              <option value="tots">Tots</option>
              <option value="gos">Gos</option>
              <option value="gat">Gat</option>
              <option value="altres">Altres</option>
            </select>
          </div>

          <div className="mb-6">
            <h3 className="text-gray-600 font-semibold mb-2">Categoria</h3>
            <select
              value={filtreCategoria}
              onChange={(e) => setFiltreCategoria(e.target.value)}
              className="w-full border px-4 py-2 rounded"
            >
              <option value="tots">Totes</option>
              <option value="menjar">Menjar</option>
              <option value="snacks">Snacks</option>
              <option value="cosmetica">Cosmètica</option>
              <option value="accessoris">Accessoris</option>
              <option value="altres">Altres</option>
            </select>
          </div>
        </aside>

        {/* 🛍️ Llistat de productes (dreta) */}
        <section className="flex-1">
          <header className="mb-10">
            <h1 className="text-4xl font-bold text-blue-800 mb-2">Productes disponibles</h1>
            <p className="text-gray-600 text-lg">Troba el millor per a la teva mascota</p>
          </header>

          {productesFiltrats.length === 0 ? (
            <p className="text-center text-gray-600 mt-10">No hi ha productes amb aquest filtre.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {productesFiltrats.map((prod) => (
                <div key={prod.id} className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col items-center text-center">
                  <Link href={`/productes/${prod.id}`}>
                    <img
                      src={prod.imatge}
                      alt={prod.nom}
                      className="w-full h-52 object-cover rounded-lg mb-4"
                    />
                  </Link>
                  <h2 className="text-lg font-bold text-gray-800 mb-1">{prod.nom}</h2>
                  <p className="text-sm text-gray-500 mb-2">{prod.descripcio}</p>
                  <p className="text-green-700 font-bold text-md mb-3">{prod.preu} €</p>

                  <Link href={`/productes/${prod.id}`}>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-full transition">
                      Veure producte
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}






