"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import withAuth from "../../components/WithAuth"
import Navbar from "../../components/Navbar"
import * as XLSX from "xlsx"
import { motion } from "framer-motion"
import {
  Package,
  ShoppingCart,
  Search,
  Calendar,
  Filter,
  Download,
  Edit,
  Trash2,
  LogOut,
  Save,
  X,
  Plus,
  CheckCircle,
  Clock,
  Home,
  Truck,
  AlertTriangle,
  PawPrint,
} from "lucide-react"

import { createClient } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast, Toaster } from "react-hot-toast"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

function Admin() {
  const router = useRouter()
  const [comandes, setComandes] = useState([])
  const [productes, setProductes] = useState([])
  const [formulari, setFormulari] = useState({
    nom: "",
    descripcio: "",
    preu: "",
    imatge: "",
    stock: "",
    animal: "",
    categoria: "",
  })
  const [editantProducteId, setEditantProducteId] = useState(null)
  const [filtreData, setFiltreData] = useState("")
  const [filtreEstat, setFiltreEstat] = useState("tots")
  const [filtreEnviament, setFiltreEnviament] = useState("tots")
  const [filtreCerca, setFiltreCerca] = useState("")
  const [activeTab, setActiveTab] = useState("productes")
  const [loading, setLoading] = useState(true)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [editMode, setEditMode] = useState({
    id: null,
    field: null,
    value: "",
  })

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await Promise.all([carregarComandes(), carregarProductes()])
      setLoading(false)
    }
    loadData()
  }, [])

  const handleChange = (e) => setFormulari({ ...formulari, [e.target.name]: e.target.value })

  const afegirProducte = async (e) => {
    e.preventDefault()
    try {
      toast.promise(
        fetch("/api/productes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formulari),
        }),
        {
          loading: "Afegint producte...",
          success: "Producte afegit correctament!",
          error: "Error afegint producte",
        },
      )
      setFormulari({ nom: "", descripcio: "", preu: "", imatge: "", stock: "", animal: "", categoria: "" })
      setTimeout(() => carregarProductes(), 1000)
    } catch (error) {
      console.error("Error afegint producte:", error)
      toast.error("Error afegint producte")
    }
  }

  const editarPreu = async (id, preuActual, stockActual) => {
    setEditMode({
      id,
      field: "preu",
      value: preuActual,
    })
  }

  const editarStock = async (id, preuActual, stockActual) => {
    setEditMode({
      id,
      field: "stock",
      value: stockActual,
    })
  }

  const saveEdit = async () => {
    const { id, field, value } = editMode
    const producte = productes.find((p) => p.id === id)

    if (!producte) return

    const updateData = {
      preu: field === "preu" ? value : producte.preu,
      stock: field === "stock" ? value : producte.stock,
    }

    try {
      await toast.promise(
        fetch(`/api/productes/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        }),
        {
          loading: `Actualitzant ${field}...`,
          success: `${field === "preu" ? "Preu" : "Stock"} actualitzat correctament!`,
          error: `Error actualitzant ${field}`,
        },
      )

      await carregarProductes()
      cancelEdit()
    } catch (error) {
      console.error(`Error actualitzant ${field}:`, error)
    }
  }

  const cancelEdit = () => {
    setEditMode({
      id: null,
      field: null,
      value: "",
    })
  }

  const eliminarProducte = async (id) => {
    setConfirmDelete(id)
  }

  const confirmDeleteProduct = async () => {
    try {
      await toast.promise(fetch(`/api/productes/${confirmDelete}`, { method: "DELETE" }), {
        loading: "Eliminant producte...",
        success: "Producte eliminat correctament!",
        error: "Error eliminant producte",
      })
      await carregarProductes()
      setConfirmDelete(null)
    } catch (error) {
      console.error("Error eliminant producte:", error)
    }
  }

  const carregarComandes = async () => {
    try {
      const resposta = await fetch("/api/comanda")
      const dades = await resposta.json()
      if (Array.isArray(dades)) setComandes(dades)
    } catch (error) {
      console.error("Error carregant comandes:", error)
      toast.error("Error carregant comandes")
    }
  }

  const carregarProductes = async () => {
    try {
      const resposta = await fetch("/api/productes")
      const dades = await resposta.json()
      if (Array.isArray(dades)) setProductes(dades)
    } catch (error) {
      console.error("Error carregant productes:", error)
      toast.error("Error carregant productes")
    }
  }

  const marcarComEnviada = async (id) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        toast.error("No hi ha sessió activa!")
        return
      }

      await toast.promise(
        fetch(`/api/comanda/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ estat: "enviada" }),
        }),
        {
          loading: "Actualitzant estat...",
          success: "Comanda marcada com enviada!",
          error: "Error actualitzant comanda",
        },
      )

      await carregarComandes()
    } catch (error) {
      console.error("Error marcant comanda com enviada:", error)
    }
  }

  const tancarSessio = async () => {
    try {
      await supabase.auth.signOut()
      toast.success("Sessió tancada correctament")
      setTimeout(() => {
        window.location.href = "/login"
      }, 1000)
    } catch (error) {
      console.error("Error tancant sessió:", error)
      toast.error("Error tancant sessió")
    }
  }

  const comandesFiltrades = comandes.filter((c) => {
    const dataComanda = new Date(c.data).toISOString().split("T")[0]
    const compleixData = !filtreData || filtreData === dataComanda
    const compleixEstat = filtreEstat === "tots" || c.estat === filtreEstat
    const compleixEnviament = filtreEnviament === "tots" || c.enviament === filtreEnviament
    const cercaText = filtreCerca.toLowerCase()
    const compleixCerca = c.nom.toLowerCase().includes(cercaText) || c.telefon.includes(cercaText)
    return compleixData && compleixEstat && compleixEnviament && compleixCerca
  })

  const exportarExcel = () => {
    const dades = comandesFiltrades.map((c) => {
      let total = 0
      try {
        const productesArray = JSON.parse(c.productes)
        total = productesArray.reduce((acc, p) => acc + (p.quantitat || 1) * Number.parseFloat(p.preu), 0)
      } catch {}
      return {
        ID: c.id,
        Nom: c.nom,
        Telefon: c.telefon,
        Adreca: c.adreca,
        Enviament: c.enviament === "domicili" ? "Domicili" : "Recollida",
        Estat: c.estat,
        Data: new Date(c.data).toLocaleString(),
        Total: total.toFixed(2) + " €",
      }
    })

    const worksheet = XLSX.utils.json_to_sheet(dades)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Comandes")
    XLSX.writeFile(workbook, "comandes.xlsx")
    toast.success("Excel exportat correctament!")
  }

  // Calcular estadísticas
  const totalComandes = comandes.length
  const comandesPendents = comandes.filter((c) => c.estat === "pendent").length
  const comandesEnviades = comandes.filter((c) => c.estat === "enviada").length
  const comandesDomicili = comandes.filter((c) => c.enviament === "domicili").length
  const comandesRecollida = comandes.filter((c) => c.enviament === "recollida").length

  const totalProductes = productes.length
  const productesAmbStock = productes.filter((p) => p.stock > 0).length
  const productesSenseStock = productes.filter((p) => p.stock <= 0).length

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <Toaster position="top-right" />

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-b from-amber-50 to-stone-100 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-64 bg-[url('/abstract-geometric-flow.png')] bg-cover opacity-10"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-300">Administració</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-stone-800 mb-6">Panell d'administració</h1>
          <p className="text-stone-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Gestiona els productes i comandes del Centre Veterinari Navarcles
          </p>
        </motion.div>

        <motion.div
          className="absolute bottom-0 right-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 0.1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <PawPrint className="h-64 w-64 text-amber-800" />
        </motion.div>
      </section>

      <main className="container mx-auto py-12 px-4 -mt-6">
        <div className="max-w-7xl mx-auto">
          {/* Capçalera */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
          >
            <div>
              <h2 className="text-2xl font-bold text-stone-800">Benvingut/da a l'administració</h2>
              <p className="text-stone-600">Gestiona tots els aspectes de la teva botiga</p>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => router.push("/admin/noticies")}
                className="border-amber-300 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
              >
                Gestionar Notícies
              </Button>
              <Button variant="destructive" onClick={tancarSessio} className="bg-red-600 hover:bg-red-700">
                <LogOut className="mr-2 h-4 w-4" /> Tancar sessió
              </Button>
            </div>
          </motion.div>

          {/* Resumen de estadísticas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-stone-500">Total Comandes</p>
                    <p className="text-3xl font-bold text-stone-800">{totalComandes}</p>
                  </div>
                  <div className="p-3 bg-amber-100 rounded-full">
                    <ShoppingCart className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
                <div className="flex justify-between mt-4 text-sm">
                  <div>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      <Clock className="mr-1 h-3 w-3" /> {comandesPendents} pendents
                    </Badge>
                  </div>
                  <div>
                    <Badge variant="outline" className="bg-stone-50 text-stone-700 border-stone-200">
                      <CheckCircle className="mr-1 h-3 w-3" /> {comandesEnviades} enviades
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-stone-500">Enviaments</p>
                    <div className="flex items-center gap-2">
                      <p className="text-3xl font-bold text-stone-800">{comandesDomicili}</p>
                      <p className="text-sm text-stone-500">domicili</p>
                    </div>
                  </div>
                  <div className="p-3 bg-amber-100 rounded-full">
                    <Truck className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
                <div className="flex justify-between mt-4 text-sm">
                  <div>
                    <Badge variant="outline" className="bg-stone-50 text-stone-700 border-stone-200">
                      <Home className="mr-1 h-3 w-3" /> {comandesRecollida} recollida
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-stone-500">Total Productes</p>
                    <p className="text-3xl font-bold text-stone-800">{totalProductes}</p>
                  </div>
                  <div className="p-3 bg-amber-100 rounded-full">
                    <Package className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
                <div className="flex justify-between mt-4 text-sm">
                  <div>
                    <Badge variant="outline" className="bg-stone-50 text-stone-700 border-stone-200">
                      <CheckCircle className="mr-1 h-3 w-3" /> {productesAmbStock} amb stock
                    </Badge>
                  </div>
                  <div>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      <AlertTriangle className="mr-1 h-3 w-3" /> {productesSenseStock} sense stock
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6 flex flex-col h-full justify-between">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-stone-500">Accions ràpides</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                  <Button size="sm" onClick={exportarExcel} className="bg-amber-600 hover:bg-amber-700 text-white">
                    <Download className="mr-2 h-4 w-4" /> Exportar comandes
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setActiveTab("productes")}
                    className="border-amber-300 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Afegir producte
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tabs principales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-stone-100">
                <TabsTrigger
                  value="productes"
                  className="flex items-center gap-2 data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                >
                  <Package className="h-4 w-4" /> Gestió de Productes
                </TabsTrigger>
                <TabsTrigger
                  value="comandes"
                  className="flex items-center gap-2 data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                >
                  <ShoppingCart className="h-4 w-4" /> Gestió de Comandes
                </TabsTrigger>
              </TabsList>

              {/* Tab de Productos */}
              <TabsContent value="productes" className="mt-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader className="bg-white border-b border-stone-100">
                    <CardTitle className="text-stone-800">Afegir nou producte</CardTitle>
                    <CardDescription className="text-stone-600">
                      Omple el formulari per afegir un nou producte a la botiga
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <form onSubmit={afegirProducte} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="nom" className="text-sm font-medium text-stone-700">
                          Nom del producte
                        </label>
                        <Input
                          id="nom"
                          name="nom"
                          placeholder="Nom"
                          value={formulari.nom}
                          onChange={handleChange}
                          required
                          className="border-stone-200 focus:border-amber-300 focus:ring-amber-300"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="descripcio" className="text-sm font-medium text-stone-700">
                          Descripció
                        </label>
                        <Input
                          id="descripcio"
                          name="descripcio"
                          placeholder="Descripció"
                          value={formulari.descripcio}
                          onChange={handleChange}
                          required
                          className="border-stone-200 focus:border-amber-300 focus:ring-amber-300"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="preu" className="text-sm font-medium text-stone-700">
                          Preu (€)
                        </label>
                        <Input
                          id="preu"
                          name="preu"
                          placeholder="Preu (€)"
                          value={formulari.preu}
                          onChange={handleChange}
                          type="number"
                          step="0.01"
                          required
                          className="border-stone-200 focus:border-amber-300 focus:ring-amber-300"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="imatge" className="text-sm font-medium text-stone-700">
                          Imatge (URL)
                        </label>
                        <Input
                          id="imatge"
                          name="imatge"
                          placeholder="Imatge (ex: producte.jpg)"
                          value={formulari.imatge}
                          onChange={handleChange}
                          required
                          className="border-stone-200 focus:border-amber-300 focus:ring-amber-300"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="animal" className="text-sm font-medium text-stone-700">
                          Animal
                        </label>
                        <Select
                          name="animal"
                          value={formulari.animal}
                          onValueChange={(value) => setFormulari({ ...formulari, animal: value })}
                        >
                          <SelectTrigger className="border-stone-200 focus:ring-amber-300">
                            <SelectValue placeholder="Selecciona Animal" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gos">Gos</SelectItem>
                            <SelectItem value="gat">Gat</SelectItem>
                            <SelectItem value="altres">Altres</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="categoria" className="text-sm font-medium text-stone-700">
                          Categoria
                        </label>
                        <Select
                          name="categoria"
                          value={formulari.categoria}
                          onValueChange={(value) => setFormulari({ ...formulari, categoria: value })}
                        >
                          <SelectTrigger className="border-stone-200 focus:ring-amber-300">
                            <SelectValue placeholder="Selecciona Categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="alimentacio">Alimentació</SelectItem>
                            <SelectItem value="snacks">Snacks</SelectItem>
                            <SelectItem value="higiene">Higiene</SelectItem>
                            <SelectItem value="accessoris">Accessoris i joguines</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="stock" className="text-sm font-medium text-stone-700">
                          Stock
                        </label>
                        <Input
                          id="stock"
                          name="stock"
                          placeholder="Stock"
                          value={formulari.stock}
                          onChange={handleChange}
                          type="number"
                          required
                          className="border-stone-200 focus:border-amber-300 focus:ring-amber-300"
                        />
                      </div>

                      <div className="md:col-span-2 flex justify-end">
                        <Button type="submit" className="w-full md:w-auto bg-amber-600 hover:bg-amber-700 text-white">
                          <Plus className="mr-2 h-4 w-4" /> Afegir producte
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2 text-stone-800">
                  <Package className="h-5 w-5 text-amber-600" /> Productes actuals
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {productes.map((prod) => (
                    <motion.div
                      key={prod.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="overflow-hidden h-full flex flex-col border-0 shadow-md hover:shadow-lg transition-all duration-300">
                        <div className="aspect-square overflow-hidden bg-stone-100">
                          <img
                            src={`/${prod.imatge}`}
                            alt={prod.nom}
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                          />
                        </div>
                        <CardContent className="p-4 flex-grow">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg text-stone-800">{prod.nom}</h3>
                            <Badge
                              variant="outline"
                              className={
                                prod.stock > 10
                                  ? "bg-stone-50 text-stone-700 border-stone-200"
                                  : prod.stock > 0
                                    ? "bg-amber-50 text-amber-700 border-amber-200"
                                    : "bg-red-50 text-red-700 border-red-200"
                              }
                            >
                              Stock: {prod.stock}
                            </Badge>
                          </div>

                          <div className="flex gap-2 mb-2">
                            <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                              {prod.animal}
                            </Badge>
                            <Badge variant="secondary" className="bg-stone-100 text-stone-800 hover:bg-stone-100">
                              {prod.categoria}
                            </Badge>
                          </div>

                          <p className="text-sm text-stone-600 mb-4 line-clamp-2">{prod.descripcio}</p>

                          {editMode.id === prod.id && editMode.field === "preu" ? (
                            <div className="flex items-center gap-2 mb-2">
                              <Input
                                type="number"
                                step="0.01"
                                value={editMode.value}
                                onChange={(e) => setEditMode({ ...editMode, value: e.target.value })}
                                className="w-24 border-amber-200 focus:border-amber-300 focus:ring-amber-300"
                              />
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={saveEdit}
                                className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                              >
                                <Save className="h-4 w-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={cancelEdit}
                                className="text-stone-600 hover:text-stone-700 hover:bg-stone-50"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-bold text-lg text-amber-700">{prod.preu} €</span>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => editarPreu(prod.id, prod.preu, prod.stock)}
                                className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          )}

                          {editMode.id === prod.id && editMode.field === "stock" ? (
                            <div className="flex items-center gap-2">
                              <Input
                                type="number"
                                value={editMode.value}
                                onChange={(e) => setEditMode({ ...editMode, value: e.target.value })}
                                className="w-24 border-amber-200 focus:border-amber-300 focus:ring-amber-300"
                              />
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={saveEdit}
                                className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                              >
                                <Save className="h-4 w-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={cancelEdit}
                                className="text-stone-600 hover:text-stone-700 hover:bg-stone-50"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-stone-600">Stock: {prod.stock}</span>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => editarStock(prod.id, prod.preu, prod.stock)}
                                className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex justify-end">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => eliminarProducte(prod.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Tab de Pedidos */}
              <TabsContent value="comandes" className="mt-6">
                <Card className="mb-6 border-0 shadow-lg">
                  <CardHeader className="bg-white border-b border-stone-100">
                    <CardTitle className="text-stone-800">Filtres de comandes</CardTitle>
                    <CardDescription className="text-stone-600">
                      Filtra les comandes per data, estat o tipus d'enviament
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="cerca" className="text-sm font-medium text-stone-700">
                          Cerca
                        </label>
                        <div className="relative">
                          <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500"
                            size={16}
                          />
                          <Input
                            id="cerca"
                            placeholder="Nom o telèfon"
                            value={filtreCerca}
                            onChange={(e) => setFiltreCerca(e.target.value)}
                            className="pl-9 border-stone-200 focus:border-amber-300 focus:ring-amber-300"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="data" className="text-sm font-medium text-stone-700">
                          Data
                        </label>
                        <div className="relative">
                          <Calendar
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500"
                            size={16}
                          />
                          <Input
                            id="data"
                            type="date"
                            value={filtreData}
                            onChange={(e) => setFiltreData(e.target.value)}
                            className="pl-9 border-stone-200 focus:border-amber-300 focus:ring-amber-300"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="estat" className="text-sm font-medium text-stone-700">
                          Estat
                        </label>
                        <Select value={filtreEstat} onValueChange={setFiltreEstat}>
                          <SelectTrigger id="estat" className="border-stone-200 focus:ring-amber-300">
                            <SelectValue placeholder="Selecciona estat" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tots">Tots</SelectItem>
                            <SelectItem value="pendent">Pendent</SelectItem>
                            <SelectItem value="enviada">Enviada</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="enviament" className="text-sm font-medium text-stone-700">
                          Enviament
                        </label>
                        <Select value={filtreEnviament} onValueChange={setFiltreEnviament}>
                          <SelectTrigger id="enviament" className="border-stone-200 focus:ring-amber-300">
                            <SelectValue placeholder="Tipus d'enviament" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tots">Tots</SelectItem>
                            <SelectItem value="domicili">Domicili</SelectItem>
                            <SelectItem value="recollida">Recollida</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between p-6 bg-amber-50 border-t border-amber-100">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFiltreData("")
                        setFiltreEstat("tots")
                        setFiltreEnviament("tots")
                        setFiltreCerca("")
                      }}
                      className="border-amber-300 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
                    >
                      Netejar filtres
                    </Button>
                    <Button onClick={exportarExcel} className="bg-amber-600 hover:bg-amber-700 text-white">
                      <Download className="mr-2 h-4 w-4" /> Exportar a Excel
                    </Button>
                  </CardFooter>
                </Card>

                <div className="space-y-6">
                  {comandesFiltrades.length === 0 ? (
                    <Card className="border-0 shadow-lg">
                      <CardContent className="flex flex-col items-center justify-center py-10">
                        <div className="rounded-full bg-amber-100 p-3 mb-4">
                          <Filter className="h-6 w-6 text-amber-600" />
                        </div>
                        <h3 className="text-lg font-medium mb-2 text-stone-800">
                          No hi ha comandes amb aquests filtres
                        </h3>
                        <p className="text-stone-600 text-center max-w-md">
                          Prova de canviar els filtres o netejar-los per veure totes les comandes disponibles.
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    comandesFiltrades.map((comanda) => {
                      // Calcular el total de la comanda
                      let total = 0
                      let productsArray = []

                      try {
                        // Només parsejar si és un string
                        if (typeof comanda.productes === "string") {
                          productsArray = JSON.parse(comanda.productes)
                        } else if (Array.isArray(comanda.productes)) {
                          productsArray = comanda.productes
                        }

                        total = productsArray.reduce(
                          (acc, p) => acc + (p.quantitat || 1) * Number.parseFloat(p.preu),
                          0,
                        )
                      } catch (e) {
                        console.error("Error parsejant productes:", e, comanda.productes)
                      }

                      return (
                        <motion.div
                          key={comanda.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
                            <CardHeader className="bg-white border-b border-stone-100">
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle className="flex items-center gap-2 text-stone-800">
                                    Comanda #{comanda.id}
                                    <Badge
                                      variant={comanda.estat === "enviada" ? "default" : "secondary"}
                                      className={
                                        comanda.estat === "enviada"
                                          ? "bg-stone-100 text-stone-800 hover:bg-stone-100"
                                          : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                      }
                                    >
                                      {comanda.estat === "enviada" ? "Enviada" : "Pendent"}
                                    </Badge>
                                  </CardTitle>
                                  <CardDescription className="text-stone-600">
                                    {new Date(comanda.data).toLocaleDateString()} -{" "}
                                    {new Date(comanda.data).toLocaleTimeString()}
                                  </CardDescription>
                                </div>
                                <div>
                                  <Badge
                                    variant="outline"
                                    className={
                                      comanda.enviament === "domicili"
                                        ? "bg-amber-50 text-amber-700 border-amber-200"
                                        : "bg-stone-50 text-stone-700 border-stone-200"
                                    }
                                  >
                                    {comanda.enviament === "domicili" ? (
                                      <Truck className="mr-1 h-3 w-3" />
                                    ) : (
                                      <Home className="mr-1 h-3 w-3" />
                                    )}
                                    {comanda.enviament === "domicili" ? "Enviament a domicili" : "Recollida al local"}
                                  </Badge>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="p-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h3 className="text-sm font-medium text-stone-500 mb-2">Dades del client</h3>
                                  <div className="space-y-2">
                                    <p className="text-sm text-stone-700">
                                      <span className="font-medium">Nom:</span> {comanda.nom}
                                    </p>
                                    <p className="text-sm text-stone-700">
                                      <span className="font-medium">Telèfon:</span> {comanda.telefon}
                                    </p>
                                    {comanda.enviament === "domicili" && (
                                      <p className="text-sm text-stone-700">
                                        <span className="font-medium">Adreça:</span> {comanda.adreca}
                                      </p>
                                    )}
                                    {comanda.observacions && (
                                      <p className="text-sm text-stone-700">
                                        <span className="font-medium">Observacions:</span> {comanda.observacions}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div>
                                  <h3 className="text-sm font-medium text-stone-500 mb-2">Productes</h3>
                                  <div className="space-y-2 max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-amber-200 scrollbar-track-stone-100">
                                    {productsArray.length > 0 ? (
                                      productsArray.map((prod, index) => (
                                        <div
                                          key={index}
                                          className="flex justify-between text-sm border-b border-stone-100 pb-1"
                                        >
                                          <span className="text-stone-700">
                                            {prod.quantitat || 1} x {prod.nom}
                                          </span>
                                          <span className="font-medium text-amber-700">
                                            {((prod.quantitat || 1) * Number.parseFloat(prod.preu)).toFixed(2)} €
                                          </span>
                                        </div>
                                      ))
                                    ) : (
                                      <p className="text-sm text-stone-500">
                                        No hi ha detalls de productes disponibles
                                      </p>
                                    )}
                                  </div>
                                  <div className="flex justify-end mt-4">
                                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                      Total: {total.toFixed(2)} €
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="flex justify-end p-4 bg-amber-50 border-t border-amber-100">
                              {comanda.estat !== "enviada" && (
                                <Button
                                  onClick={() => marcarComEnviada(comanda.id)}
                                  className="bg-amber-600 hover:bg-amber-700 text-white"
                                >
                                  <CheckCircle className="mr-2 h-4 w-4" /> Marcar com enviada
                                </Button>
                              )}
                            </CardFooter>
                          </Card>
                        </motion.div>
                      )
                    })
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>

      {/* Diálogo de confirmación para eliminar producto */}
      <Dialog open={confirmDelete !== null} onOpenChange={(open) => !open && setConfirmDelete(null)}>
        <DialogContent className="border-amber-200">
          <DialogHeader>
            <DialogTitle className="text-stone-800">Confirmar eliminació</DialogTitle>
            <DialogDescription className="text-stone-600">
              Estàs segur que vols eliminar aquest producte? Aquesta acció no es pot desfer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmDelete(null)}
              className="border-amber-300 text-stone-700 hover:bg-stone-100"
            >
              Cancel·lar
            </Button>
            <Button variant="destructive" onClick={confirmDeleteProduct} className="bg-red-600 hover:bg-red-700">
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default withAuth(Admin)

