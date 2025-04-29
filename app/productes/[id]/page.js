"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Toaster, toast } from "react-hot-toast"
import Navbar from "../../../components/Navbar"
import { ArrowLeft, ShoppingCart, Package, AlertCircle, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

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
            toast.success("Afegit una altra unitat! ✅")
          } else {
            toast.error(`Només queden ${producte.stock} unitats disponibles ❌`)
            setAddingToCart(false)
            return
          }
        } else {
          carret.push({ ...producte, quantitat: 1 })
          toast.success("Producte afegit al carret! 🛒")
        }

        localStorage.setItem("carret", JSON.stringify(carret))
      } catch (err) {
        toast.error("Error afegint al carret")
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
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
      case "snacks":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100"
      case "higiene":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      case "accessoris":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  // Función para obtener el color de badge según el animal
  const getAnimalColor = (animal) => {
    switch (animal) {
      case "gos":
        return "bg-sky-100 text-sky-800 hover:bg-sky-100"
      case "gat":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  // Estado de carga
  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto py-20 flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
          <p className="text-gray-600 text-lg">Carregant producte...</p>
        </div>
      </div>
    )
  }

  // Estado de error
  if (error) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto py-10 px-4">
          <Alert variant="destructive" className="max-w-xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="flex justify-center mt-6">
            <Button variant="outline" onClick={() => router.back()}>
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />

      <div className="container mx-auto py-8 px-4">
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Tornar a productes
        </Button>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Imagen del producto */}
              <div className="relative h-[300px] md:h-full bg-gray-100">
                <img
		  src={`/${producte.imatge}` || "/placeholder.svg"}
		  alt={producte.nom}
		  className="w-full h-full object-cover"
		/>

                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
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
              <div className="p-6 md:p-8 flex flex-col">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{producte.nom}</h1>

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

                <p className="text-3xl font-bold text-gray-900 mb-2">{producte.preu} €</p>

                <Separator className="my-4" />

                <div className="mb-6 flex-grow">
                  <h2 className="text-sm font-medium text-gray-500 mb-2">Descripció</h2>
                  <p className="text-gray-700">{producte.descripcio}</p>
                </div>

                {producte.stock > 0 && (
                  <div className="flex items-center gap-2 mb-4">
                    <Package className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {producte.stock} {producte.stock === 1 ? "unitat disponible" : "unitats disponibles"}
                    </span>
                  </div>
                )}

                <Button
                  onClick={afegirAlCarret}
                  disabled={producte.stock === 0 || addingToCart}
                  className="w-full"
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
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}





