'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, PlayCircle, PlayIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const tutorials = [
  {
    title: "Créer, modifier, supprimer une classe",
    description: "Apprenez comment créer, modifier ou supprimer vos classes en seulement quelques clics.",
    link: "#",
    image: "https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/gamesthumbnails/beige1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lc3RodW1ibmFpbHMvYmVpZ2UxLnBuZyIsImlhdCI6MTc0MjE0NjE3OSwiZXhwIjoxNzczNjgyMTc5fQ.O2fzulToBlFX4C7BVaJGaRYvPsO2z4esu_NFuT91Vmk",
  },
  {
    title: "Créer, modifier, supprimer une fiche élève",
    description: "Gérez les profils de vos élèves en ajoutant de nouvelles fiches ou en mettant à jour leurs informations.",
    link: "#",
    image: "https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/gamesthumbnails/bleu1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lc3RodW1ibmFpbHMvYmxldTEucG5nIiwiaWF0IjoxNzQyMTQ2MTkwLCJleHAiOjE3NzM2ODIxOTB9.O5KOla2QCsdqUlbmtmYt4lVL9kO415mesuyaV8RDke8",
  },
  {
    title: "Parcourir le catalogue de jeux",
    description: "Découvrez un large choix de jeux pédagogiques adaptés à vos besoins et à ceux de vos élèves.",
    link: "#",
    image: "https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/gamesthumbnails/violet3.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lc3RodW1ibmFpbHMvdmlvbGV0My5wbmciLCJpYXQiOjE3NDIxNDYxNzIsImV4cCI6MTc3MzY4MjE3Mn0._mGnxSLHX4F2k7qI4za-JcTIAbSE1eFJrSQpG_VH4h8",
  },
  {
    title: "Créer une playlist de jeux",
    description: "Sélectionnez et regroupez vos jeux favoris dans une playlist pour structurer vos sessions pédagogiques.",
    link: "#",
    image: "https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/gamesthumbnails/rouge2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lc3RodW1ibmFpbHMvcm91Z2UyLnBuZyIsImlhdCI6MTc0MjE0NjE1MywiZXhwIjoxNzczNjgyMTUzfQ.wa0N78s2IKRl1c9sOHAhAUwz5klvq8Ns0ArUs-8z9Tc",
  },
];

export function TutorialsSection() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-background-surface border border-border-default rounded-lg p-4 shadow-sm">
      {/* 🔹 HEADER avec le titre et le chevron */}
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h2 className="text-2xl font-bold text-text-primary flex flex-row items-center gap-4">
          <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/extras/info.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJleHRyYXMvaW5mby5zdmciLCJpYXQiOjE3NDIxNDU3NzksImV4cCI6MTc3MzY4MTc3OX0.IKgVabKhddb692yN4aD_fi5zJJrAayztZl5T4jYe4h8" alt="" className='h-8'/>
          Tutoriels : Vos premiers pas sur l'interface
        </h2>
        <ChevronDown
          size={20}
          className={`transition-transform ${isOpen ? 'rotate-180' : ''} text-text-tertiary`}
        />
      </div>

      {/* 🔹 DESCRIPTION */}
      {isOpen && (
        <div className="mt-4">
          <p className="text-sm text-text-tertiary">
            Retrouvez l’ensemble des tutoriels dans votre espace Mon Compte.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {tutorials.map((tuto, index) => (
              <Card key={index} className="overflow-hidden p-0 relative">
              <img src={tuto.image} alt={tuto.title} className="w-full h-32 object-cover" />
              <div className="absolute top-22 left-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-white p-1 rounded-full shadow-md">
                <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/icons/icon_play.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpY29ucy9pY29uX3BsYXkuc3ZnIiwiaWF0IjoxNzQyMTQ4NTU1LCJleHAiOjE3NzM2ODQ1NTV9.ethUFceN6wst9SENCwhKfxQcgZoWQfG_nIO-WN3N2k4" alt="" className='h-8'/>
              </div>
              <CardContent className="p-4 flex flex-col justify-stretch items-center h-full mt-3">
                <div className="">
                  <h3 className="text-md font-semibold">{tuto.title}</h3>
                </div>
                <div className="">
                  <p className="text-sm text-text-tertiary mt-1">{tuto.description}</p>
                </div>
                <div className="flex flex-col items-end">
                  <Button variantType="tertiary" className="mt-4 text-primary max-w-fit flex items-center" asChild>
                    <a href={tuto.link}>
                      Lancer le tutoriel
                      <ChevronRight size={16} />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
