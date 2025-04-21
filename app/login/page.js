"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // 👉🏻 importem també useSearchParams
import Navbar from "../../components/Navbar";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams(); // 🔥 per llegir els paràmetres de la URL
  const [usuari, setUsuari] = useState("");
  const [clau, setClau] = useState("");

  useEffect(() => {
    const sessio = localStorage.getItem("adminLogat");
    if (sessio === "true") {
      const redirect = searchParams.get("redirect") || "/admin";
      router.push(redirect);
    }
  }, [router, searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (usuari === "admin" && clau === "1234") {
      localStorage.setItem("adminLogat", "true");
      const redirect = searchParams.get("redirect") || "/admin"; // 🔥 llegim on volia anar
      router.push(redirect);
    } else {
      alert("Usuari o contrasenya incorrectes!");
    }
  };

  return (
    <div>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow w-full max-w-sm space-y-4"
        >
          <h1 className="text-2xl font-bold text-center">🔐 Inici de sessió</h1>

          <input
            type="text"
            placeholder="Usuari"
            value={usuari}
            onChange={(e) => setUsuari(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          />

          <input
            type="password"
            placeholder="Contrasenya"
            value={clau}
            onChange={(e) => setClau(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>
      </main>
    </div>
  );
}

