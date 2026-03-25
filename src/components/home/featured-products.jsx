import { products } from "@/lib/data"
import ProductSlider from "@/components/product/product-slider"

export default function FeaturedProducts() {
  const featured = products.filter((product) => product.featured)

  return (
    <>
<section className="w-full bg-gray-100 my-6 py-6 dark:bg-gray-900 dark:text-white">
  <div className="relative">
    
    {/* Yellow Background (fixed height) */}
    <div className="absolute top-63 left-0 w-full h-[100px] bg-yellow-400 rounded-xl" />

    {/* Content */}
    <div className="relative container mx-auto px-4 py-5">
      <ProductSlider products={featured} />
    </div>

  </div>
</section>
<section className="w-full bg-gray-100 my-6 py-6 dark:bg-gray-900 dark:text-white">
  <div className="relative">
    
    {/* Yellow Background (fixed height) */}
    <div className="absolute top-63 left-0 w-full h-[100px] bg-yellow-400 rounded-xl" />

    {/* Content */}
    <div className="relative container mx-auto px-4 py-5">
      <ProductSlider products={featured} />
    </div>

  </div>
</section>
    
    </>
  )
}