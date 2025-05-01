"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Toaster, toast } from "react-hot-toast"
import Navbar from "../../../components/Navbar"
import { ArrowLeft, ShoppingCart, Package, AlertCircle, Check, Loader2, PawPrint } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { motion } from "framer-motion"

export default function Producte() {
  const { id } = useParams()
  const router = useRouter()
  const [producte, setProducte] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [addingToCart, setAddingToCart] = useState(false)

  useEffect(() => {
    const carregarProducte = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/productes/${id}`)
        if (!res.ok) {
          throw new Error("Error carregant el producte")
        }
        const data = await res.json()
        setProducte(data)
      } catch (err) {
        console.error("Error carregant producte:", err)
        setError("No s'ha pogut carregar el producte.")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      carregarProducte()
    }
  }, [id])

  const afegirAlCarret = () => {
    if (!producte) return

    setAddingToCart(true)

    setTimeout(() => {
      try {
        const carret = JSON.parse(localStorage.getItem("carret")) || []
        const existeix = carret.find((p) => p.id === producte.id)

        if (existeix) {
          if (existeix.quantitat < producte.stock) {
            existeix.quantitat++
            toast.success("Afegit una altra unitat! ✅", {
              style: {
                background: "#65a30d",
                color: "#fff",
              },
              iconTheme: {
                primary: "#fff",
                secondary: "#65a30d",
              },
            })
          } else {
            toast.error(`Només queden ${producte.stock} unitats disponibles ❌`, {
              style: {
                background: "#b91c1c",
                color: "#fff",
              },
              iconTheme: {
                primary: "#fff",
                secondary: "#b91c1c",
              },
            })
            setAddingToCart(false)
            return
          }
        } else {
          carret.push({ ...producte, quantitat: 1 })
          toast.success("Producte afegit al carret! 🛒", {
            style: {
              background: "#65a30d",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#65a30d",
            },
          })
        }

        localStorage.setItem("carret", JSON.stringify(carret))
      } catch (err) {
        toast.error("Error afegint al carret", {
          style: {
            background: "#b91c1c",
            color: "#fff",
          },
        })
        console.error(err)
      } finally {
        setAddingToCart(false)
      }
    }, 600) // Pequeña demora para mostrar la animación
  }

  // Función para obtener el color de badge según la categoría
  const getCategoryColor = (categoria) => {
    switch (categoria) {
      case "alimentacio":
        return "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100"
      case "snacks":
        return "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100"
      case "higiene":
        return "bg-stone-100 text-stone-800 border-stone-200 hover:bg-stone-100"
      case "accessoris":
        return "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100"
      default:
        return "bg-stone-100 text-stone-800 border-stone-200 hover:bg-stone-100"
    }
  }

  // Función para obtener el color de badge según el animal
  const getAnimalColor = (animal) => {
    switch (animal) {
      case "gos":
        return "bg-stone-100 text-stone-800 border-stone-200 hover:bg-stone-100"
      case "gat":
        return "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100"
      default:
        return "bg-stone-100 text-stone-800 border-stone-200 hover:bg-stone-100"
    }
  }

  // Estado de carga
  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50">
        <Navbar />
        <div className="container mx-auto py-20 flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 text-amber-600 animate-spin mb-4" />
          <p className="text-stone-600 text-lg">Carregant producte...</p>
        </div>
      </div>
    )
  }

  // Estado de error
  if (error) {
    return (
      <div className="min-h-screen bg-stone-50">
        <Navbar />
        <div className="container mx-auto py-10 px-4">
          <Alert variant="destructive" className="max-w-xl mx-auto border-red-300 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">Error</AlertTitle>
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
          <div className="flex justify-center mt-6">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="border-amber-300 text-amber-700 hover:bg-amber-50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tornar enrere
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!producte) {
    return null // Evitar renderizado si no hay producto
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />

      <div className="container mx-auto py-8 px-4">
        <Button
          variant="ghost"
          className="mb-6 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Tornar a productes
        </Button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="overflow-hidden border-0 shadow-lg">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Imagen del producto */}
                <div className="relative h-[300px] md:h-full bg-stone-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-stone-500/10 z-0"></div>
                  <img
                    src={`/${producte.imatge}` || "/placeholder.svg"}
                    alt={producte.nom}
                    className="w-full h-full object-cover relative z-10"
                  />

                  <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-20">
                    {producte.animal && (
                      <Badge variant="secondary" className={getAnimalColor(producte.animal)}>
                        {producte.animal}
                      </Badge>
                    )}
                    {producte.categoria && (
                      <Badge variant="secondary" className={getCategoryColor(producte.categoria)}>
                        {producte.categoria}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Detalles del producto */}
                <div className="p-6 md:p-8 flex flex-col bg-white">
                  <h1 className="text-2xl md:text-3xl font-bold text-stone-800 mb-2">{producte.nom}</h1>

                  <div className="flex items-center gap-2 mb-4">
                    {producte.stock > 0 ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <Check className="mr-1 h-3 w-3" /> En stock
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        <AlertCircle className="mr-1 h-3 w-3" /> Sense stock
                      </Badge>
                    )}
                  </div>

                  <p className="text-3xl font-bold text-amber-700 mb-2">{producte.preu} €</p>

                  <Separator className="my-4 bg-stone-200" />

                  <div className="mb-6 flex-grow">
                    <h2 className="text-sm font-medium text-stone-500 mb-2">Descripció</h2>
                    <p className="text-stone-700 leading-relaxed">{producte.descripcio}</p>
                  </div>

                  {producte.stock > 0 && (
                    <div className="flex items-center gap-2 mb-6">
                      <Package className="h-4 w-4 text-stone-500" />
                      <span className="text-sm text-stone-600">
                        {producte.stock} {producte.stock === 1 ? "unitat disponible" : "unitats disponibles"}
                      </span>
                    </div>
                  )}

                  <Button
                    onClick={afegirAlCarret}
                    disabled={producte.stock === 0 || addingToCart}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                    size="lg"
                  >
                    {addingToCart ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Afegint...
                      </>
                    ) : producte.stock > 0 ? (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Afegir al carret
                      </>
                    ) : (
                      "Sense stock"
                    )}
                  </Button>

                  <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
                    <div className="flex items-start gap-3">
                      <PawPrint className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-stone-800 mb-1">
                          Producte seleccionat pels nostres veterinaris
                        </h3>
                        <p className="text-sm text-stone-600">
                          Tots els nostres productes són de qualitat i han estat seleccionats pels nostres professionals
                          per garantir el benestar de la teva mascota.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

