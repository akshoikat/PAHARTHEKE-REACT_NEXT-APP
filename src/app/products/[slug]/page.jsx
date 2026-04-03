import { notFound } from "next/navigation"
import Header from "@/components/common/header"
import ProductDetailsView from "@/components/product/product-details-view"
import { getProducts } from "@/lib/data"

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params

  const products = await getProducts();
  const product = products.find((item) => item.slug === slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = products.filter(
    (item) => item.category === product.category && item.id !== product.id
  )

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-10">
        <ProductDetailsView
          product={product}
          relatedProducts={relatedProducts}
        />
      </main>
    </>
  )
}