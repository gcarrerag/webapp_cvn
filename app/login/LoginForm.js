"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import Navbar from "../../components/Navbar"
import { createClient } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, Lock, Mail, LogIn } from "lucide-react"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [usuari, setUsuari] = useState("")
  const [clau, setClau] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [checkingSession, setCheckingSession] = useState(true)

  useEffect(() => {
    const comprovarSessio = async () => {
      try {
        setCheckingSession(true)
        const {
          data: { session },
        } = await supabase.auth.getSession()
        if (session) {
          const redirect = searchParams.get("redirect") || "/admin"
          router.push(redirect)
        }
      } catch (error) {
        console.error("Error comprovant sessió:", error)
      } finally {
        setCheckingSession(false)
      }
    }
    comprovarSessio()
  }, [router, searchParams])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: usuari,
        password: clau,
      })

      if (error) {
        setError(error.message || "Usuari o contrasenya incorrectes!")
      } else {
        const redirect = searchParams.get("redirect") || "/admin"
        router.push(redirect)
      }
    } catch (err) {
      setError("Error inesperat. Torna a intentar-ho.")
      console.error("Error d'inici de sessió:", err)
    } finally {
      setLoading(false)
    }
  }

  if (checkingSession) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1 flex items-center justify-center">
              <CardTitle className="text-2xl font-bold text-center">Comprovant sessió</CardTitle>
              <CardDescription className="text-center">Espera un moment, si us plau...</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-t-4 border-t-blue-600">
            <CardHeader className="space-y-1">
              <div className="flex justify-center mb-2">
                <div className="p-3 rounded-full bg-blue-100">
                  <Lock className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center">Inici de sessió</CardTitle>
              <CardDescription className="text-center">
                Introdueix les teves credencials per accedir al panell d'administració
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correu electrònic</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      id="email"
                      type="email"
                      placeholder="exemple@correu.com"
                      value={usuari}
                      onChange={(e) => setUsuari(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Contrasenya</Label>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={clau}
                      onChange={(e) => setClau(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleSubmit} disabled={loading} size="lg">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Iniciant sessió...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" /> Iniciar sessió
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <p className="text-center text-sm text-gray-500 mt-4">
            Accés exclusiu per a administradors del Centre Veterinari Navarcles
          </p>
        </motion.div>
      </main>
    </div>
  )
}


