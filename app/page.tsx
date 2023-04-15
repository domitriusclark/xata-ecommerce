import Image from "next/image";
import Link from "next/link";
import { getXataClient, Products } from "@/lib/xata";

export default async function Home() {
  const xata = getXataClient();
  const products = await xata.db.products.getAll();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {products.map((product) => (
        <section
          key={product.id}
          className="flex flex-col items-center justify-center"
        >
          <h1 className="text-5xl font-bold">{product.name}</h1>
          <p className="text-2xl">{product.description}</p>
          <p className="text-2xl">{product.price}</p>
          <Link className="text-2xl" href={`/product/${product.id}`}>
            View Product
          </Link>
        </section>
      ))}
    </main>
  );
}
