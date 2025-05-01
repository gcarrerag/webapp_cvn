"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "../../components/Navbar"
import {
  CheckCircle2,
  ShoppingBag,
  Truck,
  Store,
  Phone,
  User,
  FileText,
  ArrowRight,
  Loader2,
  PawPrint,
} from "lucide-react"
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
      <div className="min-h-screen bg-stone-50">
        <Navbar />
        <div className="container mx-auto py-20 flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 text-amber-600 animate-spin mb-4" />
          <p className="text-stone-600 text-lg">Processant la teva comanda...</p>
        </div>
      </div>
    )
  }

  if (!ultimaComanda) {
    return null
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-b from-amber-50 to-stone-100 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-64 bg-[url('/abstract-geometric-flow.png')] bg-cover opacity-10"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-300">Comanda completada</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-stone-800 mb-6">Gràcies per la teva comanda!</h1>
          <p className="text-stone-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Ens posarem en contacte amb tu molt aviat per confirmar l&apos;enviament o la recollida
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-amber-600 to-stone-700 py-8 px-4 flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="bg-white/20 backdrop-blur-sm rounded-full p-3"
              >
                <CheckCircle2 className="h-12 w-12 text-white" />
              </motion.div>
              <CardTitle className="text-2xl md:text-3xl text-white mt-4 mb-2">Comanda confirmada</CardTitle>
              <CardDescription className="text-amber-100 text-center max-w-md">
                La teva comanda ha estat registrada correctament. Rebràs un correu electrònic amb els detalls.
              </CardDescription>
            </div>

            <CardHeader className="bg-white border-b border-stone-100">
              <CardTitle className="text-xl text-stone-800">Resum de la comanda</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6 p-6">
              {/* Datos del cliente */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-stone-500 flex items-center gap-2">
                    <User className="h-4 w-4 text-amber-600" /> Dades personals
                  </h3>
                  <p className="text-sm text-stone-700">
                    <span className="font-medium">Nom:</span> {ultimaComanda.nom}
                  </p>
                  <p className="text-sm flex items-center gap-1 text-stone-700">
                    <Phone className="h-3 w-3 text-amber-500" />
                    <span className="font-medium">Telèfon:</span> {ultimaComanda.telefon}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-stone-500 flex items-center gap-2">
                    {ultimaComanda.enviament === "domicili" ? (
                      <>
                        <Truck className="h-4 w-4 text-amber-600" /> Enviament a domicili
                      </>
                    ) : (
                      <>
                        <Store className="h-4 w-4 text-amber-600" /> Recollida al local
                      </>
                    )}
                  </h3>
                  {ultimaComanda.enviament === "domicili" && (
                    <p className="text-sm text-stone-700">
                      <span className="font-medium">Adreça:</span> {ultimaComanda.adreca}
                    </p>
                  )}
                  {ultimaComanda.enviament === "recollida" && (
                    <p className="text-sm text-stone-700">
                      <span className="font-medium">Lloc de recollida:</span> Plaça Ansèlm Clavé núm 13, Navarcles,
                      08270
                    </p>
                  )}
                </div>
              </div>

              {ultimaComanda.observacions && (
                <div className="bg-amber-50 p-4 rounded-md border border-amber-100">
                  <h3 className="text-sm font-medium text-stone-700 flex items-center gap-2 mb-1">
                    <FileText className="h-4 w-4 text-amber-600" /> Observacions
                  </h3>
                  <p className="text-sm text-stone-600">{ultimaComanda.observacions}</p>
                </div>
              )}

              <Separator className="bg-stone-200" />

              {/* Productos */}
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-stone-800">
                  <ShoppingBag className="h-5 w-5 text-amber-600" /> Productes adquirits
                </h3>

                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-amber-200 scrollbar-track-stone-100">
                  {ultimaComanda.productes.map((prod, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-stone-100 pb-3">
                      <div className="flex items-center gap-3">
                        {prod.imatge && (
                          <div className="w-12 h-12 rounded-md overflow-hidden bg-stone-100 border border-stone-200">
                            <img
                              src={prod.imatge || "/placeholder.svg?height=100&width=100&query=pet product"}
                              alt={prod.nom}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-stone-800">{prod.nom}</p>
                          <p className="text-sm text-stone-500">
                            {prod.quantitat || 1} x {prod.preu} €
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold text-amber-700">
                        {((prod.quantitat || 1) * prod.preu).toFixed(2)} €
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mt-4">
                  <div className="bg-amber-50 px-5 py-3 rounded-md border border-amber-100">
                    <div className="flex justify-between items-center gap-8">
                      <span className="font-medium text-stone-800">Total:</span>
                      <span className="text-xl font-bold text-amber-700">{calcularTotal()} €</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>

            <Separator className="bg-stone-200" />

            <CardFooter className="flex flex-col md:flex-row justify-between items-center gap-4 py-6 bg-amber-50 border-t border-amber-100">
              <p className="text-stone-600 text-sm text-center md:text-left">
                Centre Veterinari Navarcles - Compromesos amb el benestar de la teva mascota.
              </p>
              <Button
                onClick={() => router.push("/productes")}
                className="bg-amber-600 hover:bg-amber-700 text-white transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Continuar comprant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-6 text-center">
            <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
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

