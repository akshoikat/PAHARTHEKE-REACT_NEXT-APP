"use client";

import ProductSlider from "@/components/product/product-slider";
import { transformProduct } from "@/lib/transform/productTransform";
import { getLatestProducts } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then(async (res) => {
        const text = await res.text();

        try {
          const data = JSON.parse(text);

          // Raw API response
          const raw = data?.data?.data || data?.data || [];
          console.log("Raw API data:", raw);

          // Transform products
          const normalized = raw.map(transformProduct);
          console.log("Normalized products:", normalized);

          setProducts(normalized);
        } catch (err) {
          console.error("Not JSON:", text);
        } finally {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading products...</div>;
  }

  if (!products.length) {
    return <div className="text-center py-10">No products found</div>;
  }
console.log("All products featured values:", products.map(p => p.featured));
  // Filter featured products (safe with 1, "1", true)
  const featured = products.filter((p) => Number(p.featured) === 1);
  console.log("Featured products:", featured);

  // Fallback to latest products if no featured
  const finalProducts =
    featured.length > 0 ? featured : getLatestProducts(products, 10);

  return (
    <section className="w-full bg-gray-100 my-6 py-6 dark:bg-gray-900 dark:text-white">
      <div className="relative">
        <div className="absolute top-40 left-0 w-full h-[100px] bg-yellow-400 rounded-xl" />
        <div className="relative container mx-auto px-4 py-5">
          <ProductSlider products={finalProducts} />
        </div>
      </div>
    </section>
  );
}