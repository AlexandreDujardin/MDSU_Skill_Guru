import { GameCard } from "@/components/GameCard";
import { PageLayout } from "@/components/PageLayout";
import games from "@/public/games.json";

const CatalogPage = () => {
  return (
    <PageLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {games.map((game) => (
            <GameCard
              key={game.slug}
              title={game.title}
              description={game.description}
              tag={game.tag}
              thumbnail={game.thumbnail}
              slug={game.slug}
            />
          ))}
        </div>
    </PageLayout>
      
  );
};

export default CatalogPage;

