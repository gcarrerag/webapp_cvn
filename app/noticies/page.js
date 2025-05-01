"use client"
import Link from "next/link"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Navbar from "../../components/Navbar"
import { motion } from "framer-motion"
import {
  Calendar,
  Clock,
  Share2,
  ChevronLeft,
  ChevronRight,
  Search,
  AlertCircle,
  Facebook,
  Twitter,
  Linkedin,
  PhoneIcon as WhatsApp,
  PawPrint,
  BookOpen,
  ArrowRight,
  Bookmark,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Noticies() {
  const [noticies, setNoticies] = useState([])
  const [filteredNoticies, setFilteredNoticies] = useState([])
  const [error, setError] = useState(null)
  const [carregant, setCarregant] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [shareOpen, setShareOpen] = useState(null)
  // Eliminar estas líneas
  // const [categories, setCategories] = useState([
  //   { name: "Totes", active: true },
  //   { name: "Consells", active: false },
  //   { name: "Salut", active: false },
  //   { name: "Nutrició", active: false },
  //   { name: "Esdeveniments", active: false },
  // ])
  // const [activeCategory, setActiveCategory] = useState("Totes")

  const searchParams = useSearchParams()
  const itemsPerPage = 6

  useEffect(() => {
    const page = searchParams.get("page")
    if (page) {
      setCurrentPage(Number.parseInt(page))
    }

    const carregarNoticies = async () => {
      try {
        setCarregant(true)
        const res = await fetch("/api/noticies")
        if (!res.ok) {
          throw new Error("Error carregant notícies")
        }
        const dades = await res.json()
        if (Array.isArray(dades)) {
          setNoticies(dades)
          setFilteredNoticies(dades)
        } else {
          throw new Error("Format de dades incorrecte")
        }
      } catch (err) {
        console.error("Error carregant notícies:", err)
        setError("No s'han pogut carregar les notícies.")
      } finally {
        setCarregant(false)
      }
    }
    carregarNoticies()
  }, [searchParams])

  // Filtrar noticias cuando cambia el término de búsqueda o categoría
  useEffect(() => {
    // Filtrar noticias cuando cambia el término de búsqueda
    if (searchTerm.trim() === "") {
      setFilteredNoticies(noticies)
    } else {
      const filtered = noticies.filter(
        (noticia) =>
          noticia.titol.toLowerCase().includes(searchTerm.toLowerCase()) ||
          noticia.contingut.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredNoticies(filtered)
    }
    setCurrentPage(1)
  }, [searchTerm, noticies])

  // Cambiar categoría activa
  // Eliminar esta función
  // const handleCategoryChange = (categoryName) => {
  //   setActiveCategory(categoryName)
  //   setCategories(
  //     categories.map((cat) => ({
  //       ...cat,
  //       active: cat.name === categoryName,
  //     })),
  //   )
  // }

  // Calcular paginación
  const totalPages = Math.ceil(filteredNoticies.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentNoticies = filteredNoticies.slice(startIndex, startIndex + itemsPerPage)

  // Formatear fecha
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("ca-ES", options)
  }

  // Formatear hora
  const formatTime = (dateString) => {
    const options = { hour: "2-digit", minute: "2-digit" }
    return new Date(dateString).toLocaleTimeString("ca-ES", options)
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

  // Compartir noticia
  const shareNoticia = (noticia, platform) => {
    const url = `${window.location.origin}/noticies/${noticia.id}`
    const text = `${noticia.titol} - Centre Veterinari Navarcles`

    let shareUrl = ""

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`
        break
      default:
        if (navigator.share) {
          navigator
            .share({
              title: noticia.titol,
              text: extractSummary(noticia.contingut, 100),
              url: url,
            })
            .catch((err) => console.error("Error compartint:", err))
          return
        }
        // Fallback: copiar al portapapeles
        navigator.clipboard
          .writeText(url)
          .then(() => alert("Enllaç copiat al portapapers!"))
          .catch((err) => console.error("Error copiant enllaç:", err))
        return
    }

    window.open(shareUrl, "_blank")
  }

  // Obtener categoría aleatoria para demo
  // Eliminar esta función
  // const getRandomCategory = () => {
  //   const cats = ["Consells", "Salut", "Nutrició", "Esdeveniments"]
  //   return cats[Math.floor(Math.random() * cats.length)]
  // }

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-amber-50 to-stone-100 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-64 bg-[url('/abstract-geometric-flow.png')] bg-cover opacity-10"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-300">Actualitat</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-stone-800 mb-6">Notícies i Novetats</h1>
          <p className="text-stone-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Mantén-te informat sobre les últimes novetats, consells i esdeveniments del Centre Veterinari Navarcles
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

      <main className="container mx-auto px-4 py-12 -mt-6">
        <div className="max-w-6xl mx-auto">
          {/* Filtros y búsqueda */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-10">
            <div className="flex justify-end">
              {/* Barra de búsqueda */}
              <div className="relative w-full md:w-64 lg:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600" size={18} />
                <Input
                  type="text"
                  placeholder="Cerca notícies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-2 border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-amber-600 hover:text-amber-800"
                    onClick={() => setSearchTerm("")}
                  >
                    ✕
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Estado de carga */}
          {carregant ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="overflow-hidden border-0 shadow-md">
                  <Skeleton className="h-52 w-full" />
                  <CardContent className="p-6">
                    <Skeleton className="h-4 w-1/4 mb-4" />
                    <Skeleton className="h-8 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <Alert variant="destructive" className="mb-8 border-red-300 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-800">Error</AlertTitle>
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          ) : filteredNoticies.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16 bg-white rounded-xl shadow-sm border border-amber-100"
            >
              {searchTerm ? (
                <>
                  <div className="w-20 h-20 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="h-10 w-10 text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-stone-800">No s'han trobat resultats</h3>
                  <p className="text-stone-600 mb-6 max-w-md mx-auto">
                    No hi ha notícies que coincideixin amb "{searchTerm}"
                  </p>
                  <Button onClick={() => setSearchTerm("")} className="bg-amber-600 hover:bg-amber-700 text-white">
                    Veure totes les notícies
                  </Button>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="h-10 w-10 text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-stone-800">Encara no hi ha notícies</h3>
                  <p className="text-stone-600 max-w-md mx-auto">
                    Aviat publicarem noves notícies i actualitzacions sobre el nostre centre i consells per a les teves
                    mascotes.
                  </p>
                </>
              )}
            </motion.div>
          ) : (
            <>
              {/* Resultados de búsqueda */}
              {searchTerm && (
                <div className="mb-6 p-4 bg-amber-50 border border-amber-100 rounded-lg text-amber-800">
                  <p>
                    {filteredNoticies.length === 0
                      ? "No s'han trobat resultats"
                      : `Mostrant ${filteredNoticies.length} ${
                          filteredNoticies.length === 1 ? "resultat" : "resultats"
                        } per "${searchTerm}"`}
                  </p>
                </div>
              )}

              {/* Grid de noticias */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {currentNoticies.map((noticia, index) => (
                  <motion.div
                    key={noticia.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full flex flex-col overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 group">
                      <div className="relative">
                        {/* Eliminar esta parte */}
                        {/* Categoría */}
                        {/* <Badge className="absolute top-4 left-4 z-10 bg-amber-100/90 backdrop-blur-sm text-amber-800 border-amber-300">
                          {noticia.categoria || getRandomCategory()}
                        </Badge> */}

                        {/* Imagen */}
                        <div className="h-52 overflow-hidden">
                          <img
                            src={noticia.imatge || "/placeholder.svg?height=300&width=500&query=veterinary news"}
                            alt={noticia.titol}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        {/* Bookmark button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-4 right-4 h-8 w-8 p-0 bg-white/80 hover:bg-white text-amber-600 hover:text-amber-800 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <Bookmark size={16} />
                        </Button>
                      </div>

                      <CardContent className="p-6 flex-grow">
                        <div className="flex items-center gap-2 text-sm text-stone-500 mb-3">
                          <Calendar size={14} className="text-amber-600" />
                          <span>{formatDate(noticia.data || new Date().toISOString())}</span>
                          <span className="mx-1">•</span>
                          <Clock size={14} className="text-amber-600" />
                          <span>{formatTime(noticia.data || new Date().toISOString())}</span>
                        </div>

                        <Link
                          href={`/noticies/${noticia.id || index}`}
                          className="block group-hover:text-amber-700 transition-colors"
                        >
                          <h2 className="text-xl font-bold text-stone-800 mb-3 line-clamp-2">
                            {noticia.titol || "Consells per a la cura de la teva mascota"}
                          </h2>
                        </Link>

                        <p className="text-stone-600 mb-4 line-clamp-3">
                          {extractSummary(
                            noticia.contingut ||
                              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                          )}
                        </p>
                      </CardContent>

                      <CardFooter className="px-6 py-4 border-t border-stone-100 flex justify-between items-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-300 gap-1 hover:gap-2 transition-all"
                          asChild
                        >
                          <Link href={`/noticies/${noticia.id || index}`}>
                            Llegir més
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>

                        <DropdownMenu
                          open={shareOpen === noticia.id}
                          onOpenChange={(open) => setShareOpen(open ? noticia.id : null)}
                        >
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-stone-500 hover:text-amber-600 hover:bg-amber-50"
                            >
                              <Share2 size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="border-amber-200">
                            <DropdownMenuItem
                              onClick={() => shareNoticia(noticia, "facebook")}
                              className="hover:bg-blue-50"
                            >
                              <Facebook size={16} className="mr-2 text-blue-600" /> Facebook
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => shareNoticia(noticia, "twitter")}
                              className="hover:bg-blue-50"
                            >
                              <Twitter size={16} className="mr-2 text-blue-400" /> Twitter
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => shareNoticia(noticia, "linkedin")}
                              className="hover:bg-blue-50"
                            >
                              <Linkedin size={16} className="mr-2 text-blue-700" /> LinkedIn
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => shareNoticia(noticia, "whatsapp")}
                              className="hover:bg-green-50"
                            >
                              <WhatsApp size={16} className="mr-2 text-green-500" /> WhatsApp
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12 mb-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="border-amber-200 text-amber-700 hover:bg-amber-50 hover:border-amber-300 disabled:opacity-50"
                  >
                    <ChevronLeft size={16} />
                  </Button>

                  {[...Array(totalPages)].map((_, index) => (
                    <Button
                      key={index}
                      variant={currentPage === index + 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(index + 1)}
                      className={`w-9 h-9 p-0 ${
                        currentPage === index + 1
                          ? "bg-amber-600 hover:bg-amber-700 text-white"
                          : "border-amber-200 text-amber-700 hover:bg-amber-50 hover:border-amber-300"
                      }`}
                    >
                      {index + 1}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="border-amber-200 text-amber-700 hover:bg-amber-50 hover:border-amber-300 disabled:opacity-50"
                  >
                    <ChevronRight size={16} />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-amber-700 to-stone-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/abstract-geometric-flow.png')] opacity-10 mix-blend-overlay"></div>
        <motion.div
          className="absolute -top-20 -left-20 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, 20, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 8 }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-60 h-60 bg-stone-600/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], x: [0, -30, 0], y: [0, -20, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 10, delay: 1 }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Subscriu-te al nostre butlletí</h2>
            <p className="text-xl text-amber-100 mb-8">
              Rep les últimes notícies, consells i promocions directament al teu correu electrònic.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="El teu correu electrònic"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-amber-300"
              />
              <Button
                size="lg"
                className="bg-white text-amber-800 hover:bg-amber-100 transition-all duration-300 shadow-lg hover:shadow-white/20 hover:scale-105"
              >
                Subscriu-te
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

