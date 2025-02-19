import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface GameDetailProps {
  title: string;
  description: string;
  tag: string;
  video: string;
}

export const GameDetail = ({ title, description, tag, video }: GameDetailProps) => {
  return (
    <Card className="max-w-4xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{description}</p>
        <Badge className="mt-4 bg-green-100 text-green-700">{tag}</Badge>
        {/* Full-Width Video */}
        <div className="mt-6">
          <div className="w-full aspect-video">
            <iframe
              src={video}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-md shadow"
            ></iframe>
          </div>
        </div>
        <a
          href={`/launch/${title.toLowerCase().replace(/\s/g, "-")}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="default" className="w-full mt-6">
            Lancer une session
          </Button>
        </a>
      </CardContent>
    </Card>
  );
};
