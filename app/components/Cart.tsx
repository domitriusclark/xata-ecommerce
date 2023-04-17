"use client";

import { useShoppingCart } from "use-shopping-cart";
import CartItem from "./CartItem";
import CheckoutButton from "./CheckoutButton";

export default function Cart() {
  const { shouldDisplayCart, cartCount, cartDetails } = useShoppingCart();
  console.log(cartDetails);
  return (
    <div className="bg-white flex flex-col p-2 rounded-md mr-3">
      {cartCount && cartCount > 0 ? (
        <>
          {Object.values(cartDetails ?? {}).map((entry) => (
            <CartItem key={entry.id} item={entry} />
          ))}
          <CheckoutButton />
        </>
      ) : (
        <div className="text-black">No Items</div>
      )}
    </div>
  );
}
