"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

// 🔥 Carreguem el LoginForm dinàmicament amb "ssr: false" perquè utilitza localStorage i Supabase
const LoginForm = dynamic(() => import("./LoginForm"), { ssr: false });

export default function LoginPage() {
  return (
    <Suspense fallback={<div>🔒 Carregant login...</div>}>
      <LoginForm />
    </Suspense>
  );
}

