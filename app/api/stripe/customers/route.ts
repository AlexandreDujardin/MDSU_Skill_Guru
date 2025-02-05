import { stripe } from "@/utils/stripe";

async function getCustomerSubscription(customerId: string) {
  try {
    const customer = await stripe.customers.retrieve(customerId);
    
    // Fetch subscription
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
    });

    return subscriptions.data.length > 0 ? "active" : "inactive";
  } catch (error: any) {
    console.error("Error fetching customer:", error.message);

    // If customer does not exist, return inactive status
    if (error.code === "resource_missing") {
      return "inactive";
    }

    throw error; // Re-throw other errors
  }
}
