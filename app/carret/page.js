"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Toaster, toast } from "react-hot-toast"; // ✅ Importem

export default function Carret() {
  const [carret, setCarret] = useState([]);

  useEffect(() => {
    const dades = JSON.parse(localStorage.getItem("carret")) || [];
    setCarret(dades);
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
      if (delta > 0) {
        toast.success(`Has afegit una unitat més de "${producte.nom}" ✅`);
      } else {
        toast(`Has reduït una unitat de "${producte.nom}"`, { icon: "➖" });
      }
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
      <Toaster /> {/* ✅ Afegeix aquest component per mostrar toasts */}
      <main className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">🛒 El teu carret</h1>

        {carret.length === 0 ? (
          <p className="text-gray-600">El carret està buit.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {carret.map((producte, index) => (
                <div key={index} className="bg-white rounded shadow p-4">
                  <img
                    src={`/${producte.imatge}`}
                    alt={producte.nom}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                  <h2 className="text-lg font-semibold">{producte.nom}</h2>
                  <p className="text-blue-600 font-bold">{producte.preu} €</p>

                  <div className="flex items-center justify-center gap-2 mt-4">
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
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition w-full"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-lg font-bold mb-4">Total: {calcularTotal()} €</p>
              <a
                href="/comanda"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
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


