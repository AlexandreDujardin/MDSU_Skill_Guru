"use client";

import { useState, useEffect } from "react";
import { GameCard } from "@/components/ui/games/GameCard";
import { RecommendedGames } from "@/components/ui/games/RecommendedGames";
import { ToggleView } from "@/components/ui/games/ToggleView";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export default function GameCatalog() {
  const [games, setGames] = useState([]);
  const [view, setView] = useState<"list" | "grid">("grid");

  useEffect(() => {
    const fetchGames = async () => {
      const { data, error } = await supabase
        .from("games")
        .select("*")
        .order("title", { ascending: true });

      if (error) {
        console.error("❌ Error fetching games:", error);
      } else {
        setGames(data || []);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="p-6 space-y-6 bg-background-primary">
      {/* 🔥 Section des jeux recommandés */}
      <RecommendedGames />

      <div className="border-border-default border rounded-lg p-6">
        {/* 📌 Section du catalogue complet */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-text-primary">Catalogue de jeux</h2>
          <ToggleView onChange={setView} />
        </div>

        {/* Affichage en liste ou grille */}
        <div className={`mt-6 ${view === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "flex flex-col gap-4"}`}>
          {games.map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              title={game.title}
              description={game.description}
              tags={game.tags || []}
              thumbnail={game.thumbnail}
              slug={game.slug}
              view={view} // 🔥 Ajout de la vue ici
            />
          ))}
        </div>
      </div>
    </div>
  );
}
