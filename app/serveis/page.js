"use client"

import Navbar from "../../components/Navbar"
import { motion } from "framer-motion"
import {
  Stethoscope,
  Syringe,
  Scissors,
  ShoppingBag,
  HeartPulse,
  Microscope,
  Dog,
  Cat,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  PawPrint,
  Star,
  Shield,
  Phone,
} from "lucide-react"
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
      icon: <Stethoscope className="h-10 w-10 text-amber-700" />,
      color: "bg-amber-50 border-amber-200",
      borderColor: "border-t-amber-600",
      link: "/contacte",
    },
    {
      title: "Vacunacions i desparasitacions",
      description:
        "Pla de vacunació adaptat a cada mascota i control de paràsits interns i externs. Prevenció de malalties i manteniment de la salut.",
      icon: <Syringe className="h-10 w-10 text-stone-700" />,
      color: "bg-stone-50 border-stone-200",
      borderColor: "border-t-stone-600",
      link: "/contacte",
    },
    {
      title: "Cirurgia veterinària",
      description:
        "Intervencions quirúrgiques de rutina i especialitzades, ecografies en instal·lacions modernes i segures. Equip professional i experimentat.",
      icon: <HeartPulse className="h-10 w-10 text-amber-800" />,
      color: "bg-amber-50 border-amber-200",
      borderColor: "border-t-amber-700",
      link: "/contacte",
    },
    {
      title: "Perruqueria canina i felina",
      description:
        "Servei de perruqueria per mantenir la higiene i l'estètica de la teva mascota amb amor i professionalitat. Tractaments específics per a cada tipus de pèl.",
      icon: <Scissors className="h-10 w-10 text-stone-600" />,
      color: "bg-stone-50 border-stone-200",
      borderColor: "border-t-stone-500",
      link: "/contacte",
    },
    {
      title: "Botiga especialitzada",
      description:
        "Alimentació de qualitat, accessoris i productes de salut seleccionats per al benestar de la teva mascota. Assessorament personalitzat.",
      icon: <ShoppingBag className="h-10 w-10 text-amber-600" />,
      color: "bg-amber-50 border-amber-200",
      borderColor: "border-t-amber-500",
      link: "/productes",
    },
    {
      title: "Anàlisis clíniques",
      description:
        "Realitzem anàlisis de sang, orina i altres mostres per detectar malalties i avaluar l'estat de salut de la teva mascota. Resultats ràpids i precisos.",
      icon: <Microscope className="h-10 w-10 text-stone-700" />,
      color: "bg-stone-50 border-stone-200",
      borderColor: "border-t-stone-600",
      link: "/contacte",
    },
  ]

  const dogServices = [
    "Vacunacions i desparasitacions",
    "Control de malalties cròniques",
    "Perruqueria i estètica canina",
    "Alimentació especialitzada",
    "Cirurgia general i especialitzada",
    "Diagnòstic per imatge",
  ]

  const catServices = [
    "Vacunacions i desparasitacions",
    "Diagnòstic i tractament de malalties",
    "Control de pes i nutrició",
    "Higiene i cura del pèl",
    "Cirurgia felina",
    "Medicina preventiva",
  ]

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

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
          <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-300">Els nostres serveis</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-stone-800 mb-6">Serveis veterinaris</h1>
          <p className="text-stone-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Cuidem de la teva mascota amb professionalitat i amor, oferint una àmplia gamma de serveis veterinaris
            adaptats a les necessitats específiques de cada animal
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

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Card
                  className={`h-full border-t-4 ${service.borderColor} hover:shadow-xl transition-all duration-300 overflow-hidden`}
                >
                  <CardHeader className={`${service.color} rounded-t-lg`}>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl font-bold text-stone-800">{service.title}</CardTitle>
                      <div className="p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-sm">{service.icon}</div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-stone-600 leading-relaxed">{service.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      asChild
                      className="gap-1 hover:gap-2 transition-all text-amber-700 hover:text-amber-800 hover:bg-amber-50"
                    >
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
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-300">Especialistes</Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-stone-800 mb-4">Cuidem de tots els teus companys</h2>
              <p className="text-stone-600 max-w-2xl mx-auto text-lg">
                Oferim serveis especialitzats per a diferents tipus d'animals, adaptant-nos a les necessitats
                específiques de cada espècie
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Especialistes en gossos */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-amber-600 to-stone-700 rounded-lg overflow-hidden shadow-xl h-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                <div className="p-8 md:p-10 text-white">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-white/10 rounded-full">
                      <Dog className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold">Especialistes en gossos</h3>
                  </div>
                  <p className="mb-8 text-amber-100 leading-relaxed">
                    Oferim serveis especialitzats per a gossos de totes les races i edats. Des de revisions rutinàries
                    fins a tractaments específics, cuidem del teu millor amic amb la màxima professionalitat i
                    dedicació.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {dogServices.map((service, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle2 className="h-5 w-5 text-amber-300 mt-0.5 flex-shrink-0" />
                        <span>{service}</span>
                      </motion.div>
                    ))}
                  </div>
                  <Button
                    size="lg"
                    className="bg-white text-amber-800 hover:bg-amber-100 transition-all duration-300 shadow-lg hover:shadow-white/20"
                    asChild
                  >
                    <Link href="/contacte">
                      Demana cita
                      <Calendar className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 md:hidden"></div>
                  <img src="/pastor.jpg" alt="Gos feliç" className="w-full h-full object-cover" />
                </div>
              </div>
            </motion.div>

            {/* Especialistes en gats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-stone-600 to-stone-800 rounded-lg overflow-hidden shadow-xl h-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                <div className="relative h-full order-2 md:order-1">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 md:hidden"></div>
                  <img src="/cat.jpg" alt="Gat feliç" className="w-full h-full object-cover" />
                </div>
                <div className="p-8 md:p-10 text-white order-1 md:order-2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-white/10 rounded-full">
                      <Cat className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold">Especialistes en gats</h3>
                  </div>
                  <p className="mb-8 text-stone-100 leading-relaxed">
                    Coneixem les necessitats específiques dels gats i oferim serveis adaptats a ells. Tractem els teus
                    felins amb la cura i l'atenció que mereixen, en un entorn tranquil i segur per minimitzar l'estrès.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {catServices.map((service, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle2 className="h-5 w-5 text-amber-300 mt-0.5 flex-shrink-0" />
                        <span>{service}</span>
                      </motion.div>
                    ))}
                  </div>
                  <Button
                    size="lg"
                    className="bg-white text-stone-800 hover:bg-stone-100 transition-all duration-300 shadow-lg hover:shadow-white/20"
                    asChild
                  >
                    <Link href="/contacte">
                      Demana cita
                      <Calendar className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-300">El nostre procés</Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-stone-800 mb-4">Com treballem</h2>
              <p className="text-stone-600 max-w-2xl mx-auto text-lg">
                El nostre enfocament està centrat en el benestar de la teva mascota i en oferir-te la millor experiència
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="h-2 w-full bg-gradient-to-r from-amber-500 to-amber-700"></div>
                <CardContent className="pt-8 pb-6 px-6 text-center">
                  <div className="w-16 h-16 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-6">
                    <Calendar className="h-8 w-8 text-amber-700" />
                  </div>
                  <h3 className="text-xl font-bold text-stone-800 mb-3">1. Demana cita</h3>
                  <p className="text-stone-600">
                    Contacta'ns per telèfon o a través del nostre formulari web per concertar una cita en l'horari que
                    millor et convingui.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="h-2 w-full bg-gradient-to-r from-amber-600 to-amber-800"></div>
                <CardContent className="pt-8 pb-6 px-6 text-center">
                  <div className="w-16 h-16 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-6">
                    <Stethoscope className="h-8 w-8 text-amber-700" />
                  </div>
                  <h3 className="text-xl font-bold text-stone-800 mb-3">2. Diagnòstic i tractament</h3>
                  <p className="text-stone-600">
                    Els nostres professionals examinaran la teva mascota i determinaran el millor tractament segons les
                    seves necessitats específiques.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="h-2 w-full bg-gradient-to-r from-amber-700 to-amber-900"></div>
                <CardContent className="pt-8 pb-6 px-6 text-center">
                  <div className="w-16 h-16 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-6">
                    <Shield className="h-8 w-8 text-amber-700" />
                  </div>
                  <h3 className="text-xl font-bold text-stone-800 mb-3">3. Seguiment</h3>
                  <p className="text-stone-600">
                    Realitzem un seguiment personalitzat per assegurar-nos que la teva mascota es recupera correctament
                    i gaudeix d'una bona salut.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-stone-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-r from-amber-600 to-stone-700 text-white">
              <CardContent className="p-10 md:p-16">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="relative">
                      <div className="absolute -top-4 -left-4 w-16 h-16 bg-amber-400/30 rounded-full"></div>
                      <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-amber-400/20 rounded-full"></div>
                      <div className="relative z-10 text-center">
                        <Star className="h-16 w-16 text-amber-300 mx-auto mb-4" />
                        <div className="flex justify-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-6 w-6 text-amber-300 fill-amber-300" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-2/3">
                    <blockquote className="text-xl md:text-2xl italic font-light mb-6 leading-relaxed">
                      "El servei veterinari és excel·lent. La Carla i el seu equip sempre tracten al nostre gos amb molt
                      d'afecte i professionalitat. Gràcies a ells, en Max està sa i feliç."
                    </blockquote>
                    <div className="flex items-center">
                      <div>
                        <p className="font-semibold text-lg">Anna i Jordi</p>
                        <p className="text-amber-200">Propietaris d'en Max</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-amber-50 to-stone-50 rounded-lg p-10 text-center shadow-lg border border-amber-100"
          >
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-stone-800 mb-4">Necessites més informació?</h2>
              <p className="text-stone-600 text-lg mb-8">
                Si tens dubtes sobre els nostres serveis o vols concertar una cita, no dubtis en contactar amb
                nosaltres. Estarem encantats d'atendre't i resoldre tots els teus dubtes.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white transition-all duration-300 shadow-lg hover:shadow-amber-700/20"
                >
                  <Link href="/contacte">
                    Contacta'ns
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-amber-600 text-amber-800 hover:bg-amber-50 transition-colors"
                >
                  <a href="tel:938310669">
                    <Phone className="mr-2 h-4 w-4" />
                    938 310 669
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hours Section */}
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-300">Horari d'atenció</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">Quan pots visitar-nos</h2>
              <p className="text-stone-600 max-w-2xl mx-auto text-lg">
                Estem disponibles per atendre les teves mascotes en els següents horaris
              </p>
            </motion.div>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="border-0 shadow-lg overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-amber-100 rounded-full">
                    <Clock className="h-6 w-6 text-amber-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-800">Horari d'atenció</h3>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between py-3 border-b border-amber-100">
                    <span className="font-medium text-lg text-stone-700">Dilluns a Divendres</span>
                    <span className="text-amber-800 font-medium">10:00 - 13:00 i 17:00 - 20:00</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-amber-100">
                    <span className="font-medium text-lg text-stone-700">Dissabte</span>
                    <span className="text-amber-800 font-medium">10:00 - 13:00</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-amber-100">
                    <span className="font-medium text-lg text-stone-700">Diumenge</span>
                    <span className="text-amber-800 font-medium">Tancat</span>
                  </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                  <p className="text-stone-700 text-center">
                    Per a urgències fora d'horari, si us plau, contacta amb el servei d'urgències veterinàries al{" "}
                    <a href="tel:938310669" className="text-amber-700 font-semibold hover:underline">
                      938 310 669
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

