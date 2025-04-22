"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Toaster, toast } from "react-hot-toast";

export default function Carret() {
  const [carret, setCarret] = useState([]);

  useEffect(() => {
    try {
      const dades = JSON.parse(localStorage.getItem("carret")) || [];
      setCarret(Array.isArray(dades) ? dades : []);
    } catch (err) {
      console.error("Error llegint carret:", err);
      setCarret([]);
    }
  }, []);

  const actualitzarCarret = (nouCarret) => {
    setCarret(nouCarret);
    localStorage.setItem("carret", JSON.stringify(nouCarret));
  };

  const eliminarProducte = (index) => {
    const nouCarret = [...carret];
    const producteEliminat = nouCarret.splice(index, 1)[0];
    actualitzarCarret(nouCarret);
    toast.error(`Producte "${producteEliminat.nom}" eliminat 🗑️`);
  };

  const canviarQuantitat = (index, delta) => {
    const nouCarret = [...carret];
    const producte = nouCarret[index];
    const stockDisponible = producte.stock || 0;
    const novaQuantitat = (producte.quantitat || 1) + delta;

    if (novaQuantitat > stockDisponible) {
      toast.error(`Només hi ha ${stockDisponible} unitats disponibles de "${producte.nom}".`);
      return;
    }

    if (novaQuantitat <= 0) {
      eliminarProducte(index);
    } else {
      producte.quantitat = novaQuantitat;
      actualitzarCarret(nouCarret);
      toast.success(delta > 0
        ? `Has afegit una unitat més de "${producte.nom}" ✅`
        : `Has reduït una unitat de "${producte.nom}" ➖`
      );
    }
  };

  const calcularTotal = () => {
    return carret.reduce((total, prod) => {
      const quantitat = prod.quantitat || 1;
      return total + quantitat * parseFloat(prod.preu);
    }, 0).toFixed(2);
  };

  return (
    <div>
      <Navbar />
      <Toaster />
      <main className="p-6 md:p-8 bg-gray-50 min-h-screen max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-800">🛒 El teu carret</h1>

        {carret.length === 0 ? (
          <p className="text-center text-gray-600 mt-20">El carret està buit.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {carret.map((producte, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center">
                  <img
                    src={producte.imatge}
                    alt={producte.nom}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                  <h2 className="text-lg font-bold text-gray-800 mb-1">{producte.nom}</h2>
                  <p className="text-blue-600 font-bold mb-2">{producte.preu} €</p>

                  <div className="flex items-center justify-center gap-2 mb-4">
                    <button
                      onClick={() => canviarQuantitat(index, -1)}
                      className="bg-gray-300 px-3 py-1 rounded text-xl hover:bg-gray-400"
                    >
                      −
                    </button>
                    <span className="font-semibold">{producte.quantitat || 1}</span>
                    <button
                      onClick={() => canviarQuantitat(index, 1)}
                      className="bg-gray-300 px-3 py-1 rounded text-xl hover:bg-gray-400"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => eliminarProducte(index)}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full transition"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-2xl font-bold text-green-700 mb-6">Total: {calcularTotal()} €</p>
              <a
                href="/comanda"
                className="inline-block bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3 rounded-full transition"
              >
                Finalitzar comanda
              </a>
            </div>
          </>
        )}
      </main>
    </div>
  );
}




