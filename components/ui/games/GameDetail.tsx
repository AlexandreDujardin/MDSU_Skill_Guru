"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GameLaunchSheet } from "@/components/ui/games/GameLaunchSheet"; // ⬅️ Importation du component

interface GameDetailProps {
  title: string;
  description: string;
  tags?: string[];
  video: string;
  concept: string;
  objectif: string;
}

export const GameDetail = ({ title, description, tags = [], video, concept, objectif }: GameDetailProps) => {
  const [openSheet, setOpenSheet] = useState(false);

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-text-primary">{title}</h1>
        <div className="flex flex-wrap gap-2">
          {tags.length > 0 ? (
            tags.map((tag, index) => (
              <Badge key={index} className="bg-border-default text-text-tertiary text-sm px-3 py-1 rounded-full gap-2">
                <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/games/tags_dark.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lcy90YWdzX2Rhcmsuc3ZnIiwiaWF0IjoxNzQyMTU5MTc0LCJleHAiOjE3NzM2OTUxNzR9.ejQcJJZcNGEM7_DO6rYIKMdQy12mTPYahasXnGi0TUQ"
                     alt="tags" className="h-4"/>
                {tag}
              </Badge>
            ))
          ) : (
            <p className="text-gray-400 text-sm">Aucun tag disponible</p>
          )}
        </div>
      </div>
      
      <div className="bg-background-surface p-6 rounded-lg shadow-md border border-border-default">
        {/* 🎥 Section Vidéo + Infos Jeu */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* 📺 Vidéo */}
          <div className="w-full h-full aspect-video border-none">
            <iframe
              src={video}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-l-lg"
            ></iframe>
          </div>

          {/* 📜 Infos Jeu */}
          <div className="flex flex-col p-6 space-y-4 bg-background-primary justify-evenly rounded-r-lg border-2 border-border-default">
            <h2 className="text-2xl font-semibold text-text-primary">{title}</h2>
            <p className="text-text-tertiary">{description}</p>
            <div className="text-text-tertiary">
              <p className="font-semibold">Concept du jeu :</p>
              {concept}
            </div>
            <div className="text-text-tertiary">
              <p className="font-semibold">Objectif du jeu :</p> 
              {objectif}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end">
          {/* 🎮 Boutons Actions */}
          <div className="flex gap-4 mt-4">
            <Button variantType="secondary" className="flex items-center gap-2 w-min-content">
              <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/games/settings.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lcy9zZXR0aW5ncy5zdmciLCJpYXQiOjE3NDIxNTkyMzEsImV4cCI6MTc3MzY5NTIzMX0.DkEsv1wZYZZqu4a07A22N7qMNG8PBKAkl5DbvTw-T9s"
                   alt="programmer" className="h-6"/>
              Programmer une session
            </Button>

            <Button
              variantType="primary"
              className="flex items-center gap-2 w-min-content"
              onClick={() => setOpenSheet(true)}
            >
              <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/games/play.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lcy9wbGF5LnN2ZyIsImlhdCI6MTc0MjE1OTIwNywiZXhwIjoxNzczNjk1MjA3fQ.qMdlsQdlma7G_xQRM7nGBrqYUCrc6oQcA_yIG_r_X30"
                   alt="programmer" className="h-6"/>
              Lancer le jeu
            </Button>
          </div>
        </div>
          {/* 📌 Section Règles du Jeu */}
        <div>
          <h3 className="text-2xl font-bold text-text-primary mb-4">Règles du jeu</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 📌 Première colonne */}
            <Card className="p-6 bg-background-primary">
              <h4 className="flex flex-row items-center text-h3-m font-semibold text-text-tertiary mb-4 gap-2">
                <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/games/trainer.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lcy90cmFpbmVyLnN2ZyIsImlhdCI6MTc0MjEwMDgzMSwiZXhwIjoxNzczNjM2ODMxfQ.PuU4wiDbyIIeEawN4-Lrl_5CONZDOf0RkzhbRAQ5A1s" alt="formateur" className="h-8"/>
                Rôle du formateur
              </h4>
              <div className="space-y-4">
                <p className="text-text-tertiary">
                En tant que maître du jeu, vous incarnez le "Saboteur", un rôle clé qui permet d’orchestrer le déroulement de la session. Votre mission est d’encadrer les élèves dans la gestion de leur projet tout en leur imposant des défis sous forme d’événements aléatoires.
                </p>
                <p className="text-text-tertiary">
                Vous êtes également responsable de la validation des objectifs et de l’attribution des points.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-background-primary">
              <h4 className="flex flex-row items-center text-h3-m font-semibold text-text-tertiary mb-4 gap-2">
              <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/games/mecanics.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lcy9tZWNhbmljcy5zdmciLCJpYXQiOjE3NDIxMDA2NzUsImV4cCI6MTc3MzYzNjY3NX0.lnjnFrZYvUPgiu-aAwvc6n4Tuy7bh0qS6xMfJj9rbaw" alt="formateur" className="h-8"/>
                Mécanique de validation
              </h4>
              <ul className="list-disc pl-4 text-gray-600 space-y-2">
                <li>Les élèves soumettent un objectif à validation.</li>
                <li>Vous devez les évaluer et décider d’accorder ou non les points.</li>
                <li>Un objectif non validé s’affiche comme "en attente de validation".</li>
                <li>Une fois validé, les points sont attribués et une notification est envoyée.</li>
              </ul>
            </Card>
            
            <Card className="p-6 bg-background-primary">
              <h4 className="flex flex-row items-center text-h3-m font-semibold text-text-tertiary mb-4 gap-2">
                <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/games/steps.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lcy9zdGVwcy5zdmciLCJpYXQiOjE3NDIxMDA3NzEsImV4cCI6MTc3MzYzNjc3MX0.R6C_auaMgR5sgicxz65a9ZYwpFTCtuvcVlBRSEiCM2Y" alt="formateur" className="h-8"/>
                Déroulement du jeu
              </h4>
              <div className="space-y-4 flex flex-row">
                <div className="text-text-tertiary flex-1 flex-col space-y-4">
                  <p>
                    Le jeu se divise en trois grandes phases :
                  </p>
                  <p>
                    Planification – Les équipes définissent leur stratégie et se répartissent les rôles
                  </p>
                  <p>
                    Exécution – Elles réalisent leurs objectifs tout en gérant les imprévus que vous leur imposez.
                  </p>
                  <p>
                    Rétrospective et livrable – Elles analysent leur progression et finalisent leur projet.
                  </p>
                </div>
                <p className="text-text-tertiary flex-1 flex-col m-0">
                  Chaque phase comporte des objectifs de groupe et individuels que les joueurs doivent atteindre pour accumuler des points. Gestion des objectifs et des points Objectifs de groupe : Chaque équipe a un objectif principal, accompagné de sous-objectifs, définis par le scénario que vous avez choisi. Objectifs individuels : Chaque joueur a un objectif personnel, attribué en fonction de son rôle.
                </p>
              </div>
            </Card>
          </div>
        </div> 
      </div>  
      <GameLaunchSheet open={openSheet} onClose={() => setOpenSheet(false)} />
    </div>
  );
};
