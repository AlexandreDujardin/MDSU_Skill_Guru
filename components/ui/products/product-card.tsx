'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createCheckoutSession } from "@/app/actions";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  features?: (string | Feature)[];
  default_price: {
    id: string;
    unit_amount: number;
    currency: string;
    recurring?: { interval: "month" | "year" };
  };
}

interface ProductCardProps {
  product: Product;
}

interface Feature {
  name: string;
}


export function ProductCard({ product }: ProductCardProps) {
  const [loading, setLoading] = useState(false);

  const amount = product.default_price.unit_amount
    ? product.default_price.unit_amount / 100
    : 0;
  const currency = product.default_price.currency?.toUpperCase() || "USD";

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      const { url } = await createCheckoutSession(product.default_price.id);
      window.location.href = url;
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card 
      onClick={!loading ? handleSubscribe : undefined}
      className="flex flex-col bg-background-surface cursor-pointer transition-all duration-200 rounded-lg hover:bg-border-hover"  
    >
      <CardHeader>
        <CardDescription className="inline-flex bg-button-primary text-text-alternative rounded-xl px-4 py-1 min-w-fit">{product.description}</CardDescription>
        <CardTitle className="text-text-secondary">{product.name}</CardTitle>
        {/* Display Price (Always Monthly) */}
        <div className="text-2xl font-bold">
          {new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: currency,
          }).format(
            product.default_price.recurring?.interval === "month"
              ? amount // Keep monthly price
              : amount / 12 // Convert yearly to monthly
          )}

          <span className="text-2xl font-normal text-muted-foreground"> /mois</span>
        </div>

        {/* Converted Price (Always Yearly) */}
        <div className="text-sm text-gray-500">
          <span>Soit </span>
          {new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: currency,
          }).format(
            product.default_price.recurring?.interval === "month"
              ? amount * 12 // Convert monthly to yearly
              : amount // Keep yearly price
          )}

          <span> à l'année</span>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        {product.images?.[0] && (
          <div className="aspect-video relative mb-4">
            <img
              src={product.images[0]}
              alt={product.name}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
        )}
        <div className="space-y-2 pt-4 pb-4">
        {product.features?.map((feature, index) => (
          <div key={index} className="inline-flex items-center border border-border-active rounded-2xl px-3 py-1 min-w-fit">
            <CheckIcon className="mr-2 h-4 w-4" />
            <span>{typeof feature === "string" ? feature : feature.name}</span>
          </div>
        ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        {/* Subscribe Button */}
        {/* <Button onClick={handleSubscribe} disabled={loading} className="mt-2">
          {loading ? "Chargement..." : "Souscrire"}
        </Button> */}
      </CardFooter>
    </Card>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
