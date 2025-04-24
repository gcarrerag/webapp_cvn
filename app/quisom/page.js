"use client"

import Navbar from "../../components/Navbar"
import { motion } from "framer-motion"
import { Heart, Calendar, Award, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function QuiSom() {
  const teamMembers = [
    {
      name: "Carla Carrera Gusart",
      role: "Veterinària i propietaria",
      description:
        "Llicenciada en Veterinària per la UAB, especialitzada en medicina interna de petits animals. Continua el llegat del seu pare amb la mateixa passió i dedicació.",
      image: "/carla.jpg",
    },
    {
      name: "Maria Antònia Gusart",
      role: "Auxiliar Veterinària",
      description:
        "Responsable de la botiga i la perruqueria canina. Amb més de 20 anys d'experiència en el sector, ofereix un tracte proper i professional a totes les mascotes.",
      image: "/mama.jpg",
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
          <Badge className="mb-4">La nostra història</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Qui som</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Coneix el nostre centre, la nostra història i l'equip que fa possible cuidar de les teves mascotes cada dia
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Centre Veterinari Navarcles</CardTitle>
                <CardDescription>Una història de dedicació i amor pels animals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p className="leading-relaxed">
                  Fundat l&apos;any <strong>1990</strong> pel veterinari <strong>Josep Maria Carrera</strong>, el nostre
                  centre ha estat des de llavors un referent en la cura de les mascotes a Navarcles i rodalies.
                </p>
                <p className="leading-relaxed">
                  Avui, amb la mateixa passió i dedicació, el centre està dirigit per la seva filla, la veterinària{" "}
                  <strong>Carla Carrera Gusart</strong>, acompanyada de <strong>Maria Antònia Gusart</strong>, auxiliar
                  veterinària i responsable de la botiga i la perruqueria canina.
                </p>
                <p className="leading-relaxed">
                  El nostre equip combina experiència i innovació per garantir el millor servei i atenció personalitzada
                  per a cada mascota.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                    <Calendar className="h-8 w-8 text-blue-600 mb-2" />
                    <h3 className="font-semibold text-gray-900">Des de 1990</h3>
                    <p className="text-sm text-center text-gray-600">Més de 30 anys d'experiència</p>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
                    <Heart className="h-8 w-8 text-green-600 mb-2" />
                    <h3 className="font-semibold text-gray-900">Atenció personalitzada</h3>
                    <p className="text-sm text-center text-gray-600">Cada mascota és única</p>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-amber-50 rounded-lg">
                    <Award className="h-8 w-8 text-amber-600 mb-2" />
                    <h3 className="font-semibold text-gray-900">Professionalitat</h3>
                    <p className="text-sm text-center text-gray-600">Formació contínua</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="h-full bg-blue-600 text-white">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Homenatge a Josep Maria Carrera</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="w-24 h-24 bg-white/20 rounded-full mx-auto flex items-center justify-center mb-4">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <p className="leading-relaxed text-white/90">
                  Volem retre homenatge al nostre fundador, <strong>Josep Maria Carrera</strong>, qui amb la seva
                  vocació, professionalitat i estima pels animals va iniciar aquest projecte que avui continua viu amb
                  la mateixa il·lusió.
                </p>
                <p className="leading-relaxed text-white/90">
                  El seu llegat perdura en cada consulta, en cada tractament i en cada somriure que aconseguim en les
                  mascotes i els seus propietaris.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Separator className="my-16" />

        <section className="mb-16">
          <div className="text-center mb-12">
            <Badge className="mb-4">El nostre equip</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Professionals que cuiden de la teva mascota</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Coneix les persones que cada dia treballen amb dedicació i professionalitat per garantir el benestar dels
              teus companys de quatre potes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="md:col-span-1">
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
        </section>

        <section className="bg-gray-100 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Compromesos amb el benestar animal</h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            A Centre Veterinari Navarcles treballem cada dia per oferir el millor servei i atenció a les teves mascotes.
            La nostra missió és garantir la seva salut i benestar, i ho fem amb la mateixa passió i dedicació des de fa
            més de 30 anys.
          </p>
        </section>
      </main>
    </div>
  )
}

