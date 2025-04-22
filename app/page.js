"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />

      {/* Portada */}
      <section className="relative bg-cover bg-center h-[60vh] md:h-[75vh] w-full" style={{ backgroundImage: "url('/portada.jpg')" }}>
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Benestar per a la teva mascota</h1>
          <p className="text-md md:text-xl mb-6 max-w-lg">
            A la nostra botiga veterinària trobaràs tot el que necessita amb cura, amor i qualitat.
          </p>
          <Link href="/productes">
            <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-full text-lg shadow-lg">
              Veure productes
            </button>
          </Link>
        </div>
      </section>

      {/* Secció informativa */}
      <section className="py-12 md:py-16 px-4 md:px-20 bg-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-6">El nostre compromís amb els animals</h2>
        <p className="text-gray-700 max-w-3xl mx-auto text-md md:text-lg leading-relaxed">
          Oferim una selecció de productes pensats per la salut, alimentació i benestar dels teus companys peluts.
          Treballem amb marques reconegudes i els nostres veterinaris seleccionen els millors productes per a cada necessitat.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 text-center text-sm text-gray-600 px-4">
        © {new Date().getFullYear()} Centre Veterinari Navarcles · Tots els drets reservats
      </footer>
    </div>
  );
}

