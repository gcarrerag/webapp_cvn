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

  // Filtrar noticias cuando cambia el término de búsqueda
  useEffect(() => {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">Actualitat</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Notícies i Novetats</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Mantén-te informat sobre les últimes novetats, consells i esdeveniments del Centre Veterinari Navarcles
            </p>
          </motion.div>

          {/* Barra de búsqueda */}
          <div className="mb-8 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Cerca notícies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-6 bg-white"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => setSearchTerm("")}
                >
                  ✕
                </Button>
              )}
            </div>
          </div>

          {/* Estado de carga */}
          {carregant ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-6">
                    <Skeleton className="h-8 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-1/4 mb-6" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <Alert variant="destructive" className="mb-8">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : filteredNoticies.length === 0 ? (
            <div className="text-center py-12">
              {searchTerm ? (
                <>
                  <h3 className="text-xl font-semibold mb-2">No s'han trobat resultats</h3>
                  <p className="text-gray-600 mb-4">No hi ha notícies que coincideixin amb "{searchTerm}"</p>
                  <Button onClick={() => setSearchTerm("")}>Veure totes les notícies</Button>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-2">Encara no hi ha notícies</h3>
                  <p className="text-gray-600">Aviat publicarem noves notícies i actualitzacions.</p>
                </>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {currentNoticies.map((noticia, index) => (
                  <motion.div
                    key={noticia.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      {noticia.imatge ? (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={noticia.imatge || "/placeholder.svg"}
                            alt={noticia.titol}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="h-48 bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-500 text-4xl">📰</span>
                        </div>
                      )}

                      <CardContent className="p-6 flex-grow">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                          <Calendar size={14} />
                          <span>{formatDate(noticia.data)}</span>
                          <span className="mx-1">•</span>
                          <Clock size={14} />
                          <span>{formatTime(noticia.data)}</span>
                        </div>

                        <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                          {noticia.titol}
                        </h2>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{extractSummary(noticia.contingut)}</p>
                      </CardContent>

                      <CardFooter className="px-6 py-4 border-t border-gray-100 flex justify-between items-center">
                        <Link href={`/noticies/${noticia.id}`} passHref legacyBehavior>
			  <Button variant="outline" size="sm" as="a">
			    Llegir més
			  </Button>
			</Link>


                        <DropdownMenu
                          open={shareOpen === noticia.id}
                          onOpenChange={(open) => setShareOpen(open ? noticia.id : null)}
                        >
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Share2 size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => shareNoticia(noticia, "facebook")}>
                              <Facebook size={16} className="mr-2 text-blue-600" /> Facebook
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => shareNoticia(noticia, "twitter")}>
                              <Twitter size={16} className="mr-2 text-blue-400" /> Twitter
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => shareNoticia(noticia, "linkedin")}>
                              <Linkedin size={16} className="mr-2 text-blue-700" /> LinkedIn
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => shareNoticia(noticia, "whatsapp")}>
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
                <div className="flex justify-center items-center gap-2 mt-10">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft size={16} />
                  </Button>

                  {[...Array(totalPages)].map((_, index) => (
                    <Button
                      key={index}
                      variant={currentPage === index + 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(index + 1)}
                      className="w-8 h-8 p-0"
                    >
                      {index + 1}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight size={16} />
                  </Button>
                </div>
              )}

              {/* Resultados de búsqueda */}
              {searchTerm && (
                <div className="text-center mt-6 text-sm text-gray-500">
                  Mostrant {filteredNoticies.length} {filteredNoticies.length === 1 ? "resultat" : "resultats"} per "
                  {searchTerm}"
                  <Button variant="link" size="sm" onClick={() => setSearchTerm("")}>
                    Veure totes les notícies
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}




