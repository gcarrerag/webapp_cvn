"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { ShoppingCart, Menu, X, ChevronDown, Search, Phone } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function Navbar() {
  const [menuObert, setMenuObert] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [productesOpen, setProductesOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()

  // Detectar scroll para cambiar el estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Cargar el número de productos en el carrito
  useEffect(() => {
    const loadCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("carret")) || []
        const count = cart.reduce((total, item) => total + (item.quantitat || 1), 0)
        setCartCount(count)
      } catch (error) {
        console.error("Error loading cart:", error)
        setCartCount(0)
      }
    }

    loadCartCount()
    window.addEventListener("storage", loadCartCount)

    // Actualizar el contador cada vez que se carga la página
    const interval = setInterval(loadCartCount, 2000)

    return () => {
      window.removeEventListener("storage", loadCartCount)
      clearInterval(interval)
    }
  }, [])

  // Cerrar el menú al cambiar de tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuObert(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Función para verificar si un enlace está activo
  const isActive = (path) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <>
      {/* Top bar con información de contacto */}
      <div className="bg-stone-700 text-stone-100 py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4 text-sm">
            <a href="tel:938310669" className="flex items-center gap-1 hover:text-amber-100 transition-colors">
              <Phone size={14} /> 938 310 669
            </a>
            <span className="text-stone-400">|</span>
            <span>Plaça Ansèlm Clavé, 13, Navarcles</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span>Dilluns a Divendres: 10:00 - 13:00 / 17:00 - 20:00 </span>
            <span>Dissabte: 10:00 - 13:00 </span>
            <span className="text-stone-400">|</span>
            <a
              href="https://www.instagram.com/centre_veterinari_navarcles/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-100 transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      <nav
        className={`sticky top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-sm shadow-md py-2" : "bg-stone-50 shadow-md py-3"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-amber-600 flex items-center gap-2">
            <img src="/logo.jpg" alt="Logo" className="w-[40px] h-[40px] rounded-full object-cover" />
            <span className="hidden sm:inline">Centre Veterinari Navarcles</span>
          </Link>

          {/* Botó menú per mòbil */}
          <div className="flex items-center gap-3 md:hidden">
            <button onClick={() => setSearchOpen(!searchOpen)} className="focus:outline-none p-1" aria-label="Cercar">
              <Search size={20} className="text-stone-700" />
            </button>
            <Link href="/carret" className="relative p-1">
              <ShoppingCart size={20} className="text-stone-700" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-amber-600 text-white text-xs">
                  {cartCount}
                </Badge>
              )}
            </Link>
            <button
              onClick={() => setMenuObert(!menuObert)}
              className="focus:outline-none p-1 text-stone-700"
              aria-label={menuObert ? "Tancar menú" : "Obrir menú"}
            >
              {menuObert ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Links para desktop */}
          <div className="hidden md:flex md:items-center md:space-x-1 lg:space-x-3 text-stone-700 font-medium">
            <NavLink href="/" active={isActive("/")}>
              Inici
            </NavLink>
            <NavLink href="/quisom" active={isActive("/quisom")}>
              Qui som
            </NavLink>
            <NavLink href="/serveis" active={isActive("/serveis")}>
              Serveis
            </NavLink>
            <NavLink href="/noticies" active={isActive("/noticies")}>
              Notícies
            </NavLink>

            {/* Dropdown de productos */}
            <div className="relative group">
              <Link
                href="/productes"
                className={`flex items-center gap-1 px-3 py-2 rounded-md hover:bg-stone-100 transition-colors ${
                  isActive("/productes") ? "text-amber-600 font-semibold" : ""
                }`}
                onClick={() => setProductesOpen(!productesOpen)}
                onMouseEnter={() => setProductesOpen(true)}
                onMouseLeave={() => setProductesOpen(false)}
              >
                Productes
                <ChevronDown size={16} className={`transition-transform ${productesOpen ? "rotate-180" : ""}`} />
              </Link>

              <div
                className={`absolute left-0 mt-1 w-48 bg-white shadow-lg rounded-md overflow-hidden transition-all origin-top ${
                  productesOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
                onMouseEnter={() => setProductesOpen(true)}
                onMouseLeave={() => setProductesOpen(false)}
              >
                <Link
                  href="/productes?animal=gos"
                  className="block px-4 py-2 hover:bg-stone-50 text-stone-700 hover:text-amber-600 transition-colors"
                  onClick={() => setProductesOpen(false)}
                >
                  Per a gossos
                </Link>
                <Link
                  href="/productes?animal=gat"
                  className="block px-4 py-2 hover:bg-stone-50 text-stone-700 hover:text-amber-600 transition-colors"
                  onClick={() => setProductesOpen(false)}
                >
                  Per a gats
                </Link>
                <Link
                  href="/productes?categoria=menjar"
                  className="block px-4 py-2 hover:bg-stone-50 text-stone-700 hover:text-amber-600 transition-colors"
                  onClick={() => setProductesOpen(false)}
                >
                  Alimentació
                </Link>
                <Link
                  href="/productes?categoria=accessoris"
                  className="block px-4 py-2 hover:bg-stone-50 text-stone-700 hover:text-amber-600 transition-colors"
                  onClick={() => setProductesOpen(false)}
                >
                  Accessoris
                </Link>
                <Link
                  href="/productes"
                  className="block px-4 py-2 bg-stone-100 text-amber-600 font-medium"
                  onClick={() => setProductesOpen(false)}
                >
                  Tots els productes
                </Link>
              </div>
            </div>

            <NavLink href="/contacte" active={isActive("/contacte")}>
              Contacte
            </NavLink>

            <div className="flex items-center ml-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-700"
                aria-label="Cercar"
              >
                <Search size={18} />
              </button>
              <Link href="/carret" className="relative p-2 hover:bg-stone-100 rounded-full transition-colors ml-1 text-stone-700">
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-amber-600 text-white text-xs">
                    {cartCount}
                  </Badge>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Barra de búsqueda */}
        <div
          className={`border-t border-stone-200 overflow-hidden transition-all duration-300 ${
            searchOpen ? "max-h-16" : "max-h-0"
          }`}
        >
          <div className="container mx-auto px-4 py-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Cerca productes..."
                className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
            </div>
          </div>
        </div>

        {/* Menú móvil */}
        <div
          className={`md:hidden absolute w-full bg-white shadow-md transition-all duration-300 overflow-hidden ${
            menuObert ? "max-h-[500px] border-t" : "max-h-0"
          }`}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <MobileNavLink href="/" active={isActive("/")} onClick={() => setMenuObert(false)}>
              Inici
            </MobileNavLink>
            <MobileNavLink href="/quisom" active={isActive("/quisom")} onClick={() => setMenuObert(false)}>
              Qui som
            </MobileNavLink>
            <MobileNavLink href="/serveis" active={isActive("/serveis")} onClick={() => setMenuObert(false)}>
              Serveis
            </MobileNavLink>
            <MobileNavLink href="/noticies" active={isActive("/noticies")} onClick={() => setMenuObert(false)}>
              Notícies
            </MobileNavLink>

            <div className="py-2 border-b border-stone-100">
              <div
                className={`flex justify-between items-center ${isActive("/productes") ? "text-amber-600 font-semibold" : ""}`}
                onClick={() => setProductesOpen(!productesOpen)}
              >
                <span>Productes</span>
                <ChevronDown size={16} className={`transition-transform ${productesOpen ? "rotate-180" : ""}`} />
              </div>

              <div
                className={`pl-4 mt-2 space-y-2 overflow-hidden transition-all ${productesOpen ? "max-h-48" : "max-h-0"}`}
              >
                <Link
                  href="/productes?animal=gos"
                  className="block py-1 text-stone-600 hover:text-amber-600"
                  onClick={() => setMenuObert(false)}
                >
                  Per a gossos
                </Link>
                <Link
                  href="/productes?animal=gat"
                  className="block py-1 text-stone-600 hover:text-amber-600"
                  onClick={() => setMenuObert(false)}
                >
                  Per a gats
                </Link>
                <Link
                  href="/productes?categoria=menjar"
                  className="block py-1 text-stone-600 hover:text-amber-600"
                  onClick={() => setMenuObert(false)}
                >
                  Alimentació
                </Link>
                <Link
                  href="/productes?categoria=accessoris"
                  className="block py-1 text-stone-600 hover:text-amber-600"
                  onClick={() => setMenuObert(false)}
                >
                  Accessoris
                </Link>
                <Link
                  href="/productes"
                  className="block py-1 text-amber-600 font-medium"
                  onClick={() => setMenuObert(false)}
                >
                  Tots els productes
                </Link>
              </div>
            </div>

            <MobileNavLink href="/contacte" active={isActive("/contacte")} onClick={() => setMenuObert(false)}>
              Contacte
            </MobileNavLink>
            <MobileNavLink href="/carret" active={isActive("/carret")} onClick={() => setMenuObert(false)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart size={18} /> Carret
                </div>
                {cartCount > 0 && <Badge className="bg-amber-600 text-white">{cartCount}</Badge>}
              </div>
            </MobileNavLink>

            {/* Información de contacto en móvil */}
            <div className="mt-4 pt-4 border-t border-stone-200">
              <div className="flex items-center gap-2 text-sm text-stone-600 mb-2">
                <Phone size={14} className="text-amber-600" />
                <a href="tel:938310669" className="hover:text-amber-600">
                  938 310 669
                </a>
              </div>
              <p className="text-sm text-stone-600">Plaça Ansèlm Clavé, 13, Navarcles</p>
              <p className="text-sm text-stone-600 mt-1">Dilluns a Divendres: 10:00 - 13:00 / 17:00 - 20:00</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

// Componente para enlaces de navegación en desktop
function NavLink({ href, active, children }) {
  return (
    <Link
      href={href}
      className={`relative px-3 py-2 rounded-md hover:bg-stone-100 transition-colors ${
        active ? "text-amber-600 font-semibold" : "text-stone-700"
      }`}
    >
      {children}
      {active && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-600 rounded-full"></span>}
    </Link>
  )
}

// Componente para enlaces de navegación en móvil
function MobileNavLink({ href, active, onClick, children }) {
  return (
    <Link
      href={href}
      className={`py-2 border-b border-stone-100 ${active ? "text-amber-600 font-semibold" : "text-stone-700"}`}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
