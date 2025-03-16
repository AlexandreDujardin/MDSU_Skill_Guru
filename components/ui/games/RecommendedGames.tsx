"use client";

import { useEffect, useState } from "react";
import { GameCard } from "@/components/ui/games/GameCard";
import { Carousel, CarouselContent,CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const RecommendedGames = () => {
  const [recommendedGames, setRecommendedGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const { data, error } = await supabase
        .from("games")
        .select("*")
        .eq("is_recommended", true)
        .order("title", { ascending: true });

      if (error) {
        console.error("❌ Error fetching recommended games:", error);
      } else {
        setRecommendedGames(data || []);
      }
    };

    fetchGames();
  }, []);

  return (
    <section className="bg-background-surface p-6 rounded-lg border-border-default border">
      <h2 className="text-2xl font-bold text-text-primary">Nos recommandations</h2>
      <p className="text-gray-500 mb-4">
        Nous vous proposons des jeux adaptés à votre profil et vos domaines d’expertise
      </p>

      {recommendedGames.length > 0 ? (
        <div className="relative w-full">
          <Carousel className="relative w-full" opts={{ align: "start", loop: true }}>
            {/* ✅ Carousel Content with Cards */}
            <CarouselContent className="flex gap-4">
              {recommendedGames.map((game) => (
                <CarouselItem key={game.id} className="basis-1/3">
                  <GameCard
                    id={game.id}
                    title={game.title}
                    description={game.description}
                    tags={game.tags || []}
                    thumbnail={game.thumbnail}
                    slug={game.slug}
                    view="grid"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* ✅ Navigation Inside Carousel */}
            <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition" />
            <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition" />
          </Carousel>
        </div>
      ) : (
        <p className="text-gray-500">Aucun jeu recommandé pour l’instant.</p>
      )}
    </section>
  );
};
