"use client";

import Navbar from "../../components/Navbar";

export default function QuiSom() {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-16 px-6 md:px-20">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">Qui som</h1>
          <p className="text-gray-600 text-lg">Coneix el nostre centre i el nostre equip</p>
        </header>

        <section className="bg-white p-8 rounded shadow mb-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Centre Veterinari Navarcles</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Fundat l'any <strong>1990</strong> pel veterinari <strong>Josep Maria Carrera</strong>, el nostre centre ha estat des de llavors un referent en la cura de les mascotes a Navarcles i rodalies.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Avui, amb la mateixa passió i dedicació, el centre està dirigit per la seva filla, la veterinària <strong>Carla Carrera Gusart</strong>, acompanyada de <strong>Maria Antònia Gusart</strong>, auxiliar veterinària i responsable de la botiga i la perruqueria canina.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            El nostre equip combina experiència i innovació per garantir el millor servei i atenció personalitzada per a cada mascota.
          </p>
        </section>

        <section className="bg-blue-50 p-8 rounded shadow">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Homenatge a Josep Maria Carrera</h2>
          <p className="text-gray-700 leading-relaxed">
            Volem retre homenatge al nostre fundador, <strong>Josep Maria Carrera</strong>, qui amb la seva vocació, professionalitat i estima pels animals va iniciar aquest projecte que avui continua viu amb la mateixa il·lusió.
          </p>
        </section>
      </main>
    </div>
  );
}
