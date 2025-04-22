"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [usuari, setUsuari] = useState("");
  const [clau, setClau] = useState("");

  useEffect(() => {
    const comprovarSessio = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const redirect = searchParams.get("redirect") || "/admin";
        router.push(redirect);
      }
    };
    comprovarSessio();
  }, [router, searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email: usuari,
      password: clau,
    });

    if (error) {
      alert("Usuari o contrasenya incorrectes!");
    } else {
      const redirect = searchParams.get("redirect") || "/admin";
      router.push(redirect);
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
            type="email"
            placeholder="Correu electrònic"
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

