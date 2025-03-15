import { NextResponse } from "next/server";
import { stripe } from "@/utils/stripe"; // Import the existing Stripe instance

export async function GET() {
  try {
    console.log("Fetching products from Stripe...");

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("⚠️ Stripe secret key is missing!");
      return NextResponse.json({ error: "Missing Stripe secret key" }, { status: 500 });
    }

    // Fetch all active products from Stripe, including their prices
    const products = await stripe.products.list({
      expand: ["data.default_price"],
    });

    const activeProducts = products.data.filter((product) => product.active && !product.metadata.archived);

    return NextResponse.json(activeProducts);
  } catch (error) {
    console.error("Error fetching Stripe products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
