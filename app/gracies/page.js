"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";

export default function Gracies() {
  const router = useRouter();
  const [ultimaComanda, setUltimaComanda] = useState(null);

  useEffect(() => {
    const comandaGuardada = JSON.parse(localStorage.getItem("ultimaComanda"));
    if (!comandaGuardada) {
      router.push("/");
    } else {
      setUltimaComanda(comandaGuardada);
      localStorage.removeItem("carret");

      // 🔥 Només enviar la comanda a Telegram si era pagament amb targeta
      if (comandaGuardada.metodePagament === "stripe") {
        enviarComandaATelegram(comandaGuardada);
      }

      localStorage.removeItem("ultimaComanda");
    }
  }, [router]);

  const enviarComandaATelegram = async (comanda) => {
    try {
      await fetch("/api/comanda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...comanda,
          productes: comanda.productes.map((p) => ({
            id: p.id,
            nom: p.nom,
            preu: p.preu,
            quantitat: p.quantitat,
          })),
        }),
      });
    } catch (error) {
      console.error("Error enviant comanda a Telegram:", error);
    }
  };

  if (!ultimaComanda) {
    return null;
  }

  return (
    <div>
      <Navbar />
      <main className="p-8 bg-gray-50 min-h-screen max-w-3xl mx-auto text-center">
        <div className="bg-white p-8 rounded shadow-md">
          <h1 className="text-3xl font-bold text-green-700 mb-4">
            ✅ Gràcies per la teva comanda!
          </h1>
          <p className="text-gray-600 mb-8">
            Ens posarem en contacte amb tu molt aviat per confirmar l&apos;enviament o la recollida.
          </p>

          <div className="text-left text-gray-800">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Resum de la comanda
            </h2>

            <div className="space-y-2 mb-6">
              <p><span className="font-semibold">Nom:</span> {ultimaComanda.nom}</p>
              <p><span className="font-semibold">Telèfon:</span> {ultimaComanda.telefon}</p>
              <p>
                <span className="font-semibold">Enviament:</span>{" "}
                {ultimaComanda.enviament === "domicili" ? "A domicili" : "Recollida al local"}
              </p>
              {ultimaComanda.enviament === "domicili" && (
                <p><span className="font-semibold">Adreça:</span> {ultimaComanda.adreca}</p>
              )}
              {ultimaComanda.observacions && (
                <p><span className="font-semibold">Observacions:</span> {ultimaComanda.observacions}</p>
              )}
            </div>

            <hr className="my-6" />

            <div>
              <h3 className="text-xl font-bold mb-4">🛍️ Productes adquirits:</h3>
              <ul className="list-disc list-inside space-y-1 mb-6 text-sm">
                {ultimaComanda.productes.map((prod, i) => (
                  <li key={i}>
                    {prod.nom} x {prod.quantitat || 1} —{" "}
                    {(prod.preu * (prod.quantitat || 1)).toFixed(2)} €
                  </li>
                ))}
              </ul>

              <p className="text-right text-lg font-bold text-green-700">
                Total:{" "}
                {ultimaComanda.productes.reduce(
                  (acc, p) => acc + (p.preu * (p.quantitat || 1)),
                  0
                ).toFixed(2)} €
              </p>
            </div>
          </div>

          <hr className="my-6" />

          <p className="text-center text-gray-500 text-sm">
            Centre Veterinari Navarcles - Compromesos amb el benestar de la teva mascota.
          </p>
        </div>
      </main>
    </div>
  );
}




