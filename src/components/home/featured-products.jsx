"use client";

import ProductSlider from "@/components/product/product-slider";
import { transformProduct } from "@/lib/transform/productTransform";
import { getLatestProducts } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products", { cache: "no-store", revalidate: 5000 }); // Always fresh in production
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        const rawProducts = data?.data?.data || data?.data || [];

        const normalized = rawProducts.map(transformProduct);
        setProducts(normalized);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-10">Loading products...</div>;
  if (error) return <div className="text-center py-10 text-red-600 dark:text-red-400">{error}</div>;
  if (!products.length) return <div className="text-center py-10">No products available</div>;

  const featured = products.filter((p) => Number(p.featured) === 1);
  const finalProducts = featured.length > 0 ? featured : getLatestProducts(products, 10);

  return (
    <section className="w-full bg-gray-100 my-6 py-6 dark:bg-gray-900 dark:text-white">
      <div className="relative">
        <div className="absolute top-80 left-0 w-full h-[100px] bg-yellow-400 rounded-xl pointer-events-none" aria-hidden="true" />
        <div className="relative container mx-auto px-4 py-5">
          <ProductSlider products={finalProducts}  />
        </div>
      </div>
    </section>
  );
}