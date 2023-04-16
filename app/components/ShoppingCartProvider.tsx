"use client";
import * as React from "react";
import { CartProvider } from "use-shopping-cart";

export default function ShoppingCartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider
      mode="payment"
      cartMode="checkout-session"
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      currency="USD"
    >
      {children}
    </CartProvider>
  );
}
