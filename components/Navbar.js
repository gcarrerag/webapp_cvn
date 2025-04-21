"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">
        🐾 Centre Veterinari Navarcles
      </Link>
      <div className="space-x-6 text-gray-700 font-medium">
        <Link href="/" className="hover:underline">Inici</Link>
        <Link href="/quisom" className="hover:underline">Qui som</Link>
        <Link href="/serveis" className="hover:underline">Serveis</Link>
        <Link href="/noticies" className="hover:underline text-gray-700">Notícies</Link>
        <Link href="/productes" className="hover:underline">Productes</Link>
        <Link href="/carret" className="hover:underline">Carret</Link>
      </div>
    </nav>
  );
}

