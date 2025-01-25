import { GameCard } from "@/components/GameCard";
import games from "@/public/games.json";

const CatalogPage = () => {
  return (
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold mb-8">Gurulogue</h1>
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
      </div>
  );
};

export default CatalogPage;

