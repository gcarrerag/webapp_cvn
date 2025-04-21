"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function withAuth(Component) {
  return function ProtectedRoute(props) {
    const router = useRouter();

    useEffect(() => {
      const sessio = localStorage.getItem("adminLogat");
      if (sessio !== "true") {
        router.push("/login");
      }
    }, [router]);

    return <Component {...props} />;
  };
}
