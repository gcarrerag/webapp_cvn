"use client"

import { useState } from "react"
import Navbar from "../../components/Navbar"
import { motion } from "framer-motion"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Instagram,
  MessageSquare,
  CalendarCheck,
  ArrowRight,
  PawPrint,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function Contacte() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telefon: "",
    missatge: "",
    tipus: "consulta",
  })

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value) => {
    setFormData((prev) => ({ ...prev, tipus: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/contacte", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSubmitted(true)
        setFormData({
          nom: "",
          email: "",
          telefon: "",
          missatge: "",
          tipus: "consulta",
        })

        // Reiniciar estat del formulari després de 3s
        setTimeout(() => setSubmitted(false), 3000)
      } else {
        const errorData = await res.json()
        alert("Error en enviar el missatge: " + errorData.error)
      }
    } catch (error) {
      console.error("Error en enviar:", error)
      alert("Error de connexió amb el servidor.")
    } finally {
      setLoading(false)
    }
  }

  const horaris = [
    { dia: "Dilluns", hores: "10:00 - 13:00 i 17:00 - 20:00" },
    { dia: "Dimarts", hores: "10:00 - 13:00 i 17:00 - 20:00" },
    { dia: "Dimecres", hores: "10:00 - 13:00 i 17:00 - 20:00" },
    { dia: "Dijous", hores: "10:00 - 13:00 i 17:00 - 20:00" },
    { dia: "Divendres", hores: "10:00 - 13:00 i 17:00 - 20:00" },
    { dia: "Dissabte", hores: "10:00 - 13:00" },
    { dia: "Diumenge", hores: "Tancat" },
  ]

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-amber-50 to-stone-100 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-64 bg-[url('/abstract-geometric-flow.png')] bg-cover opacity-10"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-300">Contacta amb nosaltres</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-stone-800 mb-6">Estem aquí per ajudar-te</h1>
          <p className="text-stone-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Si tens qualsevol dubte o vols concertar una cita, no dubtis en contactar amb nosaltres
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

      <main className="container mx-auto py-12 px-4 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="border-0 shadow-lg overflow-hidden">
              <CardHeader className="bg-white border-b border-stone-100">
                <CardTitle className="text-stone-800">Envia'ns un missatge</CardTitle>
                <CardDescription className="text-stone-600">
                  Omple el formulari i et respondrem el més aviat possible
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="missatge" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6 bg-stone-100">
                    <TabsTrigger
                      value="missatge"
                      className="flex items-center gap-2 data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                    >
                      <MessageSquare className="h-4 w-4" /> Missatge
                    </TabsTrigger>
                    <TabsTrigger
                      value="cita"
                      className="flex items-center gap-2 data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                    >
                      <CalendarCheck className="h-4 w-4" /> Demanar cita
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="missatge">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nom" className="text-stone-700">
                            Nom i cognoms
                          </Label>
                          <Input
                            id="nom"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            placeholder="El teu nom"
                            required
                            className="border-stone-200 focus:border-amber-300 focus:ring-amber-300"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telefon" className="text-stone-700">
                            Telèfon
                          </Label>
                          <Input
                            id="telefon"
                            name="telefon"
                            value={formData.telefon}
                            onChange={handleChange}
                            placeholder="El teu telèfon"
                            required
                            className="border-stone-200 focus:border-amber-300 focus:ring-amber-300"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-stone-700">
                          Correu electrònic
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="El teu correu electrònic"
                          required
                          className="border-stone-200 focus:border-amber-300 focus:ring-amber-300"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-stone-700">Tipus de consulta</Label>
                        <RadioGroup value={formData.tipus} onValueChange={handleRadioChange} className="flex space-x-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="consulta"
                              id="consulta"
                              className="text-amber-600 border-stone-300"
                            />
                            <Label htmlFor="consulta" className="text-stone-700">
                              Consulta general
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="productes"
                              id="productes"
                              className="text-amber-600 border-stone-300"
                            />
                            <Label htmlFor="productes" className="text-stone-700">
                              Productes
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="urgencia"
                              id="urgencia"
                              className="text-amber-600 border-stone-300"
                            />
                            <Label htmlFor="urgencia" className="text-stone-700">
                              Urgència
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="missatge" className="text-stone-700">
                          Missatge
                        </Label>
                        <Textarea
                          id="missatge"
                          name="missatge"
                          value={formData.missatge}
                          onChange={handleChange}
                          placeholder="Escriu el teu missatge aquí"
                          rows={5}
                          required
                          className="border-stone-200 focus:border-amber-300 focus:ring-amber-300"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                        disabled={loading || submitted}
                      >
                        {loading ? (
                          <>Enviant...</>
                        ) : submitted ? (
                          <>Missatge enviat correctament!</>
                        ) : (
                          <>
                            Enviar missatge <Send className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="cita">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nom-cita" className="text-stone-700">
                            Nom i cognoms
                          </Label>
                          <Input
                            id="nom-cita"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            placeholder="El teu nom"
                            required
                            className="border-stone-200 focus:border-amber-300 focus:ring-amber-300"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telefon-cita" className="text-stone-700">
                            Telèfon
                          </Label>
                          <Input
                            id="telefon-cita"
                            name="telefon"
                            value={formData.telefon}
                            onChange={handleChange}
                            placeholder="El teu telèfon"
                            required
                            className="border-stone-200 focus:border-amber-300 focus:ring-amber-300"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email-cita" className="text-stone-700">
                          Correu electrònic
                        </Label>
                        <Input
                          id="email-cita"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="El teu correu electrònic"
                          required
                          className="border-stone-200 focus:border-amber-300 focus:ring-amber-300"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-stone-700">Tipus de servei</Label>
                        <RadioGroup
                          value={formData.tipus}
                          onValueChange={handleRadioChange}
                          className="flex flex-wrap gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="consulta"
                              id="consulta-cita"
                              className="text-amber-600 border-stone-300"
                            />
                            <Label htmlFor="consulta-cita" className="text-stone-700">
                              Consulta veterinària
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="perruqueria"
                              id="perruqueria"
                              className="text-amber-600 border-stone-300"
                            />
                            <Label htmlFor="perruqueria" className="text-stone-700">
                              Perruqueria
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="vacunacio"
                              id="vacunacio"
                              className="text-amber-600 border-stone-300"
                            />
                            <Label htmlFor="vacunacio" className="text-stone-700">
                              Vacunació
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="missatge-cita" className="text-stone-700">
                          Detalls addicionals
                        </Label>
                        <Textarea
                          id="missatge-cita"
                          name="missatge"
                          value={formData.missatge}
                          onChange={handleChange}
                          placeholder="Indica'ns el motiu de la cita, tipus de mascota, etc."
                          rows={5}
                          required
                          className="border-stone-200 focus:border-amber-300 focus:ring-amber-300"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                        disabled={loading || submitted}
                      >
                        {loading ? (
                          <>Enviant...</>
                        ) : submitted ? (
                          <>Sol·licitud enviada correctament!</>
                        ) : (
                          <>
                            Sol·licitar cita <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="h-full border-0 shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-amber-600 to-stone-700 text-white">
                <CardTitle>Informació de contacte</CardTitle>
                <CardDescription className="text-amber-100">Troba'ns fàcilment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-100 rounded-full mt-1 flex-shrink-0">
                    <MapPin className="h-5 w-5 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-medium text-stone-800">Adreça</h3>
                    <p className="text-stone-600">Plaça Ansèlm Clavé núm 13, Navarcles, 08270</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-100 rounded-full mt-1 flex-shrink-0">
                    <Phone className="h-5 w-5 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-medium text-stone-800">Telèfon</h3>
                    <p className="text-stone-600">
                      <a href="tel:938310669" className="hover:text-amber-700 transition-colors">
                        938 310 669
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-100 rounded-full mt-1 flex-shrink-0">
                    <Mail className="h-5 w-5 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-medium text-stone-800">Correu electrònic</h3>
                    <p className="text-stone-600">
                      <a
                        href="mailto:veterinari.navarcles@gmail.com"
                        className="hover:text-amber-700 transition-colors"
                      >
                        veterinari.navarcles@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-100 rounded-full mt-1 flex-shrink-0">
                    <Instagram className="h-5 w-5 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-medium text-stone-800">Instagram</h3>
                    <p className="text-stone-600">
                      <a
                        href="https://www.instagram.com/centre_veterinari_navarcles/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-amber-700 transition-colors"
                      >
                        @centre_veterinari_navarcles
                      </a>
                    </p>
                  </div>
                </div>

                <Separator className="bg-stone-200" />

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-amber-100 rounded-full mt-1 flex-shrink-0">
                      <Clock className="h-5 w-5 text-amber-700" />
                    </div>
                    <h3 className="font-medium text-stone-800">Horari d'atenció</h3>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                    {horaris.map((horari, index) => (
                      <div key={index} className="flex justify-between py-1 border-b last:border-0 border-amber-200">
                        <span className="font-medium text-stone-800">{horari.dia}</span>
                        <span className="text-stone-600">{horari.hores}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-16"
        >
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardHeader className="bg-white border-b border-stone-100">
              <CardTitle className="text-stone-800">La nostra ubicació</CardTitle>
              <CardDescription className="text-stone-600">Troba'ns fàcilment a Navarcles</CardDescription>
            </CardHeader>
            <CardContent className="p-0 aspect-video">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2982.6553874862897!2d1.9008861!3d41.7486111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4f9ab58d8c9a5%3A0x5a8e0c1e3d6a3f0!2sPla%C3%A7a%20Ans%C3%A8lm%20Clav%C3%A9%2C%2013%2C%2008270%20Navarcles%2C%20Barcelona!5e0!3m2!1ses!2ses!4v1651234567890!5m2!1ses!2ses"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa Centre Veterinari Navarcles"
              ></iframe>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center bg-gradient-to-r from-amber-600 to-stone-700 text-white rounded-lg p-8 shadow-lg relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/abstract-geometric-flow.png')] opacity-10 mix-blend-overlay"></div>
          <motion.div
            className="absolute -top-20 -left-20 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, 20, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 8 }}
          />
          <motion.div
            className="absolute -bottom-20 -right-20 w-60 h-60 bg-stone-600/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], x: [0, -30, 0], y: [0, -20, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 10, delay: 1 }}
          />

          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4">Urgències veterinàries</h2>
            <p className="max-w-3xl mx-auto mb-6 text-amber-100">
              En cas d'urgència fora del nostre horari d'atenció, pots contactar amb el servei d'urgències veterinàries
              24h trucant al nostre telèfon. T'indicarem el centre d'urgències més proper.
            </p>
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="bg-white text-amber-800 hover:bg-amber-100 transition-all duration-300 shadow-lg hover:shadow-white/20 hover:scale-105"
            >
              <a href="tel:938310669">
                <Phone className="mr-2 h-4 w-4" /> 938 310 669
              </a>
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

