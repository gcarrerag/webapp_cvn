"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const router = useRouter();
    const [carregant, setCarregant] = useState(true);

    useEffect(() => {
      const comprovarSessio = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push("/login");
        } else {
          setCarregant(false);
        }
      };
      comprovarSessio();
    }, [router]);

    if (carregant) {
      return <div className="text-center p-10">🔒 Comprovant sessió...</div>;
    }

    return <Component {...props} />;
  };
}

