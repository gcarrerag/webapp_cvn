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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const servicesRef = useRef(null)
  const isServicesInView = useInView(servicesRef, { once: true, amount: 0.2 })

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
      icon: <PawPrint className="h-8 w-8 mb-4 text-amber-500" />,
      description: "Aliments de qualitat per a gossos i gats",
      color: "bg-amber-50 border-amber-200",
      link: "/productes?categoria=menjar",
    },
    {
      name: "Accessoris",
      icon: <Heart className="h-8 w-8 mb-4 text-rose-500" />,
      description: "Tot el que necessiten per al seu dia a dia",
      color: "bg-rose-50 border-rose-200",
      link: "/productes?categoria=accessoris",
    },
    {
      name: "Higiene",
      icon: <Shield className="h-8 w-8 mb-4 text-blue-500" />,
      description: "Productes per a la cura i salut de la teva mascota",
      color: "bg-blue-50 border-blue-200",
      link: "/productes?categoria=cosmetica",
    },
  ]

  const services = [
    {
      name: "Consultes veterinàries",
      icon: <Stethoscope className="h-10 w-10 text-blue-500" />,
      description: "Diagnòstic i tractament de malalties per a les teves mascotes",
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Perruqueria canina",
      icon: <Scissors className="h-10 w-10 text-purple-500" />,
      description: "Servei professional de perruqueria per a gossos i gats",
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "Botiga especialitzada",
      icon: <PawPrint className="h-10 w-10 text-amber-500" />,
      description: "Productes de qualitat seleccionats pels nostres veterinaris",
      color: "from-amber-500 to-amber-600",
    },
  ]

  const testimonials = [
    {
      name: "Maria Garcia",
      text: "Els productes són d'excel·lent qualitat i el meu gos està encantat amb el seu nou menjar. Recomano totalment aquesta botiga!",
      pet: "Toby, Labrador",
    },
    {
      name: "Joan Martí",
      text: "Servei excel·lent i enviament ràpid. Els accessoris que vaig comprar són de gran qualitat i durabilitat.",
      pet: "Luna, Border Collie",
    },
    {
      name: "Laura Puig",
      text: "Els productes de cosmètica han millorat molt el pelatge del meu gat. Estic molt contenta amb els resultats!",
      pet: "Miu, Persa",
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

  return (
    <div className="overflow-hidden">
      <Navbar />

      {/* Hero Section con Parallax */}
      <section
        className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/portada.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        ></div>

        <div className="container relative z-10 px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <Badge className="mb-6 bg-white/20 text-white backdrop-blur-sm border-white/10 py-1 px-4 text-sm">
              Centre Veterinari Navarcles
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Benestar per a la teva{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                mascota
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
              A la nostra clínica i botiga veterinària trobaràs tot el que necessita la teva mascota amb cura, amor i
              qualitat per garantir una vida saludable i feliç.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                asChild
              >
                <Link href="/productes">
                  Descobreix els nostres productes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/serveis">Els nostres serveis</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contacte">Contacta'ns</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Animated scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center pt-2"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5], y: [0, 6, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              className="w-1 h-1 rounded-full bg-white"
            />
          </motion.div>
        </div>
      </section>

      {/* Información de contacto rápida */}
      <section className="bg-white py-4 shadow-md sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-600" />
                <a href="tel:938310669" className="text-sm font-medium hover:text-blue-600 transition-colors">
                  938 310 669
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Plaça Ansèlm Clavé, 13, Navarcles</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Dilluns a Divendres: 10:00 - 13:00 / 17:00 - 20:00</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/centre_veterinari_navarcles/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-pink-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios destacados */}
      <section ref={servicesRef} className="py-20 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Els nostres serveis</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Cuidem de la teva mascota</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Oferim una àmplia gamma de serveis veterinaris per garantir la salut i el benestar de la teva mascota
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="h-full overflow-hidden group hover:shadow-lg transition-all duration-300 border-0 bg-white shadow-md">
                  <div className={`h-2 w-full bg-gradient-to-r ${service.color}`}></div>
                  <CardContent className="p-8">
                    <div className="mb-6 p-4 rounded-full bg-gray-50 inline-block">{service.icon}</div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                  </CardContent>
                  <CardFooter className="px-8 pb-8 pt-0">
                    <Button variant="outline" asChild className="group-hover:bg-blue-50 transition-colors">
                      <Link href="/serveis">
                        Més informació
                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link href="/serveis">
                Veure tots els serveis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categorías destacadas */}
      <section id="categories" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Les nostres categories</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tot per a les teves mascotes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descobreix la nostra àmplia selecció de productes de qualitat per a gossos, gats i altres animals de
              companyia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={category.link}>
                  <Card className={`h-full border-2 ${category.color} hover:shadow-lg transition-all duration-300`}>
                    <CardContent className="p-6 text-center">
                      {category.icon}
                      <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                      <p className="text-gray-600">{category.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">El nostre equip</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Professionals que cuiden de la teva mascota
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Coneix les persones que cada dia treballen amb dedicació i professionalitat per garantir el benestar dels
              teus companys de quatre potes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {teamMembers.map((member, index) => (
		  <motion.div
		    key={index}
		    initial={{ opacity: 0, y: 20 }}
		    whileInView={{ opacity: 1, y: 0 }}
		    transition={{ duration: 0.5, delay: index * 0.1 }}
		    viewport={{ once: true }}
		  >
		    <Card className="overflow-hidden h-full">
		      <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center">
			<div className="md:col-span-1 flex justify-center p-4">
			  <img
			    src={member.image || "/placeholder.svg"}
			    alt={member.name}
			    className="w-[300px] h-[300px] object-cover rounded-lg"
			  />
			</div>
			<div className="md:col-span-2 p-6">
			  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
			  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
			  <p className="text-gray-700">{member.description}</p>
			</div>
		      </div>
		    </Card>
		  </motion.div>
		))}

          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/quisom">
                Coneix més sobre nosaltres
                <Users className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sección informativa con imagen */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <Badge className="mb-4">El nostre compromís</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Cuidem de qui més estimes</h2>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                Oferim una selecció de productes pensats per la salut, alimentació i benestar dels teus companys peluts.
                Treballem amb marques reconegudes i els nostres veterinaris seleccionen els millors productes per a cada
                necessitat.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-green-600"
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
                  <span className="text-gray-700">Productes seleccionats per veterinaris professionals</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-green-600"
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
                  <span className="text-gray-700">Marques de qualitat i productes naturals</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-green-600"
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
                  <span className="text-gray-700">Assessorament personalitzat per a cada mascota</span>
                </li>
              </ul>
              <Button asChild>
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
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full z-0"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-green-100 rounded-full z-0"></div>
                <img
		  src="/bb.jpg"
		  alt="Mascotes Feliç"
		  className="rounded-lg shadow-xl w-[600px] h-[600px] object-cover"
		/>

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Horarios y ubicación */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Visita'ns</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Horaris i ubicació</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Troba'ns fàcilment i consulta els nostres horaris d'atenció
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold">Horari d'atenció</h3>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium">Dilluns a Divendres</span>
                      <span>10:00 - 13:00 i 17:00 - 20:00</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium">Dissabte</span>
                      <span>10:00 - 13:00</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium">Diumenge</span>
                      <span>Tancat</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold">Demana cita</h3>
                  </div>

                  <p className="text-gray-600 mb-6">
                    Per a consultes veterinàries o serveis de perruqueria, demana cita prèvia per telèfon o a través del
                    nostre formulari.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Button asChild>
                      <a href="tel:938310669">
                        <Phone className="mr-2 h-4 w-4" />
                        938 310 669
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
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
            >
              <Card className="h-full overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-full min-h-[300px]">
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
                      <h3 className="font-bold text-gray-900 mb-1">Centre Veterinari Navarcles</h3>
                      <p className="text-sm text-gray-600 mb-2">Plaça Ansèlm Clavé núm 13, Navarcles, 08270</p>
                      <Button size="sm" variant="outline" asChild className="w-full">
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Testimonis</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">El que diuen els nostres clients</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descobreix les experiències dels nostres clients i les seves mascotes amb els nostres serveis veterinaris
              i productes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-yellow-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.pet}</p>
                      </div>
                      <PawPrint className="h-6 w-6 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Troba tot el que necessita la teva mascota</h2>
            <p className="text-xl text-white/90 mb-8">
              Visita la nostra clínica i botiga o contacta'ns per a qualsevol consulta. Estem aquí per ajudar-te.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/productes">Comprar ara</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                <Link href="/contacte">Contacta'ns</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Centre Veterinari Navarcles</h3>
              <p className="text-gray-400 mb-4">
                Compromesos amb el benestar i la salut de les teves mascotes des de fa més de 30 anys.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/centre_veterinari_navarcles/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Productes</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/productes?categoria=menjar" className="text-gray-400 hover:text-white transition">
                    Alimentació
                  </Link>
                </li>
                <li>
                  <Link href="/productes?categoria=accessoris" className="text-gray-400 hover:text-white transition">
                    Accessoris
                  </Link>
                </li>
                <li>
                  <Link href="/productes?categoria=cosmetica" className="text-gray-400 hover:text-white transition">
                    Higiene i cura
                  </Link>
                </li>
                <li>
                  <Link href="/productes?animal=gos" className="text-gray-400 hover:text-white transition">
                    Gossos
                  </Link>
                </li>
                <li>
                  <Link href="/productes?animal=gat" className="text-gray-400 hover:text-white transition">
                    Gats
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Informació</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/quisom" className="text-gray-400 hover:text-white transition">
                    Qui som
                  </Link>
                </li>
                <li>
                  <Link href="/serveis" className="text-gray-400 hover:text-white transition">
                    Serveis
                  </Link>
                </li>
                <li>
                  <Link href="/contacte" className="text-gray-400 hover:text-white transition">
                    Contacte
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition">
                    Política de privacitat
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contacte</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  Plaça Ansèlm Clavé núm 13, Navarcles, 08270
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-400" />
                  <a href="tel:938310669" className="hover:text-white transition-colors">
                    938 310 669
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-400" />
                  Dilluns a Divendres: 9:00 - 20:00
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-400" />
                  Dissabte: 10:00 - 13:00
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Centre Veterinari Navarcles · Tots els drets reservats
          </div>
        </div>
      </footer>
    </div>
  )
}


