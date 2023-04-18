"use client";
import { ProductRecord } from "@/lib/xata";
import Stripe from "stripe";

import { useShoppingCart } from "use-shopping-cart";

export default function ProductCard({ product }: { product: ProductRecord }) {
  const { addItem } = useShoppingCart();

  return (
    <section>
      {product.images && product.description && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="w-1/3"
          src={product.images[0]}
          alt={product.description}
        />
      )}
      <h1>{product.name}</h1>
      <p>{product.description}</p>

      <button
        onClick={() =>
          addItem({
            ...product,
            // @ts-ignore
            price: product.default_price,
            currency: "USD",
            sku: "",
          })
        }
      >
        Add To Cart
      </button>
    </section>
  );
}
