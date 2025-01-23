import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface GameCardProps {
  title: string;
  description: string;
  tag: string;
  thumbnail: string;
  slug: string;
}

export const GameCard = ({ title, description, tag, thumbnail, slug }: GameCardProps) => {
  // Function to truncate the description
  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow">
      <img src={thumbnail} alt={title} className="w-full h-40 object-cover rounded-t-lg" />
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {/* Truncated description */}
        <CardDescription className="text-sm text-muted-foreground">
          {truncateText(description, 100)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Badge className="bg-blue-100 text-blue-700">{tag}</Badge>
      </CardContent>
      <CardFooter>
        <Link href={`/catalog/${slug}`}>
          <Button variant="outline" className="w-full">
            Voir plus
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
