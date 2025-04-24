"use client"

import Navbar from "../../components/Navbar"
import { motion } from "framer-motion"
import { Stethoscope, Syringe, Scissors, ShoppingBag, HeartPulse, Microscope, Dog, Cat, ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Serveis() {
  const services = [
    {
      title: "Consultes veterinàries",
      description:
        "Diagnòstic, tractament i prevenció de malalties per a gossos, gats i altres animals de companyia. Atenció personalitzada per a cada mascota.",
      icon: <Stethoscope className="h-10 w-10 text-blue-600" />,
      color: "bg-blue-50",
      link: "/contacte",
    },
    {
      title: "Vacunacions i desparasitacions",
      description:
        "Pla de vacunació adaptat a cada mascota i control de paràsits interns i externs. Prevenció de malalties i manteniment de la salut.",
      icon: <Syringe className="h-10 w-10 text-green-600" />,
      color: "bg-green-50",
      link: "/contacte",
    },
    {
      title: "Cirurgia veterinària",
      description:
        "Intervencions quirúrgiques de rutina i especialitzades, ecografies en instal·lacions modernes i segures. Equip professional i experimentat.",
      icon: <HeartPulse className="h-10 w-10 text-red-600" />,
      color: "bg-red-50",
      link: "/contacte",
    },
    {
      title: "Perruqueria canina i felina",
      description:
        "Servei de perruqueria per mantenir la higiene i l'estètica de la teva mascota amb amor i professionalitat. Tractaments específics per a cada tipus de pèl.",
      icon: <Scissors className="h-10 w-10 text-purple-600" />,
      color: "bg-purple-50",
      link: "/contacte",
    },
    {
      title: "Botiga especialitzada",
      description:
        "Alimentació de qualitat, accessoris i productes de salut seleccionats per al benestar de la teva mascota. Assessorament personalitzat.",
      icon: <ShoppingBag className="h-10 w-10 text-amber-600" />,
      color: "bg-amber-50",
      link: "/productes",
    },
    {
      title: "Anàlisis clíniques",
      description:
        "Realitzem anàlisis de sang, orina i altres mostres per detectar malalties i avaluar l'estat de salut de la teva mascota. Resultats ràpids i precisos.",
      icon: <Microscope className="h-10 w-10 text-indigo-600" />,
      color: "bg-indigo-50",
      link: "/contacte",
    },
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
          <Badge className="mb-4">Els nostres serveis</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Serveis veterinaris</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Cuidem de la teva mascota amb professionalitat i amor, oferint una àmplia gamma de serveis veterinaris
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-t-4 border-t-blue-500 hover:shadow-lg transition-shadow">
                <CardHeader className={`${service.color} rounded-t-lg`}>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                    <div className="p-2 rounded-full bg-white/80 backdrop-blur-sm">{service.icon}</div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-700">{service.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" asChild className="gap-1 hover:gap-2 transition-all">
                    <Link href={service.link}>
                      Més informació
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-8 text-white"
          >
            <div className="flex items-center gap-4 mb-4">
              <Dog className="h-12 w-12" />
              <h2 className="text-2xl font-bold">Especialistes en gossos</h2>
            </div>
            <p className="mb-6 text-white/90">
              Oferim serveis especialitzats per a gossos de totes les races i edats. Des de revisions rutinàries fins a
              tractaments específics, cuidem del teu millor amic amb la màxima professionalitat.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-white"></div>
                <span>Vacunacions i desparasitacions</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-white"></div>
                <span>Control de malalties cròniques</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-white"></div>
                <span>Perruqueria i estètica canina</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-white"></div>
                <span>Alimentació especialitzada</span>
              </li>
            </ul>
            <Button variant="secondary" asChild>
              <Link href="/contacte">Demana cita</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-8 text-white"
          >
            <div className="flex items-center gap-4 mb-4">
              <Cat className="h-12 w-12" />
              <h2 className="text-2xl font-bold">Especialistes en gats</h2>
            </div>
            <p className="mb-6 text-white/90">
              Coneixem les necessitats específiques dels gats i oferim serveis adaptats a ells. Tractem els teus felins
              amb la cura i l'atenció que mereixen, en un entorn tranquil i segur.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-white"></div>
                <span>Vacunacions i desparasitacions</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-white"></div>
                <span>Diagnòstic i tractament de malalties</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-white"></div>
                <span>Control de pes i nutrició</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-white"></div>
                <span>Higiene i cura del pèl</span>
              </li>
            </ul>
            <Button variant="secondary" asChild>
              <Link href="/contacte">Demana cita</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-lg p-8 text-center shadow-sm"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Necessites més informació?</h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-6">
            Si tens dubtes sobre els nostres serveis o vols concertar una cita, no dubtis en contactar amb nosaltres.
            Estarem encantats d'atendre't i resoldre tots els teus dubtes.
          </p>
          <Button size="lg" asChild>
            <Link href="/contacte">Contacta'ns</Link>
          </Button>
        </motion.div>
      </main>
    </div>
  )
}

