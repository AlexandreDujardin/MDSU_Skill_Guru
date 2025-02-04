'use client';

import { useState, useEffect } from "react";
import { ProductCard } from "./product-card";

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

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/stripe/products"); // Fetch from API route
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        setError("Erreur chargement des produits");
        console.error("Error fetching Stripe products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center">Chargements des produits ...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.length > 0 ? (
        products.map((product) => <ProductCard key={product.id} product={product} />)
      ) : (
        <p className="text-center col-span-full">Aucun produit disponible.</p>
      )}
    </div>
  );
}
