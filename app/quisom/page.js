"use client"

import Navbar from "../../components/Navbar"
import { motion } from "framer-motion"
import {
  Heart,
  Calendar,
  Award,
  PawPrint,
  Star,
  Clock,
  MapPin,
  Sparkles,
  Leaf,
  Shield,
  Phone,
  Mail,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function QuiSom() {
  const teamMembers = [
    {
      name: "Carla Carrera Gusart",
      role: "Veterinària i propietaria",
      description:
        "Llicenciada en Veterinària per la UAB, especialitzada en medicina interna de petits animals. Continua el llegat del seu pare amb la mateixa passió i dedicació.",
      image: "/carla.jpg",
      specialties: ["Medicina interna", "Cirurgia", "Dermatologia"],
    },
    {
      name: "Maria Antònia Gusart",
      role: "Auxiliar Veterinària",
      description:
        "Responsable de la botiga i la perruqueria canina. Amb més de 20 anys d'experiència en el sector, ofereix un tracte proper i professional a totes les mascotes.",
      image: "/mama.jpg",
      specialties: ["Perruqueria canina", "Nutrició animal", "Atenció al client"],
    },
  ]

  const values = [
    {
      icon: <Heart className="h-8 w-8 text-amber-600" />,
      title: "Passió pels animals",
      description: "Estimem el que fem i ho demostrem en cada consulta i tractament.",
    },
    {
      icon: <Shield className="h-8 w-8 text-amber-700" />,
      title: "Professionalitat",
      description: "Formació contínua i actualització constant en les últimes tècniques veterinàries.",
    },
    {
      icon: <Leaf className="h-8 w-8 text-amber-600" />,
      title: "Sostenibilitat",
      description: "Compromesos amb el medi ambient i el benestar animal en totes les nostres pràctiques.",
    },
    {
      icon: <Sparkles className="h-8 w-8 text-amber-700" />,
      title: "Qualitat",
      description: "Seleccionem els millors productes i oferim serveis d'alta qualitat.",
    },
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
          <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-300">La nostra història</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-stone-800 mb-6">Qui som</h1>
          <p className="text-stone-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Coneix el nostre centre, la nostra història i l'equip que fa possible cuidar de les teves mascotes cada dia
            amb passió i professionalitat
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

      {/* Historia Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-300">Des de 1990</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-6">La nostra història</h2>
              <div className="space-y-4 text-stone-700">
                <p className="leading-relaxed text-lg">
                  Fundat l&apos;any <span className="font-semibold text-amber-800">1990</span> pel veterinari{" "}
                  <span className="font-semibold text-amber-800">Josep Maria Carrera</span>, el nostre centre ha estat
                  des de llavors un referent en la cura de les mascotes a Navarcles i rodalies.
                </p>
                <p className="leading-relaxed text-lg">
                  Avui, amb la mateixa passió i dedicació, el centre està dirigit per la seva filla, la veterinària{" "}
                  <span className="font-semibold text-amber-800">Carla Carrera Gusart</span>, acompanyada de{" "}
                  <span className="font-semibold text-amber-800">Maria Antònia Gusart</span>, auxiliar veterinària i
                  responsable de la botiga i la perruqueria canina.
                </p>
                <p className="leading-relaxed text-lg">
                  El nostre equip combina experiència i innovació per garantir el millor servei i atenció personalitzada
                  per a cada mascota, mantenint viu l'esperit i la vocació amb què es va fundar el centre.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <motion.div
                  className="flex flex-col items-center p-5 bg-amber-50 rounded-lg border border-amber-100 shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Calendar className="h-10 w-10 text-amber-600 mb-3" />
                  <h3 className="font-semibold text-stone-800 text-lg">+30 anys</h3>
                  <p className="text-sm text-center text-stone-600">D'experiència i dedicació</p>
                </motion.div>
                <motion.div
                  className="flex flex-col items-center p-5 bg-amber-50 rounded-lg border border-amber-100 shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Heart className="h-10 w-10 text-amber-600 mb-3" />
                  <h3 className="font-semibold text-stone-800 text-lg">Atenció personal</h3>
                  <p className="text-sm text-center text-stone-600">Cada mascota és única</p>
                </motion.div>
                <motion.div
                  className="flex flex-col items-center p-5 bg-amber-50 rounded-lg border border-amber-100 shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Award className="h-10 w-10 text-amber-600 mb-3" />
                  <h3 className="font-semibold text-stone-800 text-lg">Professionalitat</h3>
                  <p className="text-sm text-center text-stone-600">Formació contínua</p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-amber-200 rounded-full z-0 opacity-70"></div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-amber-100 rounded-full z-0 opacity-70"></div>
              <motion.div
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <img
                  src="/vetanime.jpg"
                  alt="Centre Veterinari Navarcles"
                  className="rounded-lg shadow-xl border-4 border-white object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-300">Els nostres valors</Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-stone-800 mb-4">El que ens defineix</h2>
              <p className="text-stone-600 max-w-2xl mx-auto text-lg">
                Els nostres valors són el reflex de la nostra filosofia i la manera com entenem la veterinària i la cura
                dels animals
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold text-stone-800 mb-2">{value.title}</h3>
                    <p className="text-stone-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <Card className="overflow-hidden h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-3 items-center">
                    <div className="md:col-span-1 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-200/40 to-amber-600/40 z-0"></div>
                      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="relative z-10">
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-[300px] object-cover"
                        />
                      </motion.div>
                    </div>
                    <div className="md:col-span-2 p-8 bg-white">
                      <h3 className="text-2xl font-bold text-stone-800 mb-2">{member.name}</h3>
                      <p className="text-amber-700 font-medium mb-4 text-lg">{member.role}</p>
                      <p className="text-stone-600 text-lg leading-relaxed mb-4">{member.description}</p>

                      <div className="mt-4">
                        <h4 className="font-medium text-stone-800 mb-2">Especialitats:</h4>
                        <div className="flex flex-wrap gap-2">
                          {member.specialties.map((specialty, i) => (
                            <Badge key={i} className="bg-amber-100 text-amber-800 border-amber-300">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
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
                      "El Centre Veterinari Navarcles és molt més que una clínica veterinària. És un lloc on les nostres
                      mascotes són tractades amb amor i professionalitat. Després de tants anys, continuen oferint un
                      servei excepcional."
                    </blockquote>
                    <div className="flex items-center">
                      <div>
                        <p className="font-semibold text-lg">Família Martínez</p>
                        <p className="text-amber-200">Clients des de 1995</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Card className="h-full border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-stone-800">Visita'ns</CardTitle>
                  <CardDescription>T'esperem al nostre centre</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-amber-100 rounded-full mt-1">
                        <MapPin className="h-5 w-5 text-amber-700" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-stone-800 mb-1">Adreça</h3>
                        <p className="text-stone-600">Plaça Ansèlm Clavé núm 13, Navarcles, 08270</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-amber-100 rounded-full mt-1">
                        <Clock className="h-5 w-5 text-amber-700" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-stone-800 mb-1">Horari</h3>
                        <p className="text-stone-600">Dilluns a Divendres: 10:00 - 13:00 / 17:00 - 20:00</p>
                        <p className="text-stone-600">Dissabte: 10:00 - 13:00</p>
                      </div>
                    </div>
                  </div>

                  <div className="relative h-64 w-full rounded-lg overflow-hidden mt-4">
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
              <Card className="h-full border-0 shadow-lg bg-amber-50">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-stone-800">Contacta'ns</CardTitle>
                  <CardDescription>Estem aquí per ajudar-te</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-stone-600">
                    Si tens qualsevol dubte o vols demanar cita, no dubtis en contactar-nos. Estarem encantats
                    d'atendre't.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                      <Phone className="h-5 w-5 text-amber-600" />
                      <div>
                        <p className="font-medium text-stone-800">938 310 669</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                      <Mail className="h-5 w-5 text-amber-600" />
                      <div>
                        <p className="font-medium text-stone-800">info@centreveterinarinavarcles.com</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white transition-all duration-300 shadow-lg hover:shadow-amber-700/20"
                    asChild
                  >
                    <Link href="/contacte">Contacta'ns</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-700 to-stone-800 text-white relative overflow-hidden">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Compromesos amb el benestar animal</h2>
            <p className="text-xl text-amber-100 mb-8">
              A Centre Veterinari Navarcles treballem cada dia per oferir el millor servei i atenció a les teves
              mascotes. La nostra missió és garantir la seva salut i benestar, i ho fem amb la mateixa passió i
              dedicació des de fa més de 30 anys.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="bg-white text-amber-800 hover:bg-amber-100 transition-all duration-300 shadow-lg hover:shadow-white/20 hover:scale-105"
              >
                <Link href="/serveis">Els nostres serveis</Link>
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
    </div>
  )
}

