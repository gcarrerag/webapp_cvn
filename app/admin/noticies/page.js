"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Navbar from "../../../components/Navbar"
import Editor from "../../../components/Editor"
import withAuth from "../../../components/WithAuth"
import { motion } from "framer-motion"
import {
  FileText,
  ImageIcon,
  Save,
  Trash2,
  Edit,
  ArrowLeft,
  Calendar,
  Eye,
  LogOut,
  Plus,
  Loader2,
  CheckCircle,
  PawPrint,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast, Toaster } from "react-hot-toast"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

function AdminNoticies() {
  const router = useRouter()
  const [titol, setTitol] = useState("")
  const [cos, setCos] = useState("")
  const [imatge, setImatge] = useState(null)
  const [imatgePreview, setImatgePreview] = useState(null)
  const [carregant, setCarregant] = useState(false)
  const [noticies, setNoticies] = useState([])
  const [loading, setLoading] = useState(true)
  const [editantId, setEditantId] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [activeTab, setActiveTab] = useState("crear")
  const fileInputRef = useRef(null)

  useEffect(() => {
    carregarNoticies()
  }, [])

  const carregarNoticies = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/noticies")
      const dades = await res.json()
      if (Array.isArray(dades)) setNoticies(dades)
    } catch (error) {
      console.error("Error carregant notícies:", error)
      toast.error("Error carregant notícies")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!titol || !cos) {
      toast.error("Omple tots els camps!")
      return
    }

    try {
      setCarregant(true)

      const formData = new FormData()
      formData.append("titol", titol)
      formData.append("cos", cos)
      if (imatge) formData.append("imatge", imatge)

      if (editantId) {
        formData.append("id", editantId)
        const imatgeAntiga = noticies.find((n) => n.id === editantId)?.imatge || ""
        formData.append("imatgeAntiga", imatgeAntiga)
      }

      const url = "/api/noticies"
      const method = editantId ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        body: formData,
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        console.error("Error resposta servidor:", errorData)
        toast.error(errorData.error || "Error en publicar notícia.")
      } else {
        toast.success(editantId ? "Notícia editada correctament!" : "Notícia publicada correctament!")
        setTitol("")
        setCos("")
        setImatge(null)
        setImatgePreview(null)
        setEditantId(null)
        carregarNoticies()
        setActiveTab("llistat")
      }
    } catch (err) {
      console.error("Error inesperat:", err)
      toast.error("Error inesperat en publicar.")
    } finally {
      setCarregant(false)
    }
  }

  const eliminarNoticia = async (id) => {
    setConfirmDelete(id)
  }

  const confirmDeleteNoticia = async () => {
    try {
      const noticiaToDelete = noticies.find((n) => n.id === confirmDelete)
      if (!noticiaToDelete) {
        setConfirmDelete(null)
        return
      }

      const res = await fetch("/api/noticies", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: confirmDelete, imatgeURL: noticiaToDelete.imatge }),
      })

      if (res.ok) {
        toast.success("Notícia eliminada correctament!")
        setNoticies((prev) => prev.filter((n) => n.id !== confirmDelete))
      } else {
        const errorData = await res.json()
        toast.error(errorData.error || "Error eliminant notícia.")
      }
    } catch (error) {
      console.error("Error eliminant notícia:", error)
      toast.error("Error inesperat en eliminar.")
    } finally {
      setConfirmDelete(null)
    }
  }

  const iniciarEdicio = (noticia) => {
    setTitol(noticia.titol)
    setCos(noticia.contingut)
    setImatge(null)
    setImatgePreview(noticia.imatge)
    setEditantId(noticia.id)
    setActiveTab("crear")
    window.scrollTo({ top: 0, behavior: "smooth" })
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

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImatge(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImatgePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }
    return new Date(dateString).toLocaleDateString("ca-ES", options)
  }

  // Extraer resumen del contenido HTML
  const extractSummary = (htmlContent, maxLength = 150) => {
    // Crear un elemento temporal para eliminar las etiquetas HTML
    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = htmlContent
    const textContent = tempDiv.textContent || tempDiv.innerText || ""

    // Truncar el texto y añadir puntos suspensivos si es necesario
    if (textContent.length > maxLength) {
      return textContent.substring(0, maxLength) + "..."
    }
    return textContent
  }

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
          <h1 className="text-4xl md:text-6xl font-bold text-stone-800 mb-6">Gestió de Notícies</h1>
          <p className="text-stone-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Crea i gestiona les notícies del Centre Veterinari Navarcles
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
        <div className="max-w-5xl mx-auto">
          {/* Capçalera */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
          >
            <div>
              <h2 className="text-2xl font-bold text-stone-800">Panell de notícies</h2>
              <p className="text-stone-600">Crea i gestiona contingut per als teus clients</p>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => router.push("/admin")}
                className="border-amber-300 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Tornar al panell
              </Button>
              <Button variant="destructive" onClick={tancarSessio} className="bg-red-600 hover:bg-red-700">
                <LogOut className="mr-2 h-4 w-4" /> Tancar sessió
              </Button>
            </div>
          </motion.div>

          {/* Tabs principales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-stone-100">
                <TabsTrigger
                  value="crear"
                  className="flex items-center gap-2 data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                >
                  <Plus className="h-4 w-4" /> {editantId ? "Editar Notícia" : "Crear Notícia"}
                </TabsTrigger>
                <TabsTrigger
                  value="llistat"
                  className="flex items-center gap-2 data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                >
                  <FileText className="h-4 w-4" /> Notícies Publicades
                </TabsTrigger>
              </TabsList>

              {/* Tab de Crear/Editar Noticia */}
              <TabsContent value="crear" className="mt-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader className="bg-white border-b border-stone-100">
                    <CardTitle className="text-stone-800">
                      {editantId ? "Editar notícia existent" : "Crear nova notícia"}
                    </CardTitle>
                    <CardDescription className="text-stone-600">
                      {editantId
                        ? "Modifica els camps necessaris i guarda els canvis"
                        : "Omple tots els camps per publicar una nova notícia"}
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6 p-6">
                      <div className="space-y-2">
                        <label htmlFor="titol" className="text-sm font-medium text-stone-700">
                          Títol de la notícia
                        </label>
                        <Input
                          id="titol"
                          placeholder="Títol de la notícia"
                          value={titol}
                          onChange={(e) => setTitol(e.target.value)}
                          required
                          className="border-stone-200 focus:border-amber-300 focus:ring-amber-300"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="cos" className="text-sm font-medium text-stone-700">
                          Contingut
                        </label>
                        <div className="border border-stone-200 rounded-md">
                          <Editor value={cos} onChange={setCos} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="imatge" className="text-sm font-medium text-stone-700">
                          Imatge
                        </label>
                        <div className="flex items-center gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-2 border-amber-300 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
                          >
                            <ImageIcon className="h-4 w-4" /> Seleccionar imatge
                          </Button>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                          {(imatge || imatgePreview) && (
                            <span className="text-sm text-amber-600">
                              <CheckCircle className="inline-block mr-1 h-4 w-4" /> Imatge seleccionada
                            </span>
                          )}
                        </div>

                        {(imatgePreview || imatge) && (
                          <div className="mt-4">
                            <p className="text-sm text-stone-500 mb-2">Previsualització:</p>
                            <div className="relative w-full max-w-md h-48 rounded-md overflow-hidden border border-stone-200">
                              <img
                                src={imatgePreview || "/placeholder.svg"}
                                alt="Previsualització"
                                className="w-full h-full object-cover"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700"
                                onClick={() => {
                                  setImatge(null)
                                  setImatgePreview(null)
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between p-6 bg-amber-50 border-t border-amber-100">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setTitol("")
                          setCos("")
                          setImatge(null)
                          setImatgePreview(null)
                          setEditantId(null)
                        }}
                        className="border-amber-300 text-stone-700 hover:bg-stone-100"
                      >
                        Netejar
                      </Button>
                      <Button type="submit" disabled={carregant} className="bg-amber-600 hover:bg-amber-700 text-white">
                        {carregant ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {editantId ? "Guardant..." : "Publicant..."}
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            {editantId ? "Guardar canvis" : "Publicar notícia"}
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>

              {/* Tab de Listar Noticias */}
              <TabsContent value="llistat" className="mt-6">
                <Card className="mb-6 border-0 shadow-lg">
                  <CardHeader className="bg-white border-b border-stone-100">
                    <CardTitle className="text-stone-800">Notícies publicades</CardTitle>
                    <CardDescription className="text-stone-600">
                      Gestiona les notícies existents del Centre Veterinari Navarcles
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    {loading ? (
                      <div className="space-y-6">
                        {[...Array(3)].map((_, index) => (
                          <div key={index} className="flex flex-col space-y-3">
                            <Skeleton className="h-8 w-3/4 bg-stone-200" />
                            <Skeleton className="h-4 w-1/4 bg-stone-200" />
                            <Skeleton className="h-32 w-full bg-stone-200" />
                            <div className="flex gap-2">
                              <Skeleton className="h-10 w-20 bg-stone-200" />
                              <Skeleton className="h-10 w-20 bg-stone-200" />
                            </div>
                            <Separator className="my-2 bg-stone-200" />
                          </div>
                        ))}
                      </div>
                    ) : noticies.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="rounded-full bg-amber-100 p-3 inline-flex mb-4">
                          <FileText className="h-6 w-6 text-amber-600" />
                        </div>
                        <h3 className="text-lg font-medium mb-2 text-stone-800">No hi ha notícies publicades</h3>
                        <p className="text-stone-600 text-center max-w-md mx-auto mb-6">
                          Comença a crear notícies per mantenir informats als teus clients sobre novetats i
                          actualitzacions.
                        </p>
                        <Button
                          onClick={() => setActiveTab("crear")}
                          className="bg-amber-600 hover:bg-amber-700 text-white"
                        >
                          <Plus className="mr-2 h-4 w-4" /> Crear primera notícia
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        {noticies.map((noticia, index) => (
                          <motion.div
                            key={noticia.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <div className="flex flex-col md:flex-row gap-6">
                              {noticia.imatge && (
                                <div className="w-full md:w-1/3 h-48 rounded-md overflow-hidden bg-stone-100 border border-stone-200">
                                  <img
                                    src={noticia.imatge || "/placeholder.svg"}
                                    alt={noticia.titol}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="text-xl font-bold text-stone-800">{noticia.titol}</h3>
                                  <Badge
                                    variant="outline"
                                    className="flex items-center gap-1 bg-amber-50 text-amber-700 border-amber-200"
                                  >
                                    <Calendar className="h-3 w-3" /> {formatDate(noticia.data)}
                                  </Badge>
                                </div>
                                <p className="text-stone-600 mb-4 line-clamp-3">
                                  {extractSummary(noticia.contingut, 200)}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => iniciarEdicio(noticia)}
                                    className="border-amber-300 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
                                  >
                                    <Edit className="mr-2 h-4 w-4" /> Editar
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => eliminarNoticia(noticia.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                                  </Button>
                                  <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => window.open(`/noticies/${noticia.id}`, "_blank")}
                                    className="bg-stone-100 text-stone-800 hover:bg-stone-200"
                                  >
                                    <Eye className="mr-2 h-4 w-4" /> Previsualitzar
                                  </Button>
                                </div>
                              </div>
                            </div>
                            {index < noticies.length - 1 && <Separator className="my-6 bg-stone-200" />}
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>

      {/* Diálogo de confirmación para eliminar noticia */}
      <Dialog open={confirmDelete !== null} onOpenChange={(open) => !open && setConfirmDelete(null)}>
        <DialogContent className="border-amber-200">
          <DialogHeader>
            <DialogTitle className="text-stone-800">Confirmar eliminació</DialogTitle>
            <DialogDescription className="text-stone-600">
              Estàs segur que vols eliminar aquesta notícia? Aquesta acció no es pot desfer.
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
            <Button variant="destructive" onClick={confirmDeleteNoticia} className="bg-red-600 hover:bg-red-700">
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default withAuth(AdminNoticies)

