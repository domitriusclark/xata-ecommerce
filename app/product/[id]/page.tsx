import ProductCard from "@/app/components/ProductCard";
import { getXataClient } from "@/lib/xata";
import Cart from "@/app/components/Cart";

type PageProps = {
  params: { id: string };
};

export default async function ProductPage({ params }: PageProps) {
  const xata = getXataClient();
  const id = params.id;
  const product = await xata.db.products.read({ id: id as string });

  if (product === null) {
    return;
  }

  if (product.quantity === 0) {
    return (
      <main>
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
          <p>Out of Stock</p>
        </section>
      </main>
    );
  }

  return (
    <main>
      <Cart />
      <ProductCard product={product} />
    </main>
  );
}
