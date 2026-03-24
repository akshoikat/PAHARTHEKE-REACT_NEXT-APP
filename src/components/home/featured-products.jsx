import { products } from "@/lib/data"
import ProductSlider from "@/components/product/product-slider"

export default function FeaturedProducts() {
  const featured = products.filter((product) => product.featured)

  return (
    <section className="w-full bg-gray-100 my-6 py-6 dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-5">
        <ProductSlider products={featured} />
        <ProductSlider products={featured} />
      </div>
    </section>
  )
}