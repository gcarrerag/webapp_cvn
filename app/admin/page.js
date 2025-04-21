"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import withAuth from "../../components/WithAuth"; // ✅ Protecció
import Navbar from "../../components/Navbar";
import * as XLSX from "xlsx";

function Admin() {
  const [comandes, setComandes] = useState([]);
  const [productes, setProductes] = useState([]);
  const [formulari, setFormulari] = useState({ 
    nom: "", descripcio: "", preu: "", imatge: "", stock: "", animal: "", categoria: ""
  });
  const [editantProducteId, setEditantProducteId] = useState(null);

  const [filtreData, setFiltreData] = useState("");
  const [filtreEstat, setFiltreEstat] = useState("tots");
  const [filtreEnviament, setFiltreEnviament] = useState("tots");
  const [filtreCerca, setFiltreCerca] = useState("");

  useEffect(() => {
    carregarComandes();
    carregarProductes();
  }, []);

  const handleChange = (e) => setFormulari({ ...formulari, [e.target.name]: e.target.value });

  const afegirProducte = async (e) => {
    e.preventDefault();
    await fetch("/api/productes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formulari),
    });
    setFormulari({ nom: "", descripcio: "", preu: "", imatge: "", stock: "", animal: "", categoria: "" });
    carregarProductes();
  };

  const editarPreu = async (id, preuActual, stockActual) => {
    const nouPreu = prompt("Nou preu (€):", preuActual);
    if (nouPreu !== null) {
      await fetch(`/api/productes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preu: nouPreu, stock: stockActual }),
      });
      carregarProductes();
      setEditantProducteId(null);
    }
  };

  const editarStock = async (id, preuActual, stockActual) => {
    const nouStock = prompt("Nou stock:", stockActual);
    if (nouStock !== null) {
      await fetch(`/api/productes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preu: preuActual, stock: nouStock }),
      });
      carregarProductes();
      setEditantProducteId(null);
    }
  };

  const eliminarProducte = async (id) => {
    if (confirm("Segur que vols eliminar aquest producte?")) {
      await fetch(`/api/productes/${id}`, { method: "DELETE" });
      carregarProductes();
    }
  };

  const carregarComandes = async () => {
    const resposta = await fetch("/api/comanda");
    const dades = await resposta.json();
    setComandes(dades);
  };

  const carregarProductes = async () => {
    const resposta = await fetch("/api/productes");
    const dades = await resposta.json();
    setProductes(dades);
  };

  const marcarComEnviada = async (id) => {
    await fetch(`/api/comanda/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estat: "enviada" }),
    });
    carregarComandes();
  };

  const tancarSessio = () => {
    localStorage.removeItem("adminLogat");
    window.location.href = "/login";
  };

  const comandesFiltrades = comandes.filter((c) => {
    const dataComanda = new Date(c.data).toISOString().split("T")[0];
    const compleixData = !filtreData || filtreData === dataComanda;
    const compleixEstat = filtreEstat === "tots" || c.estat === filtreEstat;
    const compleixEnviament = filtreEnviament === "tots" || c.enviament === filtreEnviament;
    const cercaText = filtreCerca.toLowerCase();
    const compleixCerca = c.nom.toLowerCase().includes(cercaText) || c.telefon.includes(cercaText);
    return compleixData && compleixEstat && compleixEnviament && compleixCerca;
  });

  const exportarExcel = () => {
    const dades = comandesFiltrades.map(c => ({
      ID: c.id,
      Nom: c.nom,
      Telefon: c.telefon,
      Adreca: c.adreca,
      Enviament: c.enviament === "domicili" ? "Domicili" : "Recollida",
      Estat: c.estat,
      Data: new Date(c.data).toLocaleString(),
      Total: JSON.parse(c.productes).reduce((acc, p) => acc + (p.quantitat || 1) * parseFloat(p.preu), 0).toFixed(2) + " €"
    }));

    const worksheet = XLSX.utils.json_to_sheet(dades);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Comandes");
    XLSX.writeFile(workbook, "comandes.xlsx");
  };
  
  return (  
    <div>
      <Navbar />
      <main className="p-8 bg-gray-50 min-h-screen max-w-6xl mx-auto">

        {/* Capçalera i sessió */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">\ud83d\udc69 Carla Carrera⚕️ Panell administració</h1>
          <button onClick={tancarSessio} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Tancar sessió</button>
        </div>

        {/* Formulari de productes */}
        <form onSubmit={afegirProducte} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 bg-white p-6 rounded shadow">
	  <input name="nom" placeholder="Nom" value={formulari.nom} onChange={handleChange} required className="border px-4 py-2 rounded" />
	  <input name="descripcio" placeholder="Descripció" value={formulari.descripcio} onChange={handleChange} required className="border px-4 py-2 rounded" />
	  <input name="preu" placeholder="Preu (€)" value={formulari.preu} onChange={handleChange} type="number" required className="border px-4 py-2 rounded" />
	  <input name="imatge" placeholder="Nom imatge (ex: producte1.jpg)" value={formulari.imatge} onChange={handleChange} required className="border px-4 py-2 rounded" />
	  
	  {/* Nou: Tipus animal */}
	  <select name="animal" value={formulari.animal} onChange={handleChange} required className="border px-4 py-2 rounded">
	    <option value="">Selecciona Animal</option>
	    <option value="gos">Gos</option>
	    <option value="gat">Gat</option>
	    <option value="altres">Altres</option>
	  </select>

	  {/* Nou: Categoria */}
	  <select name="categoria" value={formulari.categoria} onChange={handleChange} required className="border px-4 py-2 rounded">
	    <option value="">Selecciona Categoria</option>
	    <option value="menjar">Menjar</option>
	    <option value="snacks">Snacks</option>
	    <option value="cosmetica">Cosmètica</option>
	    <option value="accessoris">Accessoris</option>
	    <option value="altres">Altres</option>
	  </select>

	  <input name="stock" placeholder="stock" value={formulari.stock} onChange={handleChange} type="number" required className="border px-4 py-2 rounded" />
	  <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition col-span-full">Afegir producte</button>
	</form>

        {/* Productes */}
        <h2 className="text-xl font-bold mb-4">\ud83d\udce6 Productes actuals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {productes.map((prod) => (
            <div key={prod.id} className="bg-white p-4 rounded shadow text-center">
              <img src={`/${prod.imatge}`} alt={prod.nom} className="w-full h-40 object-cover rounded mb-2" />
              <h3 className="font-semibold text-blue-800">{prod.nom}</h3>
              <p className="text-sm text-gray-600">{prod.descripcio}</p>
              <p className="font-bold text-green-700 mt-2">{prod.preu} €</p>
              <p className={`text-sm mt-1 ${prod.stock > 0 ? "text-gray-700" : "text-red-500 font-semibold"}`}>{prod.stock > 0 ? `Stock: ${prod.stock}` : "Sense stock"}</p>
              <div className="flex flex-col gap-2 mt-4">
                {editantProducteId === prod.id ? (
                  <>
                    <button onClick={() => editarPreu(prod.id, prod.preu, prod.stock)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">Editar Preu</button>
                    <button onClick={() => editarStock(prod.id, prod.preu, prod.stock)} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">Editar Stock</button>
                    <button onClick={() => setEditantProducteId(null)} className="text-gray-500">Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditantProducteId(prod.id)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded">Editar</button>
                    <button onClick={() => eliminarProducte(prod.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Eliminar</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Filtres i comandes */}
        {/* -- (mantinc la part de filtres i exportació intacta) -- */}
      </main>
      {/* 🔥 Filtres de comandes */}
	<h2 className="text-xl font-bold mb-4">📋 Comandes</h2>
	<div className="flex flex-wrap gap-4 mb-6">
	  <input
	    type="text"
	    placeholder="Buscar per nom o telèfon"
	    value={filtreCerca}
	    onChange={(e) => setFiltreCerca(e.target.value)}
	    className="border px-4 py-2 rounded"
	  />
	  <input
	    type="date"
	    value={filtreData}
	    onChange={(e) => setFiltreData(e.target.value)}
	    className="border px-4 py-2 rounded"
	  />
	  <select
	    value={filtreEstat}
	    onChange={(e) => setFiltreEstat(e.target.value)}
	    className="border px-4 py-2 rounded"
	  >
	    <option value="tots">Tots els estats</option>
	    <option value="pendent">Pendent</option>
	    <option value="enviada">Enviada</option>
	  </select>
	  <select
	    value={filtreEnviament}
	    onChange={(e) => setFiltreEnviament(e.target.value)}
	    className="border px-4 py-2 rounded"
	  >
	    <option value="tots">Tots els enviaments</option>
	    <option value="domicili">A domicili</option>
	    <option value="recollida">Recollida al local</option>
	  </select>
	  <button
	    onClick={exportarExcel}
	    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
	  >
	    Exportar a Excel
	  </button>
	</div>

	{/* 🔥 Comandes filtrades */}
	{comandesFiltrades.length === 0 ? (
	  <p className="text-gray-600">No hi ha comandes amb aquests filtres.</p>
	) : (
	  <div className="space-y-6">
	    {comandesFiltrades.map((comanda) => (
	      <div key={comanda.id} className="bg-white p-6 rounded shadow">
		<h2 className="text-lg font-semibold mb-2">🆔️ Comanda #{comanda.id}</h2>
		<p><strong>Nom:</strong> {comanda.nom}</p>
		<p><strong>Telèfon:</strong> {comanda.telefon}</p>
		<p><strong>Adreça:</strong> {comanda.adreca}</p>
		<p><strong>Enviament:</strong> {comanda.enviament === "domicili" ? "A domicili" : "Recollida al local"}</p>
		<p><strong>Observacions:</strong> {comanda.observacions || "Cap"}</p>
		<p><strong>Data:</strong> {new Date(comanda.data).toLocaleString()}</p>
		<p><strong>Estat:</strong> {comanda.estat === "enviada" ? "📦 Enviada" : "⏳ Pendent"}</p>

		{comanda.estat !== "enviada" && (
		  <button
		    onClick={() => marcarComEnviada(comanda.id)}
		    className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
		  >
		    Marcar com enviada
		  </button>
		)}

		<div className="mt-4">
		  <h3 className="font-semibold mb-1">🛍️ Productes:</h3>
		  <ul className="list-disc list-inside text-sm text-gray-700">
		    {JSON.parse(comanda.productes).map((prod, i) => (
		      <li key={i}>
		        {prod.nom} x {prod.quantitat || 1} —{" "}
		        {(prod.quantitat || 1) * parseFloat(prod.preu)} €
		      </li>
		    ))}
		  </ul>
		  <p className="text-right font-bold mt-4">
		    Total:{" "}
		    {JSON.parse(comanda.productes)
		      .reduce((acc, p) => acc + (p.quantitat || 1) * parseFloat(p.preu), 0)
		      .toFixed(2)}{" "}
		    €
		  </p>
		</div>
	      </div>
	    ))}
	  </div>
	)}

    </div>
  );
  
}

export default withAuth(Admin); // ✅ Important: exportar protegit



