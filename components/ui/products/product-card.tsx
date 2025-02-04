'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "@/app/actions";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  features?: string[];
  default_price: {
    id: string;
    unit_amount: number;
    currency: string;
  };
}

interface ProductCardProps {
  product: Product;
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
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
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
        <div className="space-y-2">
        {product.features?.map((feature, index) => (
          <div key={index} className="flex items-center">
            <CheckIcon className="mr-2 h-4 w-4" />
            <span>{typeof feature === "string" ? feature : feature.name}</span>
          </div>
        ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        {/* Real Price */}
        <div className="text-2xl font-bold">
          {new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: currency,
          }).format(amount)}

          <span className="text-sm font-normal text-muted-foreground">
            {product.default_price.recurring?.interval === "month" ? "/mois" : "/an"}
          </span>
        </div>

        {/* Converted Price (below) */}
        <div className="text-sm text-gray-500">
          {new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: currency,
          }).format(
            product.default_price.recurring?.interval === "month"
              ? amount * 12 // Convert monthly to yearly
              : amount / 12 // Convert yearly to monthly
          )}
          
          <span>
            {product.default_price.recurring?.interval === "month" ? " /an" : " /mois"}
          </span>
        </div>

        {/* Subscribe Button */}
        <Button onClick={handleSubscribe} disabled={loading} className="mt-2">
          {loading ? "Chargement..." : "Souscrire"}
        </Button>
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
