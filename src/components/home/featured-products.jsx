"use client";

import ProductSlider from "@/components/product/product-slider";
import { transformProduct } from "@/lib/transform/productTransform";
import { getLatestProducts } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

  const fetchProducts = async () => {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort(); 
    }, 30000);

    try {
      const res = await fetch("/api/products", {
        signal: controller.signal,
      });

      const data = await res.json();

      const raw = data?.data?.data || data?.data || [];
      const normalized = raw.map(transformProduct);

      if (isMounted) {
        setProducts(normalized);
      }
    } catch (err) {
      if (err.name === "AbortError") {
        console.error("Request timeout (30s)");
      } else {
        console.error("Product fetch error:", err);
      }
    } finally {
      clearTimeout(timeout); // ✅ cleanup
      if (isMounted) {
        setLoading(false);
      }
    }
  };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading products...
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-10">
        No products found
      </div>
    );
  }

  const featured = products.filter((p) => Number(p.featured) === 1);

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