import { buffer } from "micro";
import Stripe from "stripe";
import { getXataClient } from "../../../lib/xata";
import { NextRequest, NextResponse } from "next/server";

// @ts-nocheck
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

if (!process.env.STRIPE_SECRET_API_KEY) {
  throw new Error("The STRIPE_SECRET_API_KEY environment variable is missing.");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY, {
  apiVersion: "2022-11-15",
});

export async function POST(req: NextRequest) {
  console.log("Event received");

  NextResponse.json({ received: true });
}

//   const signature = req.headers.get("stripe-signature");
//   let event: Stripe.Event;

//   if (!signature) {
//     console.log("❌ No signature found");

//     return new Response("No signature found", {
//       status: 400,
//     });
//   }

//   if (!process.env.STRIPE_WEBHOOK_SECRET) {
//     throw new Error(
//       "The STRIPE_WEBHOOK_SECRET environment variable is missing."
//     );
//   }

//   try {
//     event = stripe.webhooks.constructEvent(
//       buf.toString(),
//       signature,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err: any) {
//     console.log(`❌ Error message: ${err.message}`);
//     return new Response(`Webhook Error: ${err.message}`, {
//       status: 400,
//     });
//   }

//   switch (event.type) {
//     case "product.created":
//       await handleProductCreated(event);
//       break;
//     // Add your handling for other webhook events here
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   NextResponse.json({ received: true });
// }

// async function handleProductCreated(event: Stripe.Event) {
//   const product = event.data.object as Stripe.Product;

//   console.log({ product });

//   const xata = getXataClient();

//   try {
//     // await xata.db.Product.create(product);
//     console.log(`✅ Created new product with id ${product.id}`);
//   } catch (error: any) {
//     console.log(`❌ Error creating product: ${error.message}`);
//     throw new Error(`Error creating product: ${error.message}`);
//   }
