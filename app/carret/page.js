"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Toaster, toast } from "react-hot-toast"
import Navbar from "../../components/Navbar"
import { ShoppingCart, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft, Loader2 } from "lucide-react"
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
      toast.error(`Producte "${producteEliminat.nom}" eliminat 🗑️`)
      setProcessingItem(null)
    }, 300)
  }

  const buidarCarret = () => {
    actualitzarCarret([])
    toast.error("S'ha buidat el carret 🗑️")
  }

  const canviarQuantitat = (index, delta) => {
    setProcessingItem(`${index}-${delta > 0 ? "add" : "remove"}`)

    setTimeout(() => {
      const nouCarret = [...carret]
      const producte = nouCarret[index]
      const stockDisponible = producte.stock || 0
      const novaQuantitat = (producte.quantitat || 1) + delta

      if (novaQuantitat > stockDisponible) {
        toast.error(`Només hi ha ${stockDisponible} unitats disponibles de "${producte.nom}".`)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto py-20 flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
          <p className="text-gray-600 text-lg">Carregant el carret...</p>
        </div>
      </div>
    )
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
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center md:justify-start gap-3 mb-2">
            <ShoppingCart className="h-8 w-8" />
            El teu carret
          </h1>
          <p className="text-gray-600 text-center md:text-left">
            {carret.length > 0
              ? `Tens ${carret.length} ${carret.length === 1 ? "producte" : "productes"} al carret (${totalProductes} ${totalProductes === 1 ? "unitat" : "unitats"} en total)`
              : "El teu carret està buit"}
          </p>
        </header>

        {carret.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-10 text-center max-w-md mx-auto">
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">El carret està buit</h3>
            <p className="text-gray-600 mb-6">Afegeix productes al carret per continuar amb la compra.</p>
            <Button onClick={() => router.push("/productes")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continuar comprant
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de productos */}
            <div className="lg:col-span-2 space-y-4">
              {carret.map((producte, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="w-full sm:w-1/3 h-40 sm:h-auto">
                        <img
                          src={producte.imatge || "/placeholder.svg"}
                          alt={producte.nom}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-4 flex flex-col">
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-lg">{producte.nom}</h3>
                            <p className="font-bold text-lg">{producte.preu} €</p>
                          </div>

                          {producte.categoria && (
                            <Badge variant="outline" className="mt-1">
                              {producte.categoria}
                            </Badge>
                          )}

                          <p className="text-sm text-gray-500 mt-2 line-clamp-2">{producte.descripcio}</p>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => canviarQuantitat(index, -1)}
                              disabled={processingItem === `${index}-remove`}
                            >
                              {processingItem === `${index}-remove` ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Minus className="h-4 w-4" />
                              )}
                            </Button>
                            <span className="w-8 text-center font-medium">{producte.quantitat || 1}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => canviarQuantitat(index, 1)}
                              disabled={processingItem === `${index}-add`}
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
              ))}

              <div className="flex justify-between items-center mt-6">
                <Button variant="outline" onClick={() => router.push("/productes")}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continuar comprant
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Buidar carret
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Estàs segur?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Aquesta acció eliminarà tots els productes del teu carret. Aquesta acció no es pot desfer.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel·lar</AlertDialogCancel>
                      <AlertDialogAction onClick={buidarCarret} className="bg-red-500 hover:bg-red-600">
                        Buidar carret
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            {/* Resumen del pedido */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Resum de la comanda</h3>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>{calcularSubtotal()} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Enviament</span>
                      <span>Gratis</span>
                    </div>

                    <Separator className="my-3" />

                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{calcularTotal()} €</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 p-6 flex flex-col gap-4">
                  <Button className="w-full" size="lg" asChild>
                    <a href="/comanda">
                      Finalitzar comanda
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    Els impostos s'aplicaran durant el procés de pagament
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}





