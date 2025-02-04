import { GameDetail } from "@/components/GameDetail";
import { PageLayout } from "@/components/PageLayout";
import games from "@/public/games.json";

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
    <PageLayout>
      <GameDetail
          title={game.title}
          description={game.description}
          tag={game.tag}
          video={game.video}
        />
    </PageLayout>
  );
};

export default GameDetailPage;
