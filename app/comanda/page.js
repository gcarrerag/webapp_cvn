"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "../../components/Navbar"
import { Toaster, toast } from "react-hot-toast"
import { CreditCard, Home, Store, Truck, ShoppingBag, ClipboardCheck, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"

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
      toast.error("El carret està buit!")
      return
    }

    if (!validateForm()) {
      toast.error("Si us plau, revisa els camps del formulari")
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
          toast.error("Error en iniciar el pagament")
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
      toast.error("Error inesperat")
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
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto py-20 flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
          <p className="text-gray-600 text-lg">Carregant...</p>
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
          <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3 mb-2">
            <ClipboardCheck className="h-8 w-8" />
            Finalitzar comanda
          </h1>
          <p className="text-gray-600 text-center">Completa les teves dades per finalitzar la compra</p>
        </header>

        {carret.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-10 text-center max-w-md mx-auto">
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">El carret està buit</h3>
            <p className="text-gray-600 mb-6">Afegeix productes al carret per realitzar una comanda.</p>
            <Button onClick={() => router.push("/productes")}>Veure productes</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulario */}
            <div className="lg:col-span-2">
              <form onSubmit={enviarComanda}>
                <Card>
                  <CardHeader>
                    <CardTitle>Dades personals</CardTitle>
                    <CardDescription>Introdueix les teves dades de contacte</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom i cognoms</Label>
                      <Input
                        id="nom"
                        name="nom"
                        placeholder="Nom i cognoms"
                        value={formulari.nom}
                        onChange={handleChange}
                      />
                      {errors.nom && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> {errors.nom}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telefon">Telèfon</Label>
                      <Input
                        id="telefon"
                        name="telefon"
                        type="tel"
                        placeholder="Telèfon (9 dígits)"
                        value={formulari.telefon}
                        onChange={handleChange}
                      />
                      {errors.telefon && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> {errors.telefon}
                        </p>
                      )}
                    </div>
                  </CardContent>

                  <Separator />

                  <CardHeader>
                    <CardTitle>Mètode d'enviament</CardTitle>
                    <CardDescription>Selecciona com vols rebre la teva comanda</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RadioGroup
                      value={formulari.enviament}
                      onValueChange={handleRadioChange}
                      className="flex flex-col space-y-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="domicili" id="domicili" />
                        <Label htmlFor="domicili" className="flex items-center gap-2 cursor-pointer">
                          <Truck className="h-4 w-4" /> Enviament a domicili
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="recollida" id="recollida" />
                        <Label htmlFor="recollida" className="flex items-center gap-2 cursor-pointer">
                          <Store className="h-4 w-4" /> Recollida al local
                        </Label>
                      </div>
                    </RadioGroup>

                    {formulari.enviament === "domicili" && (
                      <div className="space-y-2 pt-2">
                        <Label htmlFor="adreca">Adreça d'enviament</Label>
                        <Input
                          id="adreca"
                          name="adreca"
                          placeholder="Adreça completa"
                          value={formulari.adreca}
                          onChange={handleChange}
                        />
                        {errors.adreca && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> {errors.adreca}
                          </p>
                        )}
                      </div>
                    )}

                    {formulari.enviament === "recollida" && (
                      <Alert variant="outline" className="bg-blue-50 border-blue-200">
                        <Home className="h-4 w-4 text-blue-500" />
                        <AlertDescription className="text-blue-700">
                          Podràs recollir la teva comanda a la nostra botiga: Carrer Principal, 123, Barcelona
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>

                  <Separator />

                  {/* Método de pago */}
                  <CardHeader>
                    <CardTitle>Mètode de pagament</CardTitle>
                    <CardDescription>Selecciona com vols pagar la teva comanda</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {formulari.enviament === "recollida" ? (
                      <Select value={formulari.metodePagament} onValueChange={handleSelectChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona mètode de pagament" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="stripe">
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4" /> Pagar ara amb targeta
                            </div>
                          </SelectItem>
                          <SelectItem value="local">
                            <div className="flex items-center gap-2">
                              <Store className="h-4 w-4" /> Pagar al local
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="flex items-center gap-2 p-2 border rounded bg-gray-50">
                        <CreditCard className="h-4 w-4 text-green-600" />
                        <span>Pagament amb targeta (Stripe)</span>
                      </div>
                    )}

                    <div className="space-y-2 pt-2">
                      <Label htmlFor="observacions">Observacions (opcional)</Label>
                      <Textarea
                        id="observacions"
                        name="observacions"
                        placeholder="Instruccions especials per a la comanda"
                        value={formulari.observacions}
                        onChange={handleChange}
                        rows={3}
                      />
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-end pt-4">
                    <Button type="submit" disabled={carregant} size="lg">
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
            </div>

            {/* Resumen del pedido */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Resum de la comanda</CardTitle>
                  <CardDescription>
                    {carret.length} {carret.length === 1 ? "producte" : "productes"} al carret
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="max-h-[300px] overflow-y-auto space-y-3 pr-2">
                    {carret.map((prod, i) => (
                      <div key={i} className="flex justify-between items-center border-b pb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded overflow-hidden bg-gray-100">
                            <img
                              src={prod.imatge || "/placeholder.svg"}
                              alt={prod.nom}
                              className="w-full h-full object-cover"
                            />
                          </div>
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

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>{calcularSubtotal()} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Enviament</span>
                      <span>Gratis</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{calcularTotal()} €</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}





