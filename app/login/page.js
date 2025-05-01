"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"

// 🔥 Carreguem el LoginForm dinàmicament amb "ssr: false" perquè utilitza localStorage i Supabase
const LoginForm = dynamic(() => import("./LoginForm"), { ssr: false })

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-stone-50">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-8 w-8 text-amber-600 animate-spin" />
            <p className="text-stone-600 font-medium">Carregant login...</p>
          </div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  )
}

