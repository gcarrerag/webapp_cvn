"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Toaster, toast } from "react-hot-toast"
import Navbar from "../../components/Navbar"
import { ShoppingCart, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft, Loader2, PawPrint } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { motion } from "framer-motion"

export default function Carret() {
  const router = useRouter()
  const [carret, setCarret] = useState([])
  const [loading, setLoading] = useState(true)
  const [processingItem, setProcessingItem] = useState(null)

  useEffect(() => {
    try {
      setLoading(true)
      const dades = JSON.parse(localStorage.getItem("carret")) || []
      setCarret(Array.isArray(dades) ? dades : [])
    } catch (err) {
      console.error("Error llegint carret:", err)
      setCarret([])
    } finally {
      setLoading(false)
    }
  }, [])

  const actualitzarCarret = (nouCarret) => {
    setCarret(nouCarret)
    localStorage.setItem("carret", JSON.stringify(nouCarret))
  }

  const eliminarProducte = (index) => {
    setProcessingItem(index)
    setTimeout(() => {
      const nouCarret = [...carret]
      const producteEliminat = nouCarret.splice(index, 1)[0]
      actualitzarCarret(nouCarret)
      toast.error(`Producte "${producteEliminat.nom}" eliminat 🗑️`, {
        style: {
          background: "#b91c1c",
          color: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#b91c1c",
        },
      })
      setProcessingItem(null)
    }, 300)
  }

  const buidarCarret = () => {
    actualitzarCarret([])
    toast.error("S'ha buidat el carret 🗑️", {
      style: {
        background: "#b91c1c",
        color: "#fff",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#b91c1c",
      },
    })
  }

  const canviarQuantitat = (index, delta) => {
    setProcessingItem(`${index}-${delta > 0 ? "add" : "remove"}`)

    setTimeout(() => {
      const nouCarret = [...carret]
      const producte = nouCarret[index]
      const stockDisponible = producte.stock || 0
      const novaQuantitat = (producte.quantitat || 1) + delta

      if (novaQuantitat > stockDisponible) {
        toast.error(`Només hi ha ${stockDisponible} unitats disponibles de "${producte.nom}".`, {
          style: {
            background: "#b91c1c",
            color: "#fff",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#b91c1c",
          },
        })
        setProcessingItem(null)
        return
      }

      if (novaQuantitat <= 0) {
        eliminarProducte(index)
      } else {
        producte.quantitat = novaQuantitat
        actualitzarCarret(nouCarret)
        toast.success(
          delta > 0
            ? `Has afegit una unitat més de "${producte.nom}" ✅`
            : `Has reduït una unitat de "${producte.nom}" ➖`,
          {
            style: {
              background: "#65a30d",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#65a30d",
            },
          },
        )
      }
      setProcessingItem(null)
    }, 300)
  }

  const calcularSubtotal = () => {
    return carret
      .reduce((total, prod) => {
        const quantitat = prod.quantitat || 1
        return total + quantitat * Number.parseFloat(prod.preu)
      }, 0)
      .toFixed(2)
  }

  const calcularTotal = () => {
    const subtotal = Number.parseFloat(calcularSubtotal())
    // Aquí podrías añadir lógica para gastos de envío, descuentos, etc.
    return subtotal.toFixed(2)
  }

  const totalProductes = carret.reduce((total, prod) => total + (prod.quantitat || 1), 0)

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

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50">
        <Navbar />
        <div className="container mx-auto py-20 flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 text-amber-600 animate-spin mb-4" />
          <p className="text-stone-600 text-lg">Carregant el carret...</p>
        </div>
      </div>
    )
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

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-b from-amber-50 to-stone-100 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-64 bg-[url('/abstract-geometric-flow.png')] bg-cover opacity-10"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-300">Compra</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-stone-800 mb-6 flex items-center justify-center gap-3">
            <ShoppingCart className="h-10 w-10 text-amber-600" />
            El teu carret
          </h1>
          <p className="text-stone-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {carret.length > 0
              ? `Tens ${carret.length} ${carret.length === 1 ? "producte" : "productes"} al carret (${totalProductes} ${
                  totalProductes === 1 ? "unitat" : "unitats"
                } en total)`
              : "El teu carret està buit"}
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

      <div className="container mx-auto py-12 px-4 -mt-6">
        {carret.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg border-0 p-10 text-center max-w-md mx-auto"
          >
            <div className="w-20 h-20 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="h-10 w-10 text-amber-600" />
            </div>
            <h3 className="text-xl font-medium text-stone-800 mb-2">El carret està buit</h3>
            <p className="text-stone-600 mb-6">Afegeix productes al carret per continuar amb la compra.</p>
            <Button onClick={() => router.push("/productes")} className="bg-amber-600 hover:bg-amber-700 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continuar comprant
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de productos */}
            <div className="lg:col-span-2 space-y-4">
              {carret.map((producte, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-1/3 h-40 sm:h-auto bg-stone-100 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-stone-500/10 z-0"></div>
                          <img
                            src={producte.imatge || "/placeholder.svg?height=300&width=300&query=pet product"}
                            alt={producte.nom}
                            className="w-full h-full object-cover relative z-10"
                          />
                        </div>
                        <div className="flex-1 p-6 flex flex-col">
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-semibold text-lg text-stone-800">{producte.nom}</h3>
                              <p className="font-bold text-lg text-amber-700">{producte.preu} €</p>
                            </div>

                            {producte.categoria && (
                              <Badge variant="secondary" className={getCategoryColor(producte.categoria)}>
                                {producte.categoria}
                              </Badge>
                            )}

                            <p className="text-sm text-stone-600 mt-2 line-clamp-2">{producte.descripcio}</p>
                          </div>

                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => canviarQuantitat(index, -1)}
                                disabled={processingItem === `${index}-remove`}
                                className="border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
                              >
                                {processingItem === `${index}-remove` ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Minus className="h-4 w-4" />
                                )}
                              </Button>
                              <span className="w-8 text-center font-medium text-stone-800">
                                {producte.quantitat || 1}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => canviarQuantitat(index, 1)}
                                disabled={processingItem === `${index}-add`}
                                className="border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
                              >
                                {processingItem === `${index}-add` ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Plus className="h-4 w-4" />
                                )}
                              </Button>
                            </div>

                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => eliminarProducte(index)}
                              disabled={processingItem === index}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              {processingItem === index ? (
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              ) : (
                                <Trash2 className="h-4 w-4 mr-2" />
                              )}
                              Eliminar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="outline"
                  onClick={() => router.push("/productes")}
                  className="border-amber-300 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continuar comprant
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Buidar carret
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="border-amber-200">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-stone-800">Estàs segur?</AlertDialogTitle>
                      <AlertDialogDescription className="text-stone-600">
                        Aquesta acció eliminarà tots els productes del teu carret. Aquesta acció no es pot desfer.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="border-amber-200 text-stone-700 hover:bg-stone-100">
                        Cancel·lar
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={buidarCarret} className="bg-red-600 hover:bg-red-700 text-white">
                        Buidar carret
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            {/* Resumen del pedido */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="border-0 shadow-lg overflow-hidden">
                  <CardContent className="p-6 bg-white">
                    <h3 className="text-xl font-semibold mb-4 text-stone-800">Resum de la comanda</h3>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-stone-600">Subtotal</span>
                        <span className="text-stone-800">{calcularSubtotal()} €</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-600">Enviament</span>
                        <span className="text-green-600 font-medium">Gratis</span>
                      </div>

                      <Separator className="my-3 bg-stone-200" />

                      <div className="flex justify-between font-bold text-lg">
                        <span className="text-stone-800">Total</span>
                        <span className="text-amber-700">{calcularTotal()} €</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-amber-50 p-6 flex flex-col gap-4 border-t border-amber-100">
                    <Button
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white transition-all duration-300 shadow-md hover:shadow-lg"
                      size="lg"
                      asChild
                    >
                      <a href="/comanda">
                        Finalitzar comanda
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <p className="text-xs text-stone-500 text-center">
                      Els impostos s'aplicaran durant el procés de pagament
                    </p>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

