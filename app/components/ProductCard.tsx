"use client";
import type { ProductsRecord } from "@/lib/xata";

import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import Image from "next/image";

export default function ProductCard({ product }: { product: ProductsRecord }) {
  const { addItem } = useShoppingCart();

  const removeDecimal = (num: number) => {
    return num.toString().replace(".", "");
  };

  const cleanObjectForCart = (obj: ProductsRecord) => {
    return {
      id: obj.id,
      name: obj.name,
      description: obj.description,
      price: removeDecimal(obj.price),
      image: obj.image_urls ? obj.image_urls[0] : [],
      currency: "USD",
      sku: "",
    };
  };

  return (
    <section>
      {product.image_urls && product.description && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="w-1/3"
          src={product.image_urls[0]}
          alt={product.description}
        />
      )}
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <button onClick={() => addItem(cleanObjectForCart(product))}>
        Add To Cart
      </button>
    </section>
  );
}
