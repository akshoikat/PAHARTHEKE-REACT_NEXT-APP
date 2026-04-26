import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/api/products";

export default async function ProductDetailsPage({ params }) {
  const { slug } = params;

  let product = null;

  try {
    product = await getProductBySlug(slug);
  } catch (error) {
    notFound();
  }

  if (!product) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">{product.name}</h1>
    </main>
  );
}