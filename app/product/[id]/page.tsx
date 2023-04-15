import { getXataClient } from "@/lib/xata";

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
      <section>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>{product.price}</p>
      </section>
    </main>
  );
}
