import { buffer } from "micro";
import Stripe from "stripe";
import { NextApiResponse, NextApiRequest } from "next";
import { getXataClient } from "../../../lib/xata";

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

export async function POST(req: NextApiRequest,res: NextApiResponse) {
  const buf = await buffer(req);

    const signature = req.headers["stripe-signature"];
    let event: Stripe.Event;

    if (!signature) {
      res.status(400).send("Webhook Error: Missing Stripe-Signature");
      return;
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      throw new Error(
        "The STRIPE_WEBHOOK_SECRET environment variable is missing."
      );
    }

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err: any) {
      console.log(`❌ Error message: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case "product.created":
        await handleProductCreated(event);
        break;
      // Add your handling for other webhook events here
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  }
}

async function handleProductCreated(event: Stripe.Event) {
  const product = event.data.object as Stripe.Product;

  console.log({product})

  const xata = getXataClient();

  try {
    await xata.db.products.create(product);
    console.log(`✅ Created new product with id ${product.id}`);
  } catch (error: any) {
    console.log(`❌ Error creating product: ${error.message}`);
    throw new Error(`Error creating product: ${error.message}`);
  }
}

export const confif = {
  api: {
    bodyParser: false
  }
}
