"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "../../components/Navbar"
import { CheckCircle2, ShoppingBag, Truck, Store, Phone, User, FileText, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

export default function Gracies() {
  const router = useRouter()
  const [ultimaComanda, setUltimaComanda] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const carregarComanda = async () => {
      try {
        setLoading(true)
        const comandaGuardada = JSON.parse(localStorage.getItem("ultimaComanda"))

        if (!comandaGuardada) {
          router.push("/")
          return
        }

        setUltimaComanda(comandaGuardada)
        localStorage.removeItem("carret")

        // Només enviar la comanda a Telegram si era pagament amb targeta
        if (comandaGuardada.metodePagament === "stripe") {
          await enviarComandaATelegram(comandaGuardada)
        }

        localStorage.removeItem("ultimaComanda")
      } catch (error) {
        console.error("Error carregant comanda:", error)
        router.push("/")
      } finally {
        setLoading(false)
      }
    }

    carregarComanda()
  }, [router])

  const enviarComandaATelegram = async (comanda) => {
    try {
      await fetch("/api/comanda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...comanda,
          productes: comanda.productes.map((p) => ({
            id: p.id,
            nom: p.nom,
            preu: p.preu,
            quantitat: p.quantitat,
          })),
        }),
      })
    } catch (error) {
      console.error("Error enviant comanda a Telegram:", error)
    }
  }

  const calcularTotal = () => {
    if (!ultimaComanda?.productes) return "0.00"

    return ultimaComanda.productes.reduce((acc, p) => acc + p.preu * (p.quantitat || 1), 0).toFixed(2)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto py-20 flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
          <p className="text-gray-600 text-lg">Processant la teva comanda...</p>
        </div>
      </div>
    )
  }

  if (!ultimaComanda) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="border-green-200 shadow-md overflow-hidden">
            <div className="bg-green-50 py-8 px-4 flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <CheckCircle2 className="h-16 w-16 text-green-600 mb-4" />
              </motion.div>
              <CardTitle className="text-2xl md:text-3xl text-green-800 mb-2">Gràcies per la teva comanda!</CardTitle>
              <CardDescription className="text-green-700 text-center max-w-md">
                Ens posarem en contacte amb tu molt aviat per confirmar l&apos;enviament o la recollida.
              </CardDescription>
            </div>

            <CardHeader>
              <CardTitle className="text-xl">Resum de la comanda</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Datos del cliente */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500 flex items-center gap-2">
                    <User className="h-4 w-4" /> Dades personals
                  </h3>
                  <p className="text-sm">
                    <span className="font-medium">Nom:</span> {ultimaComanda.nom}
                  </p>
                  <p className="text-sm flex items-center gap-1">
                    <Phone className="h-3 w-3 text-gray-400" />
                    <span className="font-medium">Telèfon:</span> {ultimaComanda.telefon}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500 flex items-center gap-2">
                    {ultimaComanda.enviament === "domicili" ? (
                      <>
                        <Truck className="h-4 w-4" /> Enviament a domicili
                      </>
                    ) : (
                      <>
                        <Store className="h-4 w-4" /> Recollida al local
                      </>
                    )}
                  </h3>
                  {ultimaComanda.enviament === "domicili" && (
                    <p className="text-sm">
                      <span className="font-medium">Adreça:</span> {ultimaComanda.adreca}
                    </p>
                  )}
                  {ultimaComanda.enviament === "recollida" && (
                    <p className="text-sm">
                      <span className="font-medium">Lloc de recollida:</span> Carrer Principal, 123, Barcelona
                    </p>
                  )}
                </div>
              </div>

              {ultimaComanda.observacions && (
                <div className="bg-gray-50 p-3 rounded-md">
                  <h3 className="text-sm font-medium text-gray-500 flex items-center gap-2 mb-1">
                    <FileText className="h-4 w-4" /> Observacions
                  </h3>
                  <p className="text-sm">{ultimaComanda.observacions}</p>
                </div>
              )}

              <Separator />

              {/* Productos */}
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" /> Productes adquirits
                </h3>

                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {ultimaComanda.productes.map((prod, i) => (
                    <div key={i} className="flex justify-between items-center border-b pb-3">
                      <div className="flex items-center gap-3">
                        {prod.imatge && (
                          <div className="w-12 h-12 rounded overflow-hidden bg-gray-100">
                            <img
                              src={prod.imatge || "/placeholder.svg"}
                              alt={prod.nom}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{prod.nom}</p>
                          <p className="text-sm text-gray-500">
                            {prod.quantitat || 1} x {prod.preu} €
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold">{((prod.quantitat || 1) * prod.preu).toFixed(2)} €</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mt-4">
                  <div className="bg-gray-50 px-4 py-2 rounded-md">
                    <div className="flex justify-between items-center gap-8">
                      <span className="font-medium">Total:</span>
                      <span className="text-xl font-bold text-green-700">{calcularTotal()} €</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>

            <Separator />

            <CardFooter className="flex flex-col md:flex-row justify-between items-center gap-4 py-6">
              <p className="text-gray-500 text-sm text-center md:text-left">
                Centre Veterinari Navarcles - Compromesos amb el benestar de la teva mascota.
              </p>
              <Button onClick={() => router.push("/productes")}>
                Continuar comprant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-6 text-center">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Comanda #
              {Math.floor(Math.random() * 10000)
                .toString()
                .padStart(4, "0")}
            </Badge>
          </div>
        </motion.div>
      </div>
    </div>
  )
}





