"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "../../../components/Navbar"
import { motion } from "framer-motion"
import {
  Calendar,
  Clock,
  Share2,
  ArrowLeft,
  AlertCircle,
  Facebook,
  Twitter,
  Linkedin,
  PhoneIcon as WhatsApp,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

export default function NoticiaDetall() {
  const params = useParams()
  const router = useRouter()
  const [noticia, setNoticia] = useState(null)
  const [noticiesRelacionades, setNoticiesRelacionades] = useState([])
  const [error, setError] = useState(null)
  const [carregant, setCarregant] = useState(true)

  useEffect(() => {
    const carregarNoticia = async () => {
      try {
        setCarregant(true)
        const res = await fetch(`/api/noticies/${params.id}`)
        if (!res.ok) {
          throw new Error("Error carregant la notícia")
        }
        const dades = await res.json()
        setNoticia(dades)

        // Cargar noticias relacionadas
        const resRelacionades = await fetch("/api/noticies?limit=3")
        if (resRelacionades.ok) {
          const dadesRelacionades = await resRelacionades.json()
          // Filtrar la noticia actual y limitar a 3
          setNoticiesRelacionades(dadesRelacionades.filter((n) => n.id !== Number.parseInt(params.id)).slice(0, 3))
        }
      } catch (err) {
        console.error("Error:", err)
        setError("No s'ha pogut carregar la notícia.")
      } finally {
        setCarregant(false)
      }
    }

    if (params.id) {
      carregarNoticia()
    }
  }, [params.id])

  // Formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return ""
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("ca-ES", options)
  }

  // Formatear hora
  const formatTime = (dateString) => {
    if (!dateString) return ""
    const options = { hour: "2-digit", minute: "2-digit" }
    return new Date(dateString).toLocaleTimeString("ca-ES", options)
  }

  // Compartir noticia
  const shareNoticia = (platform) => {
    if (!noticia) return

    const url = window.location.href
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
              text: noticia.contingut.substring(0, 100).replace(/<[^>]*>/g, "") + "...",
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
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" size="sm" className="mb-6" onClick={() => router.push("/noticies")}>
            <ArrowLeft size={16} className="mr-2" /> Tornar a notícies
          </Button>

          {carregant ? (
            <div className="space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-[300px] w-full" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ) : error ? (
            <Alert variant="destructive" className="mb-8">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : noticia ? (
            <>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Badge className="mb-4">Notícia</Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{noticia.titol}</h1>

                <div className="flex items-center gap-3 text-gray-500 mb-8">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{formatDate(noticia.data)}</span>
                  </div>
                  <span className="text-gray-300">|</span>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{formatTime(noticia.data)}</span>
                  </div>
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Share2 size={16} /> Compartir
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => shareNoticia("facebook")}>
                          <Facebook size={16} className="mr-2 text-blue-600" /> Facebook
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => shareNoticia("twitter")}>
                          <Twitter size={16} className="mr-2 text-blue-400" /> Twitter
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => shareNoticia("linkedin")}>
                          <Linkedin size={16} className="mr-2 text-blue-700" /> LinkedIn
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => shareNoticia("whatsapp")}>
                          <WhatsApp size={16} className="mr-2 text-green-500" /> WhatsApp
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {noticia.imatge && (
                  <div className="mb-8 rounded-lg overflow-hidden shadow-md">
                    <img
                      src={noticia.imatge || "/placeholder.svg"}
                      alt={noticia.titol}
                      className="w-full h-auto max-h-[500px] object-cover"
                    />
                  </div>
                )}

                <div
                  className="prose prose-blue max-w-none mb-12"
                  dangerouslySetInnerHTML={{ __html: noticia.contingut }}
                />

                <div className="flex justify-between items-center">
                  <Button variant="outline" size="sm" onClick={() => router.push("/noticies")}>
                    <ArrowLeft size={16} className="mr-2" /> Tornar a notícies
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Share2 size={16} /> Compartir
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => shareNoticia("facebook")}>
                        <Facebook size={16} className="mr-2 text-blue-600" /> Facebook
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => shareNoticia("twitter")}>
                        <Twitter size={16} className="mr-2 text-blue-400" /> Twitter
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => shareNoticia("linkedin")}>
                        <Linkedin size={16} className="mr-2 text-blue-700" /> LinkedIn
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => shareNoticia("whatsapp")}>
                        <WhatsApp size={16} className="mr-2 text-green-500" /> WhatsApp
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.div>

              {/* Noticias relacionadas */}
              {noticiesRelacionades.length > 0 && (
                <div className="mt-16">
                  <Separator className="mb-8" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Notícies relacionades</h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {noticiesRelacionades.map((noticiaRel, index) => (
                      <motion.div
                        key={noticiaRel.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Link href={`/noticies/${noticiaRel.id}`}>
                          <Card className="h-full hover:shadow-md transition-shadow overflow-hidden group">
                            {noticiaRel.imatge ? (
                              <div className="h-40 overflow-hidden">
                                <img
                                  src={noticiaRel.imatge || "/placeholder.svg"}
                                  alt={noticiaRel.titol}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                              </div>
                            ) : (
                              <div className="h-40 bg-blue-100 flex items-center justify-center">
                                <span className="text-blue-500 text-3xl">📰</span>
                              </div>
                            )}

                            <CardContent className="p-4">
                              <p className="text-sm text-gray-500 mb-2">{formatDate(noticiaRel.data)}</p>
                              <h3 className="font-bold text-gray-800 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                {noticiaRel.titol}
                              </h3>
                              <div className="flex items-center text-blue-600 text-sm font-medium mt-2">
                                Llegir més <ChevronRight size={14} className="ml-1" />
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">Notícia no trobada</h3>
              <p className="text-gray-600 mb-4">La notícia que busques no existeix o ha estat eliminada.</p>
              <Button onClick={() => router.push("/noticies")}>
                <ArrowLeft size={16} className="mr-2" /> Tornar a notícies
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

