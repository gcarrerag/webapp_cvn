"use client"

import { useState } from "react"
import Navbar from "../../components/Navbar"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, Send, Instagram, MessageSquare, CalendarCheck, ArrowRight } from "lucide-react"
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4">Contacta amb nosaltres</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Estem aquí per ajudar-te</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Si tens qualsevol dubte o vols concertar una cita, no dubtis en contactar amb nosaltres
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Envia'ns un missatge</CardTitle>
                <CardDescription>Omple el formulari i et respondrem el més aviat possible</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="missatge" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="missatge" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" /> Missatge
                    </TabsTrigger>
                    <TabsTrigger value="cita" className="flex items-center gap-2">
                      <CalendarCheck className="h-4 w-4" /> Demanar cita
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="missatge">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nom">Nom i cognoms</Label>
                          <Input
                            id="nom"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            placeholder="El teu nom"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telefon">Telèfon</Label>
                          <Input
                            id="telefon"
                            name="telefon"
                            value={formData.telefon}
                            onChange={handleChange}
                            placeholder="El teu telèfon"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Correu electrònic</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="El teu correu electrònic"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Tipus de consulta</Label>
                        <RadioGroup value={formData.tipus} onValueChange={handleRadioChange} className="flex space-x-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="consulta" id="consulta" />
                            <Label htmlFor="consulta">Consulta general</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="productes" id="productes" />
                            <Label htmlFor="productes">Productes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="urgencia" id="urgencia" />
                            <Label htmlFor="urgencia">Urgència</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="missatge">Missatge</Label>
                        <Textarea
                          id="missatge"
                          name="missatge"
                          value={formData.missatge}
                          onChange={handleChange}
                          placeholder="Escriu el teu missatge aquí"
                          rows={5}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full" disabled={loading || submitted}>
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
                          <Label htmlFor="nom-cita">Nom i cognoms</Label>
                          <Input
                            id="nom-cita"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            placeholder="El teu nom"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telefon-cita">Telèfon</Label>
                          <Input
                            id="telefon-cita"
                            name="telefon"
                            value={formData.telefon}
                            onChange={handleChange}
                            placeholder="El teu telèfon"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email-cita">Correu electrònic</Label>
                        <Input
                          id="email-cita"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="El teu correu electrònic"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Tipus de servei</Label>
                        <RadioGroup
                          value={formData.tipus}
                          onValueChange={handleRadioChange}
                          className="flex flex-wrap gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="consulta" id="consulta-cita" />
                            <Label htmlFor="consulta-cita">Consulta veterinària</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="perruqueria" id="perruqueria" />
                            <Label htmlFor="perruqueria">Perruqueria</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="vacunacio" id="vacunacio" />
                            <Label htmlFor="vacunacio">Vacunació</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="missatge-cita">Detalls addicionals</Label>
                        <Textarea
                          id="missatge-cita"
                          name="missatge"
                          value={formData.missatge}
                          onChange={handleChange}
                          placeholder="Indica'ns el motiu de la cita, tipus de mascota, etc."
                          rows={5}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full" disabled={loading || submitted}>
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
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Informació de contacte</CardTitle>
                <CardDescription>Troba'ns fàcilment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Adreça</h3>
                    <p className="text-gray-700">Plaça Ansèlm Clavé núm 13, Navarcles, 08270</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Telèfon</h3>
                    <p className="text-gray-700">
                      <a href="tel:938310669" className="hover:text-blue-600 transition-colors">
                        938 310 669
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Correu electrònic</h3>
                    <p className="text-gray-700">
                      <a
                        href="mailto:gerard.cagu@gmail.com"
                        className="hover:text-blue-600 transition-colors"
                      >
                        veterinari.navarcles@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Instagram className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Instagram</h3>
                    <p className="text-gray-700">
                      <a
                        href="https://www.instagram.com/centre_veterinari_navarcles/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition-colors"
                      >
                        @centre_veterinari_navarcles
                      </a>
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <h3 className="font-medium text-gray-900">Horari d'atenció</h3>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    {horaris.map((horari, index) => (
                      <div key={index} className="flex justify-between py-1 border-b last:border-0 border-gray-200">
                        <span className="font-medium">{horari.dia}</span>
                        <span className="text-gray-700">{horari.hores}</span>
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
          <Card>
            <CardHeader>
              <CardTitle>La nostra ubicació</CardTitle>
              <CardDescription>Troba'ns fàcilment a Navarcles</CardDescription>
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
          className="text-center bg-blue-50 rounded-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Urgències veterinàries</h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-6">
            En cas d'urgència fora del nostre horari d'atenció, pots contactar amb el servei d'urgències veterinàries
            24h trucant al nostre telèfon. T'indicarem el centre d'urgències més proper.
          </p>
          <Button size="lg" variant="default" asChild>
            <a href="tel:938310669">
              <Phone className="mr-2 h-4 w-4" /> 938 310 669
            </a>
          </Button>
        </motion.div>
      </main>
    </div>
  )
}
