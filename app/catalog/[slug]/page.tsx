import { GameDetail } from "@/components/GameDetail";
import games from "@/public/games.json";
import { Navbar } from '@/components/navbar'

const GameDetailPage = ({ params }: { params: { slug: string } }) => {
  const game = games.find((game) => game.slug === params.slug);

  if (!game) {
    return (
      <div className="text-center mt-10">
        <p className="text-xl text-red-500">Game not found!</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container mx-auto py-10">
        <GameDetail
          title={game.title}
          description={game.description}
          tag={game.tag}
          video={game.video}
        />
      </div>
    </div>
  );
};

export default GameDetailPage;
