"use client";
import * as React from "react";
import { CartProvider } from "use-shopping-cart";

export default function ShoppingCartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error(
      "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined in your environment variables"
    );
  }

  return (
    <CartProvider
      mode="payment"
      cartMode="client-only"
      // Redirected here after successful payments (url stored in .env.local file)
      successUrl="http://localhost:3000/success"
      // Redirected here when you click back on Stripe Checkout (url stored in .env.local file)
      cancelUrl="http://localhost:3000/success=false"
      stripe={`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`}
      currency="USD"
      shouldPersist={true}
    >
      {children}
    </CartProvider>
  );
}
