"use client";

import Navbar from "../../components/Navbar";

export default function Serveis() {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-white py-12 px-6 md:px-20">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Serveis veterinaris</h1>
          <p className="text-gray-600 text-lg">Cuidem de la teva mascota amb professionalitat i amor</p>
        </header>

        <section className="grid gap-10 md:grid-cols-2">
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-green-700 mb-2">Consultes veterinàries</h2>
            <p className="text-gray-700">Diagnòstic, tractament i prevenció de malalties per a gossos, gats i altres animals de companyia.</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-green-700 mb-2">Vacunacions i desparasitacions</h2>
            <p className="text-gray-700">Pla de vacunació adaptat a cada mascota i control de paràsits interns i externs.</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-green-700 mb-2">Cirurgia veterinària</h2>
          <p className="text-gray-700">Intervencions quirúrgiques de rutina i especialitzades, ecografies en instal·lacions modernes i segures.</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-green-700 mb-2">Perruqueria canina i felina</h2>
            <p className="text-gray-700">Servei de perruqueria per mantenir la higiene i l'estètica de la teva mascota amb amor i professionalitat.</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-green-700 mb-2">Botiga especialitzada</h2>
            <p className="text-gray-700">Alimentació de qualitat, accessoris i productes de salut seleccionats per al benestar de la teva mascota.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
