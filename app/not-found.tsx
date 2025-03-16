"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Rocket404 from "@/components/ui/404"; // 🔥 Importation de l'animation

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center bg-background-primary text-text-primary text-center h-screen space-y-10">
      {/* 🛑 Titre 404 avec le poulpe animé */}
      <h1 className="flex text-9xl font-bold">
        4
        <Rocket404 /> {/* 🔥 Le "0" est remplacé par la fusée */}
        4
      </h1>
      <p className="text-xl mt-2">Oups! La page que vous recherchez n'existe pas.</p>

      {/* 🔄 Boutons pour revenir en arrière ou aller à l'accueil */}
      <div className="mt-6 flex gap-4">
        <Button onClick={() => router.back()} type="secondary">
          Retour
        </Button>
        <Link href="/">
          <Button type="primary">Retour à l'accueil</Button>
        </Link>
      </div>
    </div>
  );
}
