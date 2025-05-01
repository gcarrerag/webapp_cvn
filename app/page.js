"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Navbar from "../components/Navbar"
import { motion, useInView } from "framer-motion"
import {
  ArrowRight,
  Heart,
  Shield,
  PawPrint,
  Instagram,
  Facebook,
  Phone,
  MapPin,
  Clock,
  Stethoscope,
  Scissors,
  Users,
  Calendar,
  ChevronRight,
  ExternalLink,
  Mail,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const servicesRef = useRef(null)
  const isServicesInView = useInView(servicesRef, { once: true, amount: 0.2 })
  const heroRef = useRef(null)
  const testimonialsRef = useRef(null)
  const isTestimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.2 })

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const categories = [
    {
      name: "Alimentació",
      icon: <PawPrint className="h-8 w-8 mb-4 text-amber-700" />,
      description: "Aliments de qualitat per a gossos i gats",
      color: "bg-amber-50 border-amber-200 hover:border-amber-400",
      link: "/productes?categoria=alimentacio",
    },
    {
      name: "Accessoris i joguines",
      icon: <Heart className="h-8 w-8 mb-4 text-brown-600" />,
      description: "Tot el que necessiten per al seu dia a dia",
      color: "bg-stone-50 border-stone-200 hover:border-stone-400",
      link: "/productes?categoria=accessoris",
    },
    {
      name: "Higiene",
      icon: <Shield className="h-8 w-8 mb-4 text-amber-800" />,
      description: "Productes per a la cura i salut de la teva mascota",
      color: "bg-amber-50 border-amber-200 hover:border-amber-400",
      link: "/productes?categoria=higiene",
    },
  ]

  const services = [
    {
      name: "Consultes veterinàries",
      icon: <Stethoscope className="h-10 w-10 text-amber-700" />,
      description: "Diagnòstic i tractament de malalties per a les teves mascotes",
      color: "from-amber-600 to-amber-800",
    },
    {
      name: "Perruqueria canina",
      icon: <Scissors className="h-10 w-10 text-brown-600" />,
      description: "Servei professional de perruqueria per a gossos i gats",
      color: "from-stone-600 to-stone-800",
    },
    {
      name: "Botiga especialitzada",
      icon: <PawPrint className="h-10 w-10 text-amber-800" />,
      description: "Productes de qualitat seleccionats pels nostres veterinaris",
      color: "from-amber-700 to-amber-900",
    },
  ]

  const testimonials = [
    {
      name: "Maria Garcia",
      text: "Els productes són d'excel·lent qualitat i el meu gos està encantat amb el seu nou menjar. Recomano totalment aquesta botiga!",
      pet: "Toby, Labrador",
      avatar: "/happy-golden-retriever.png",
    },
    {
      name: "Joan Martí",
      text: "Servei excel·lent i enviament ràpid. Els accessoris que vaig comprar són de gran qualitat i durabilitat.",
      pet: "Luna, Border Collie",
      avatar: "/border-collie-portrait.png",
    },
    {
      name: "Laura Puig",
      text: "Els productes de cosmètica han millorat molt el pelatge del meu gat. Estic molt contenta amb els resultats!",
      pet: "Miu, Persa",
      avatar: "/fluffy-persian-cat.png",
    },
  ]

  const teamMembers = [
    {
      name: "Carla Carrera Gusart",
      role: "Veterinària i Directora",
      description: "Llicenciada en Veterinària per la UAB, especialitzada en medicina interna de petits animals.",
      image: "/carla.jpg",
    },
    {
      name: "Maria Antònia Gusart",
      role: "Auxiliar Veterinària",
      description: "Responsable de la botiga i la perruqueria canina amb més de 20 anys d'experiència.",
      image: "/mama.jpg",
    },
  ]

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <div className="overflow-hidden bg-stone-50">
      <Navbar />

      {/* Hero Section con Parallax */}
      <section
        ref={heroRef}
        className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/portada.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "scroll",
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        ></div>

        <div className="container relative z-10 px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 bg-amber-600/20 text-amber-100 backdrop-blur-sm border-amber-500/30 py-1.5 px-5 text-sm">
                Centre Veterinari Navarcles
              </Badge>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Benestar per a la teva{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                mascota
              </span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl mb-8 text-amber-50/90 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              A la nostra clínica i botiga veterinària trobaràs tot el que necessita la teva mascota amb cura, amor i
              qualitat per garantir una vida saludable i feliç.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white transition-all duration-300 shadow-lg hover:shadow-amber-700/20 hover:scale-105"
                asChild
              >
                <Link href="/productes">
                  Descobreix els nostres productes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                size="lg"
                className="bg-gradient-to-r from-stone-600 to-stone-800 hover:from-stone-700 hover:to-stone-900 text-white transition-all duration-300 shadow-lg hover:shadow-stone-700/20 hover:scale-105"
                asChild
              >
                <Link href="/serveis">Els nostres serveis</Link>
              </Button>

              <Button
                size="lg"
                className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white transition-all duration-300 shadow-lg hover:shadow-white/10 hover:scale-105"
                asChild
              >
                <Link href="/contacte">Contacta'ns</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            className="w-6 h-10 rounded-full border-2 border-amber-400/50 flex justify-center pt-2"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5], y: [0, 6, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              className="w-1 h-1 rounded-full bg-amber-400"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Información de contacto rápida */}
      <section className="bg-stone-800 py-4 shadow-md sticky top-0 z-30 text-amber-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-amber-400" />
                <a href="tel:938310669" className="text-sm font-medium hover:text-amber-300 transition-colors">
                  938 310 669
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-amber-400" />
                <span className="text-sm">Plaça Ansèlm Clavé, 13, Navarcles</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-400" />
                <span className="text-sm">Dilluns a Divendres: 10:00 - 13:00 / 17:00 - 20:00</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/centre_veterinari_navarcles/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-200 hover:text-amber-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-amber-200 hover:text-amber-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios destacados */}
      <section ref={servicesRef} className="py-24 bg-gradient-to-b from-amber-50 to-stone-100 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-300">Els nostres serveis</Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-stone-800 mb-4">Cuidem de la teva mascota</h2>
              <p className="text-stone-600 max-w-2xl mx-auto text-lg">
                Oferim una àmplia gamma de serveis veterinaris per garantir la salut i el benestar de la teva mascota
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-500 border-0 bg-white shadow-md relative">
                  <div className={`h-2 w-full bg-gradient-to-r ${service.color}`}></div>
                  <CardContent className="p-8">
                    <div className="mb-6 p-4 rounded-full bg-amber-50 inline-block">{service.icon}</div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-amber-700 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-stone-600 mb-4 text-lg">{service.description}</p>
                  </CardContent>
                  <CardFooter className="px-8 pb-8 pt-0">
                    <Button
                      variant="outline"
                      asChild
                      className="group-hover:bg-amber-50 group-hover:border-amber-300 transition-colors"
                    >
                      <Link href="/serveis">
                        Més informació
                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white transition-all duration-300 shadow-lg hover:shadow-amber-700/20"
              >
                <Link href="/serveis">
                  Veure tots els serveis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categorías destacadas */}
      <section id="categories" className="py-24 bg-stone-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-300">Les nostres categories</Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-stone-800 mb-4">Tot per a les teves mascotes</h2>
              <p className="text-stone-600 max-w-2xl mx-auto text-lg">
                Descobreix la nostra àmplia selecció de productes de qualitat per a gossos, gats i altres animals de
                companyia.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Link href={category.link} className="block h-full">
                  <Card
                    className={`h-full border-2 ${category.color} hover:shadow-xl transition-all duration-300 overflow-hidden`}
                  >
                    <CardContent className="p-8 text-center relative">
                      <motion.div whileHover={{ rotate: 10, scale: 1.1 }} transition={{ duration: 0.3 }}>
                        {category.icon}
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-2 text-stone-800">{category.name}</h3>
                      <p className="text-stone-600">{category.description}</p>
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-24 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-300">El nostre equip</Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-stone-800 mb-4">
                Professionals que cuiden de la teva mascota
              </h2>
              <p className="text-stone-600 max-w-2xl mx-auto text-lg">
                Coneix les persones que cada dia treballen amb dedicació i professionalitat per garantir el benestar
                dels teus companys de quatre potes.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <Card className="overflow-hidden h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center">
                    <div className="md:col-span-1 flex justify-center p-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-200/40 to-amber-600/40 z-0"></div>
                      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="relative z-10">
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="w-[300px] h-[300px] object-cover rounded-lg shadow-md"
                        />
                      </motion.div>
                    </div>
                    <div className="md:col-span-2 p-8 bg-white">
                      <h3 className="text-2xl font-bold text-stone-800 mb-2">{member.name}</h3>
                      <p className="text-amber-700 font-medium mb-4 text-lg">{member.role}</p>
                      <p className="text-stone-600 text-lg leading-relaxed">{member.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-amber-600 text-amber-800 hover:bg-amber-100 transition-colors"
              >
                <Link href="/quisom">
                  Coneix més sobre nosaltres
                  <Users className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sección informativa con imagen */}
      <section className="py-24 bg-stone-100 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-300">El nostre compromís</Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-stone-800 mb-6">Cuidem de qui més estimes</h2>
              <p className="text-stone-700 mb-6 text-lg leading-relaxed">
                Oferim una selecció de productes pensats per la salut, alimentació i benestar dels teus companys peluts.
                Treballem amb marques reconegudes i els nostres veterinaris seleccionen els millors productes per a cada
                necessitat.
              </p>
              <ul className="space-y-4 mb-8">
                <motion.li
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-amber-100 p-2 rounded-full mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-amber-700"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-stone-700 text-lg">Productes seleccionats per veterinaris professionals</span>
                </motion.li>
                <motion.li
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-amber-100 p-2 rounded-full mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-amber-700"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-stone-700 text-lg">Marques de qualitat i productes naturals</span>
                </motion.li>
                <motion.li
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-amber-100 p-2 rounded-full mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-amber-700"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-stone-700 text-lg">Assessorament personalitzat per a cada mascota</span>
                </motion.li>
              </ul>
              <Button
                asChild
                className="bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white transition-all duration-300 shadow-lg hover:shadow-amber-700/20"
              >
                <Link href="/productes">
                  Descobreix els nostres productes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <motion.div
                  className="absolute -top-6 -left-6 w-32 h-32 bg-amber-200 rounded-full z-0"
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5 }}
                />
                <motion.div
                  className="absolute -bottom-6 -right-6 w-40 h-40 bg-amber-100 rounded-full z-0"
                  animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 7, delay: 1 }}
                />
                <motion.div
                  whileHover={{ scale: 1.03, rotate: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10"
                >
                  <img
                    src="/bb.jpg"
                    alt="Mascotes Feliç"
                    className="rounded-lg shadow-2xl w-[600px] h-[600px] object-cover border-4 border-white"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Horarios y ubicación */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-300">Visita'ns</Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-stone-800 mb-4">Horaris i ubicació</h2>
              <p className="text-stone-600 max-w-2xl mx-auto text-lg">
                Troba'ns fàcilment i consulta els nostres horaris d'atenció
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-amber-100 rounded-full">
                      <Clock className="h-6 w-6 text-amber-700" />
                    </div>
                    <h3 className="text-2xl font-bold text-stone-800">Horari d'atenció</h3>
                  </div>

                  <div className="space-y-3 mb-8">
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

                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-amber-100 rounded-full">
                      <Calendar className="h-6 w-6 text-amber-700" />
                    </div>
                    <h3 className="text-2xl font-bold text-stone-800">Demana cita</h3>
                  </div>

                  <p className="text-stone-600 mb-6 text-lg">
                    Per a consultes veterinàries o serveis de perruqueria, demana cita prèvia per telèfon o a través del
                    nostre formulari.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Button
                      asChild
                      className="bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white transition-all duration-300"
                    >
                      <a href="tel:938310669">
                        <Phone className="mr-2 h-4 w-4" />
                        938 310 669
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      className="border-amber-600 text-amber-800 hover:bg-amber-50 transition-colors"
                    >
                      <Link href="/contacte">Formulari de contacte</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative h-full min-h-[400px]">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2982.6553874862897!2d1.9008861!3d41.7486111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4f9ab58d8c9a5%3A0x5a8e0c1e3d6a3f0!2sPla%C3%A7a%20Ans%C3%A8lm%20Clav%C3%A9%2C%2013%2C%2008270%20Navarcles%2C%20Barcelona!5e0!3m2!1ses!2ses!4v1651234567890!5m2!1ses!2ses"
                      width="100%"
                      height="100%"
                      style={{ border: 0, position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Mapa Centre Veterinari Navarcles"
                    ></iframe>
                    <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg max-w-xs">
                      <h3 className="font-bold text-stone-800 mb-1">Centre Veterinari Navarcles</h3>
                      <p className="text-sm text-stone-600 mb-2">Plaça Ansèlm Clavé núm 13, Navarcles, 08270</p>
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="w-full border-amber-600 text-amber-800 hover:bg-amber-50 transition-colors"
                      >
                        <a
                          href="https://goo.gl/maps/1JXzN8JYgRn5vUUt7"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1"
                        >
                          Com arribar
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section ref={testimonialsRef} className="py-24 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-300">Testimonis</Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-stone-800 mb-4">El que diuen els nostres clients</h2>
              <p className="text-stone-600 max-w-2xl mx-auto text-lg">
                Descobreix les experiències dels nostres clients i les seves mascotes amb els nostres serveis
                veterinaris i productes.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-8 relative">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-amber-100 rounded-bl-full z-0 opacity-50"></div>
                    <div className="flex items-center mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                    <p className="text-stone-700 mb-6 italic text-lg relative z-10">"{testimonial.text}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-stone-800">{testimonial.name}</p>
                        <p className="text-sm text-amber-700">{testimonial.pet}</p>
                      </div>
                      <PawPrint className="h-6 w-6 text-amber-400 ml-auto" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-amber-700 to-stone-800 text-white relative overflow-hidden">
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

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Troba tot el que necessita la teva mascota</h2>
            <p className="text-xl text-amber-100 mb-8">
              Visita la nostra clínica i botiga o contacta'ns per a qualsevol consulta. Estem aquí per ajudar-te.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="bg-white text-amber-800 hover:bg-amber-100 transition-all duration-300 shadow-lg hover:shadow-white/20 hover:scale-105"
              >
                <Link href="/productes">Comprar ara</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-white/10 hover:scale-105"
                asChild
              >
                <Link href="/contacte">Contacta'ns</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-6 text-amber-200">Centre Veterinari Navarcles</h3>
              <p className="text-stone-300 mb-6 leading-relaxed">
                Compromesos amb el benestar i la salut de les teves mascotes des de fa més de 30 anys.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/centre_veterinari_navarcles/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 transition p-2 bg-stone-800 rounded-full hover:bg-stone-700"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-amber-400 hover:text-amber-300 transition p-2 bg-stone-800 rounded-full hover:bg-stone-700"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="mailto:info@centreveterinarinavarcles.com"
                  className="text-amber-400 hover:text-amber-300 transition p-2 bg-stone-800 rounded-full hover:bg-stone-700"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6 text-amber-200">Productes</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/productes?categoria=menjar"
                    className="text-stone-300 hover:text-amber-300 transition block py-1"
                  >
                    Alimentació
                  </Link>
                </li>
                <li>
                  <Link
                    href="/productes?categoria=accessoris"
                    className="text-stone-300 hover:text-amber-300 transition block py-1"
                  >
                    Accessoris
                  </Link>
                </li>
                <li>
                  <Link
                    href="/productes?categoria=cosmetica"
                    className="text-stone-300 hover:text-amber-300 transition block py-1"
                  >
                    Higiene i cura
                  </Link>
                </li>
                <li>
                  <Link
                    href="/productes?animal=gos"
                    className="text-stone-300 hover:text-amber-300 transition block py-1"
                  >
                    Gossos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/productes?animal=gat"
                    className="text-stone-300 hover:text-amber-300 transition block py-1"
                  >
                    Gats
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6 text-amber-200">Informació</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/quisom" className="text-stone-300 hover:text-amber-300 transition block py-1">
                    Qui som
                  </Link>
                </li>
                <li>
                  <Link href="/serveis" className="text-stone-300 hover:text-amber-300 transition block py-1">
                    Serveis
                  </Link>
                </li>
                <li>
                  <Link href="/contacte" className="text-stone-300 hover:text-amber-300 transition block py-1">
                    Contacte
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-stone-300 hover:text-amber-300 transition block py-1">
                    Política de privacitat
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6 text-amber-200">Contacte</h3>
              <ul className="space-y-4 text-stone-300">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Plaça Ansèlm Clavé núm 13, Navarcles, 08270</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-amber-400 flex-shrink-0" />
                  <a href="tel:938310669" className="hover:text-amber-300 transition-colors">
                    938 310 669
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-amber-400 flex-shrink-0" />
                  <span>Dilluns a Divendres: 9:00 - 20:00</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-amber-400 flex-shrink-0" />
                  <span>Dissabte: 10:00 - 13:00</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-800 pt-8 text-center text-stone-400 text-sm">
            <p>© {new Date().getFullYear()} Centre Veterinari Navarcles · Tots els drets reservats</p>
            <p className="mt-2">Dissenyat per GCG Solutions</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

