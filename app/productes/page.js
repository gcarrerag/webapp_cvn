"use client"

import { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import Link from "next/link"
import { Filter, Loader2, PawPrint, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { motion } from "framer-motion"

export default function Productes() {
  const [productes, setProductes] = useState([])
  const [filtreAnimal, setFiltreAnimal] = useState("tots")
  const [filtreCategoria, setFiltreCategoria] = useState("tots")
  const [carregant, setCarregant] = useState(true)

  useEffect(() => {
    const carregar = async () => {
      try {
        const res = await fetch("/api/productes")
        const dades = await res.json()

        if (Array.isArray(dades)) {
          setProductes(dades)
        } else {
          console.error("Resposta inesperada de /api/productes:", dades)
          setProductes([])
        }
      } catch (error) {
        console.error("Error carregant productes:", error)
        setProductes([])
      } finally {
        setCarregant(false)
      }
    }
    carregar()
  }, [])

  const productesFiltrats = productes.filter((prod) => {
    const compleixAnimal = filtreAnimal === "tots" || prod.animal === filtreAnimal
    const compleixCategoria = filtreCategoria === "tots" || prod.categoria === filtreCategoria
    return compleixAnimal && compleixCategoria
  })

  // Función para obtener el color de badge según la categoría
  const getCategoryColor = (categoria) => {
    switch (categoria) {
      case "alimentacio":
        return "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100"
      case "snacks":
        return "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100"
      case "higiene":
        return "bg-stone-100 text-stone-800 border-stone-200 hover:bg-stone-100"
      case "accessoris":
        return "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100"
      default:
        return "bg-stone-100 text-stone-800 border-stone-200 hover:bg-stone-100"
    }
  }

  // Función para obtener el color de badge según el animal
  const getAnimalColor = (animal) => {
    switch (animal) {
      case "gos":
        return "bg-stone-100 text-stone-800 border-stone-200 hover:bg-stone-100"
      case "gat":
        return "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100"
      default:
        return "bg-stone-100 text-stone-800 border-stone-200 hover:bg-stone-100"
    }
  }

  const FiltreSidebar = ({ className }) => (
    <div className={className}>
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-3 text-stone-800">Animal</h3>
          <Select value={filtreAnimal} onValueChange={setFiltreAnimal}>
            <SelectTrigger className="w-full border-amber-200 focus:ring-amber-500">
              <SelectValue placeholder="Selecciona animal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tots">Tots</SelectItem>
              <SelectItem value="gos">Gos</SelectItem>
              <SelectItem value="gat">Gat</SelectItem>
              <SelectItem value="altres">Altres</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3 text-stone-800">Categoria</h3>
          <Select value={filtreCategoria} onValueChange={setFiltreCategoria}>
            <SelectTrigger className="w-full border-amber-200 focus:ring-amber-500">
              <SelectValue placeholder="Selecciona categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tots">Totes</SelectItem>
              <SelectItem value="alimentacio">Alimentació</SelectItem>
              <SelectItem value="snacks">Snacks</SelectItem>
              <SelectItem value="higiene">Higiene</SelectItem>
              <SelectItem value="accessoris">Accessoris i joguines</SelectItem>
              <SelectItem value="altres">Altres</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )

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
          <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-300">Botiga</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-stone-800 mb-6">Els nostres productes</h1>
          <p className="text-stone-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Descobreix la nostra selecció de productes de qualitat per a les teves mascotes, seleccionats pels nostres
            veterinaris
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
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filtros para móvil */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="md:hidden mb-4 flex items-center gap-2 border-amber-300 text-amber-700 hover:bg-amber-50"
              >
                <Filter size={16} />
                Filtres
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="border-r-amber-200">
              <SheetHeader>
                <SheetTitle className="text-stone-800">Filtres</SheetTitle>
                <SheetDescription className="text-stone-600">
                  Filtra els productes segons les teves preferències
                </SheetDescription>
              </SheetHeader>
              <div className="py-6">
                <FiltreSidebar />
              </div>
            </SheetContent>
          </Sheet>

          {/* Sidebar de filtros para desktop */}
          <aside className="hidden md:block w-full md:w-64 shrink-0">
            <div className="sticky top-20 bg-white p-6 rounded-lg shadow-sm border border-amber-100">
              <h2 className="text-xl font-semibold mb-6 text-stone-800">Filtres</h2>
              <FiltreSidebar />
            </div>
          </aside>

          {/* Contenido principal */}
          <main className="flex-1">
            {carregant ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-10 w-10 text-amber-600 animate-spin mb-4" />
                <p className="text-stone-600">Carregant productes...</p>
              </div>
            ) : productesFiltrats.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-sm border border-amber-100 p-10 text-center"
              >
                <div className="w-20 h-20 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-10 w-10 text-amber-600" />
                </div>
                <h3 className="text-xl font-medium text-stone-800 mb-2">No hi ha productes disponibles</h3>
                <p className="text-stone-600 mb-6">Prova amb uns altres filtres o torna més tard.</p>
                <Button
                  onClick={() => {
                    setFiltreAnimal("tots")
                    setFiltreCategoria("tots")
                  }}
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                >
                  Veure tots els productes
                </Button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {productesFiltrats.map((prod, index) => (
                  <motion.div
                    key={prod.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full flex flex-col overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 group">
                      <Link href={`/productes/${prod.id}`} className="block relative">
                        <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                          {prod.animal && (
                            <Badge variant="secondary" className={getAnimalColor(prod.animal)}>
                              {prod.animal}
                            </Badge>
                          )}
                        </div>
                        <div className="aspect-square overflow-hidden bg-stone-100">
                          <img
                            src={prod.imatge || "/placeholder.svg?height=300&width=300&query=pet product"}
                            alt={prod.nom}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </Link>
                      <CardHeader className="p-4 pb-0">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="secondary" className={getCategoryColor(prod.categoria)}>
                            {prod.categoria}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg text-stone-800">{prod.nom}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-2 flex-grow">
                        <p className="text-sm text-stone-600 line-clamp-2">{prod.descripcio}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex items-center justify-between">
                        <span className="font-bold text-lg text-amber-700">{prod.preu} €</span>
                        <Button asChild size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                          <Link href={`/productes/${prod.id}`}>Veure detalls</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-700 to-stone-800 text-white relative overflow-hidden mt-12">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">No trobes el que busques?</h2>
            <p className="text-xl text-amber-100 mb-8">
              Si necessites un producte específic per a la teva mascota, contacta amb nosaltres i t'ajudarem a
              trobar-lo.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="bg-white text-amber-800 hover:bg-amber-100 transition-all duration-300 shadow-lg hover:shadow-white/20 hover:scale-105"
              >
                <Link href="/contacte">Contacta'ns</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-white/10 hover:scale-105"
                asChild
              >
                <Link href="/serveis">Veure serveis</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

