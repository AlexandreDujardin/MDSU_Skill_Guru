'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

interface OfferCardProps {
  label: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  isBestOffer?: boolean;
}

export function OfferCard({ label, name, price, description, features, isBestOffer }: OfferCardProps) {
  return (
    <Card className={`border border-border-default bg-background-primary shadow-lg p-6 flex flex-col ${isBestOffer ? 'border-primary' : ''}`}>
      {/* Badge en haut */}
      <CardHeader>
        <div className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${isBestOffer ? "bg-primary text-white" : "bg-muted text-text-primary"}`}>
          {label}
        </div>
        <h4 className="text-text-secondary font-semibold mt-2">{name}</h4>
        <CardTitle className="text-text-primary">{price}</CardTitle>
      </CardHeader>

      {/* Contenu de la carte */}
      <CardContent>
        <CardDescription>{description}</CardDescription>
        <ul className="mt-4 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-text-primary">
              <CheckIcon className="mr-2 h-4 w-4 text-primary" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>

      {/* Bouton d'action */}
      <CardFooter className="mt-auto">
        <Button className="w-full bg-primary text-white hover:bg-primary/90">Souscrire</Button>
      </CardFooter>
    </Card>
  );
}
