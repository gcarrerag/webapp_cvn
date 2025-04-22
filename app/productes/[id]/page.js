"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../../components/Navbar";
import { Toaster, toast } from "react-hot-toast"; // ✅ Toasts de confirmació

export default function Producte() {
  const { id } = useParams();
  const [producte, setProducte] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarProducte = async () => {
      try {
        const res = await fetch(`/api/productes/${id}`);
        if (!res.ok) {
          throw new Error("Error carregant el producte");
        }
        const data = await res.json();
        setProducte(data);
      } catch (err) {
        console.error("Error carregant producte:", err);
        setError("No s'ha pogut carregar el producte.");
      }
    };
    if (id) {
      carregarProducte();
    }
  }, [id]);

  const afegirAlCarret = () => {
    if (!producte) return;
    const carret = JSON.parse(localStorage.getItem("carret")) || [];
    const existeix = carret.find(p => p.id === producte.id);

    if (existeix) {
      if (existeix.quantitat < producte.stock) {
        existeix.quantitat++;
        toast.success("Afegit una altra unitat! ✅");
      } else {
        toast.error(`Només queden ${producte.stock} unitats disponibles ❌`);
        return;
      }
    } else {
      carret.push({ ...producte, quantitat: 1 });
      toast.success("Producte afegit al carret! 🛒");
    }

    localStorage.setItem("carret", JSON.stringify(carret));
  };

  if (error) {
    return (
      <div>
        <Navbar />
        <main className="p-8 text-center text-red-600">{error}</main>
      </div>
    );
  }

  if (!producte) {
    return (
      <div>
        <Navbar />
        <main className="p-8 text-center text-gray-600">Carregant...</main>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Toaster />
      <main className="p-8 bg-gray-50 min-h-screen max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10 bg-white p-6 rounded shadow">
          <div className="flex-1">
            <img
              src={`/${producte.imatge}`}
              alt={producte.nom}
              className="w-full h-80 object-cover rounded"
            />
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-2xl font-bold mb-4">{producte.nom}</h1>
            <p className="text-gray-600 mb-2">{producte.descripcio}</p>
            <p className="text-green-700 text-xl font-semibold mb-2">{producte.preu} €</p>

            {producte.stock > 0 ? (
              <p className="text-sm text-gray-700 mb-4">Stock disponible: {producte.stock}</p>
            ) : (
              <p className="text-sm text-red-600 font-semibold mb-4">Sense stock</p>
            )}

            <button
              onClick={afegirAlCarret}
              disabled={producte.stock === 0}
              className={`py-3 px-6 rounded font-bold transition ${
                producte.stock > 0
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
            >
              {producte.stock > 0 ? "Afegir al carret" : "Sense stock"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}



