"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import { Toaster, toast } from "react-hot-toast";

export default function Comanda() {
  const [carret, setCarret] = useState([]);
  const [carregant, setCarregant] = useState(false);
  const [formulari, setFormulari] = useState({
    nom: "",
    telefon: "",
    adreca: "",
    observacions: "",
    enviament: "domicili",
    metodePagament: "stripe",
  });

  const router = useRouter();

  useEffect(() => {
    const dades = JSON.parse(localStorage.getItem("carret")) || [];
    setCarret(dades);
  }, []);

  const handleChange = (e) => {
    setFormulari({ ...formulari, [e.target.name]: e.target.value });
  };

  const enviarComanda = async (e) => {
    e.preventDefault();

    if (carret.length === 0) {
      toast.error("El carret està buit!");
      return;
    }

    if (!/^\d{9}$/.test(formulari.telefon)) {
      toast.error("Introdueix un telèfon vàlid (9 dígits).");
      return;
    }

    if (formulari.enviament === "domicili" && formulari.adreca.trim() === "") {
      toast.error("Has d&apos;introduir una adreça per a l&apos;enviament a domicili.");
      return;
    }

    setCarregant(true);

    try {
      // 1. Guardar la comanda
      await fetch("/api/comanda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formulari,
          productes: carret.map((p) => ({
            id: p.id,
            nom: p.nom,
            preu: p.preu,
            quantitat: p.quantitat,
          })),
        }),
      });

      // 2. Guardar en localStorage
      localStorage.setItem("ultimaComanda", JSON.stringify({
        ...formulari,
        productes: carret,
      }));

      if (formulari.enviament === "domicili" || formulari.metodePagament === "stripe") {
        // Pagament amb Stripe
        const respostaStripe = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formulari,
            productes: carret,
          }),
        });

        if (respostaStripe.ok) {
          const { url } = await respostaStripe.json();
          window.location.href = url;
        } else {
          toast.error("Error en iniciar el pagament.");
          setCarregant(false);
        }
      } else {
        // Pagament al local ➔ redirigir a gràcies
        localStorage.removeItem("carret");
        router.push("/gracies");
      }
    } catch (error) {
      console.error("Error en enviar la comanda:", error);
      toast.error("Error inesperat.");
      setCarregant(false);
    }
  };

  return (
    <div>
      <Navbar />
      <Toaster />
      <main className="p-8 bg-gray-50 min-h-screen max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">📦 Finalitzar comanda</h1>

        <form onSubmit={enviarComanda} className="grid gap-4 mb-8 bg-white p-6 rounded shadow">
          <input
            type="text"
            name="nom"
            placeholder="Nom i cognoms"
            value={formulari.nom}
            onChange={handleChange}
            required
            className="border px-4 py-2 rounded"
          />
          <input
            type="tel"
            name="telefon"
            placeholder="Telèfon"
            value={formulari.telefon}
            onChange={handleChange}
            required
            className="border px-4 py-2 rounded"
          />

          {/* Enviament */}
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="enviament"
                value="domicili"
                checked={formulari.enviament === "domicili"}
                onChange={handleChange}
              />{" "}
              Domicili
            </label>
            <label>
              <input
                type="radio"
                name="enviament"
                value="recollida"
                checked={formulari.enviament === "recollida"}
                onChange={handleChange}
              />{" "}
              Recollida al local
            </label>
          </div>

          {/* Adreça si domicili */}
          {formulari.enviament === "domicili" && (
            <input
              type="text"
              name="adreca"
              placeholder="Adreça d&apos;enviament"
              value={formulari.adreca}
              onChange={handleChange}
              required
              className="border px-4 py-2 rounded"
            />
          )}

          {/* Mètode de pagament si recollida */}
          {formulari.enviament === "recollida" && (
            <div>
              <h3 className="font-semibold mb-2 text-gray-700">Mètode de pagament</h3>
              <select
                name="metodePagament"
                value={formulari.metodePagament}
                onChange={handleChange}
                className="border px-4 py-2 rounded w-full"
              >
                <option value="stripe">Pagar ara amb targeta</option>
                <option value="local">Pagar al local</option>
              </select>
            </div>
          )}

          <textarea
            name="observacions"
            placeholder="Observacions (opcional)"
            value={formulari.observacions}
            onChange={handleChange}
            className="border px-4 py-2 rounded"
          ></textarea>

          {/* Botó enviar */}
          <button
            type="submit"
            disabled={carregant}
            className={`py-2 px-4 rounded transition ${
              carregant ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {carregant ? "Processant comanda..." : "Confirmar comanda"}
          </button>
        </form>

        {/* Carret resum */}
        {carret.length > 0 && (
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">🛍️ Resum del carret</h2>
            <ul className="space-y-2">
              {carret.map((prod, i) => (
                <li key={i} className="flex justify-between border-b pb-2">
                  <span>{prod.nom} x {prod.quantitat || 1}</span>
                  <span className="font-semibold">{(prod.preu * (prod.quantitat || 1)).toFixed(2)} €</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}



