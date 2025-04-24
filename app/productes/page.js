"use client"

import { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import Link from "next/link"
import { Filter, ShoppingBag, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

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
      case "menjar":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
      case "snacks":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100"
      case "cosmetica":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      case "accessoris":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  // Función para obtener el color de badge según el animal
  const getAnimalColor = (animal) => {
    switch (animal) {
      case "gos":
        return "bg-sky-100 text-sky-800 hover:bg-sky-100"
      case "gat":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const FiltreSidebar = ({ className }) => (
    <div className={className}>
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-3">Animal</h3>
          <Select value={filtreAnimal} onValueChange={setFiltreAnimal}>
            <SelectTrigger className="w-full">
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
          <h3 className="text-sm font-medium mb-3">Categoria</h3>
          <Select value={filtreCategoria} onValueChange={setFiltreCategoria}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tots">Totes</SelectItem>
              <SelectItem value="menjar">Menjar</SelectItem>
              <SelectItem value="snacks">Snacks</SelectItem>
              <SelectItem value="cosmetica">Cosmètica</SelectItem>
              <SelectItem value="accessoris">Accessoris</SelectItem>
              <SelectItem value="altres">Altres</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Productes disponibles</h1>
          <p className="text-gray-600">Troba el millor per a la teva mascota</p>
        </header>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filtros para móvil */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden mb-4 flex items-center gap-2">
                <Filter size={16} />
                Filtres
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filtres</SheetTitle>
                <SheetDescription>Filtra els productes segons les teves preferències</SheetDescription>
              </SheetHeader>
              <div className="py-6">
                <FiltreSidebar />
              </div>
            </SheetContent>
          </Sheet>

          {/* Sidebar de filtros para desktop */}
          <aside className="hidden md:block w-full md:w-64 shrink-0">
            <div className="sticky top-20 bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-6">Filtres</h2>
              <FiltreSidebar />
            </div>
          </aside>

          {/* Contenido principal */}
          <main className="flex-1">
            {carregant ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                <p className="text-gray-600">Carregant productes...</p>
              </div>
            ) : productesFiltrats.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border p-10 text-center">
                <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hi ha productes disponibles</h3>
                <p className="text-gray-600">Prova amb uns altres filtres o torna més tard.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {productesFiltrats.map((prod) => (
                  <Card key={prod.id} className="overflow-hidden transition-all duration-200 hover:shadow-md">
                    <Link href={`/productes/${prod.id}`} className="block">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={prod.imatge || "/placeholder.svg"}
                          alt={prod.nom}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    </Link>
                    <CardHeader className="p-4 pb-0">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="secondary" className={getAnimalColor(prod.animal)}>
                          {prod.animal}
                        </Badge>
                        <Badge variant="secondary" className={getCategoryColor(prod.categoria)}>
                          {prod.categoria}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{prod.nom}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <p className="text-sm text-gray-500 line-clamp-2">{prod.descripcio}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex items-center justify-between">
                      <span className="font-bold text-lg">{prod.preu} €</span>
                      <Button asChild size="sm">
                        <Link href={`/productes/${prod.id}`}>Veure detalls</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}









