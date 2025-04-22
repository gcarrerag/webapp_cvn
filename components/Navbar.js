"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuObert, setMenuObert] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">
        🐾 Centre Veterinari Navarcles
      </Link>

      {/* Botó menú per mòbil */}
      <button
        onClick={() => setMenuObert(!menuObert)}
        className="md:hidden text-3xl focus:outline-none"
      >
        ☰
      </button>

      {/* Links */}
      <div className={`flex-col md:flex-row md:flex md:items-center md:space-x-6 text-gray-700 font-medium ${menuObert ? "flex mt-4 space-y-4" : "hidden"} md:space-y-0`}>
        <Link href="/" className="hover:underline" onClick={() => setMenuObert(false)}>Inici</Link>
        <Link href="/quisom" className="hover:underline" onClick={() => setMenuObert(false)}>Qui som</Link>
        <Link href="/serveis" className="hover:underline" onClick={() => setMenuObert(false)}>Serveis</Link>
        <Link href="/noticies" className="hover:underline" onClick={() => setMenuObert(false)}>Notícies</Link>
        <Link href="/productes" className="hover:underline" onClick={() => setMenuObert(false)}>Productes</Link>
        <Link href="/carret" className="hover:underline" onClick={() => setMenuObert(false)}>Carret</Link>
      </div>
    </nav>
  );
}


