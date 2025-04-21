"use client";

import { Suspense } from "react";
import LoginForm from "./LoginForm"; // (ara veuràs avall què és LoginForm)

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Carregant login...</div>}>
      <LoginForm />
    </Suspense>
  );
}
