"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "../../components/Navbar"
import { Toaster, toast } from "react-hot-toast"
import {
  CreditCard,
  Home,
  Store,
  Truck,
  ShoppingBag,
  ClipboardCheck,
  Loader2,
  AlertCircle,
  PawPrint,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

export default function Comanda() {
  const [carret, setCarret] = useState([])
  const [carregant, setCarregant] = useState(false)
  const [formulari, setFormulari] = useState({
    nom: "",
    telefon: "",
    adreca: "",
    observacions: "",
    enviament: "domicili",
    metodePagament: "stripe",
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    try {
      setLoading(true)
      const dades = JSON.parse(localStorage.getItem("carret")) || []
      setCarret(dades)
    } catch (error) {
      console.error("Error llegint carret:", error)
      setCarret([])
    } finally {
      setLoading(false)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormulari({ ...formulari, [name]: value })

    // Limpiar errores al cambiar el valor
    if (errors[name]) {
      setErrors({ ...errors, [name]: null })
    }
  }

  const handleRadioChange = (value) => {
    setFormulari({ ...formulari, enviament: value })
  }

  const handleSelectChange = (value) => {
    setFormulari({ ...formulari, metodePagament: value })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formulari.nom.trim()) {
      newErrors.nom = "El nom és obligatori"
    }

    if (!/^\d{9}$/.test(formulari.telefon)) {
      newErrors.telefon = "Introdueix un telèfon vàlid (9 dígits)"
    }

    if (formulari.enviament === "domicili" && !formulari.adreca.trim()) {
      newErrors.adreca = "Has d'introduir una adreça per a l'enviament a domicili"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const enviarComanda = async (e) => {
    e.preventDefault()

    // Si ja està carregant, sortir
    if (carregant) return

    if (carret.length === 0) {
      toast.error("El carret està buit!", {
        style: {
          background: "#b91c1c",
          color: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#b91c1c",
        },
      })
      return
    }

    if (!validateForm()) {
      toast.error("Si us plau, revisa els camps del formulari", {
        style: {
          background: "#b91c1c",
          color: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#b91c1c",
        },
      })
      return
    }

    setCarregant(true)

    try {
      localStorage.setItem(
        "ultimaComanda",
        JSON.stringify({
          ...formulari,
          productes: carret,
        }),
      )

      if (formulari.metodePagament === "stripe") {
        const respostaStripe = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formulari,
            productes: carret,
          }),
        })

        if (respostaStripe.ok) {
          const { url } = await respostaStripe.json()
          window.location.href = url
        } else {
          toast.error("Error en iniciar el pagament", {
            style: {
              background: "#b91c1c",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#b91c1c",
            },
          })
          setCarregant(false)
        }
      } else {
        await fetch("/api/comanda", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formulari,
            productes: carret.map((p) => ({
              id: p.id,
              nom: p.nom,
              preu: p.preu,
              quantitat: p.quantitat,
            })),
          }),
        })

        localStorage.removeItem("carret")
        router.push("/gracies")
      }
    } catch (error) {
      console.error("Error en enviar la comanda:", error)
      toast.error("Error inesperat", {
        style: {
          background: "#b91c1c",
          color: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#b91c1c",
        },
      })
      setCarregant(false)
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50">
        <Navbar />
        <div className="container mx-auto py-20 flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 text-amber-600 animate-spin mb-4" />
          <p className="text-stone-600 text-lg">Carregant...</p>
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
          <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-300">Finalitzar compra</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-stone-800 mb-6 flex items-center justify-center gap-3">
            <ClipboardCheck className="h-10 w-10 text-amber-600" />
            Finalitzar comanda
          </h1>
          <p className="text-stone-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Completa les teves dades per finalitzar la compra
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
            <p className="text-stone-600 mb-6">Afegeix productes al carret per realitzar una comanda.</p>
            <Button onClick={() => router.push("/productes")} className="bg-amber-600 hover:bg-amber-700 text-white">
              Veure productes
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulario */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <form onSubmit={enviarComanda}>
                  <Card className="border-0 shadow-lg overflow-hidden">
                    <CardHeader className="bg-white border-b border-stone-100">
                      <CardTitle className="text-stone-800">Dades personals</CardTitle>
                      <CardDescription className="text-stone-600">
                        Introdueix les teves dades de contacte
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
                      <div className="space-y-2">
                        <Label htmlFor="nom" className="text-stone-700">
                          Nom i cognoms
                        </Label>
                        <Input
                          id="nom"
                          name="nom"
                          placeholder="Nom i cognoms"
                          value={formulari.nom}
                          onChange={handleChange}
                          className="border-stone-200 focus:border-amber-300 focus:ring-amber-300"
                        />
                        {errors.nom && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> {errors.nom}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="telefon" className="text-stone-700">
                          Telèfon
                        </Label>
                        <Input
                          id="telefon"
                          name="telefon"
                          type="tel"
                          placeholder="Telèfon (9 dígits)"
                          value={formulari.telefon}
                          onChange={handleChange}
                          className="border-stone-200 focus:border-amber-300 focus:ring-amber-300"
                        />
                        {errors.telefon && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> {errors.telefon}
                          </p>
                        )}
                      </div>
                    </CardContent>

                    <Separator className="bg-stone-200" />

                    <CardHeader className="bg-white border-b border-stone-100">
                      <CardTitle className="text-stone-800">Mètode d'enviament</CardTitle>
                      <CardDescription className="text-stone-600">
                        Selecciona com vols rebre la teva comanda
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
                      <RadioGroup
                        value={formulari.enviament}
                        onValueChange={handleRadioChange}
                        className="flex flex-col space-y-3"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="domicili" id="domicili" className="text-amber-600 border-stone-300" />
                          <Label htmlFor="domicili" className="flex items-center gap-2 cursor-pointer text-stone-700">
                            <Truck className="h-4 w-4 text-amber-600" /> Enviament a domicili
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="recollida"
                            id="recollida"
                            className="text-amber-600 border-stone-300"
                          />
                          <Label htmlFor="recollida" className="flex items-center gap-2 cursor-pointer text-stone-700">
                            <Store className="h-4 w-4 text-amber-600" /> Recollida al local
                          </Label>
                        </div>
                      </RadioGroup>

                      {formulari.enviament === "domicili" && (
                        <div className="space-y-2 pt-2">
                          <Label htmlFor="adreca" className="text-stone-700">
                            Adreça d'enviament
                          </Label>
                          <Input
                            id="adreca"
                            name="adreca"
                            placeholder="Adreça completa"
                            value={formulari.adreca}
                            onChange={handleChange}
                            className="border-stone-200 focus:border-amber-300 focus:ring-amber-300"
                          />
                          {errors.adreca && (
                            <p className="text-sm text-red-500 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" /> {errors.adreca}
                            </p>
                          )}
                        </div>
                      )}

                      {formulari.enviament === "recollida" && (
                        <Alert variant="outline" className="bg-amber-50 border-amber-200">
                          <Home className="h-4 w-4 text-amber-600" />
                          <AlertDescription className="text-amber-800">
                            Podràs recollir la teva comanda a la nostra botiga: Plaça Ansèlm Clavé núm 13, Navarcles,
                            08270
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>

                    <Separator className="bg-stone-200" />

                    {/* Método de pago */}
                    <CardHeader className="bg-white border-b border-stone-100">
                      <CardTitle className="text-stone-800">Mètode de pagament</CardTitle>
                      <CardDescription className="text-stone-600">
                        Selecciona com vols pagar la teva comanda
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
                      {formulari.enviament === "recollida" ? (
                        <Select value={formulari.metodePagament} onValueChange={handleSelectChange}>
                          <SelectTrigger className="border-stone-200 focus:ring-amber-300">
                            <SelectValue placeholder="Selecciona mètode de pagament" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="stripe">
                              <div className="flex items-center gap-2">
                                <CreditCard className="h-4 w-4 text-amber-600" /> Pagar ara amb targeta
                              </div>
                            </SelectItem>
                            <SelectItem value="local">
                              <div className="flex items-center gap-2">
                                <Store className="h-4 w-4 text-amber-600" /> Pagar al local
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="flex items-center gap-2 p-3 border border-amber-200 rounded-md bg-amber-50">
                          <CreditCard className="h-4 w-4 text-amber-600" />
                          <span className="text-stone-800">Pagament amb targeta (Stripe)</span>
                        </div>
                      )}

                      <div className="space-y-2 pt-2">
                        <Label htmlFor="observacions" className="text-stone-700">
                          Observacions (opcional)
                        </Label>
                        <Textarea
                          id="observacions"
                          name="observacions"
                          placeholder="Instruccions especials per a la comanda"
                          value={formulari.observacions}
                          onChange={handleChange}
                          rows={3}
                          className="border-stone-200 focus:border-amber-300 focus:ring-amber-300"
                        />
                      </div>
                    </CardContent>

                    <CardFooter className="flex justify-end pt-4 p-6 bg-amber-50 border-t border-amber-100">
                      <Button
                        type="submit"
                        disabled={carregant}
                        size="lg"
                        className="bg-amber-600 hover:bg-amber-700 text-white transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        {carregant ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processant comanda...
                          </>
                        ) : (
                          "Confirmar comanda"
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </form>
              </motion.div>
            </div>

            {/* Resumen del pedido */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="border-0 shadow-lg overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-amber-600 to-stone-700 text-white">
                    <CardTitle>Resum de la comanda</CardTitle>
                    <CardDescription className="text-amber-100">
                      {carret.length} {carret.length === 1 ? "producte" : "productes"} al carret
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6">
                    <div className="max-h-[300px] overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-amber-200 scrollbar-track-stone-100">
                      {carret.map((prod, i) => (
                        <div key={i} className="flex justify-between items-center border-b border-stone-100 pb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-md overflow-hidden bg-stone-100 border border-stone-200">
                              <img
                                src={prod.imatge || "/placeholder.svg?height=100&width=100&query=pet product"}
                                alt={prod.nom}
                                className="w-full h-full object-cover"
                              />
                            </div>
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

                    <Separator className="bg-stone-200" />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-stone-600">Subtotal</span>
                        <span className="text-stone-800">{calcularSubtotal()} €</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-600">Enviament</span>
                        <span className="text-green-600 font-medium">Gratis</span>
                      </div>
                      <Separator className="my-2 bg-stone-200" />
                      <div className="flex justify-between font-bold text-lg">
                        <span className="text-stone-800">Total</span>
                        <span className="text-amber-700">{calcularTotal()} €</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

