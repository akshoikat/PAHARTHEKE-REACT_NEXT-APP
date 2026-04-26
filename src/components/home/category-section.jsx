"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { getCategories } from "@/lib/api/categories";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

function CategoriesSkeleton() {
  return (
    <div className="relative z-20 -mt-16 px-4 pb-10 md:-mt-20">
      <div className="flex gap-4 overflow-hidden">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="min-w-0 flex-[0_0_70%] px-2 sm:flex-[0_0_40%] md:flex-[0_0_25%] lg:flex-[0_0_18%]"
          >
            <Card className="rounded-2xl bg-[#f2f2f2] p-6 shadow-lg">
              <CardContent className="flex flex-col items-center justify-center p-0 text-center">
                <Skeleton className="mb-4 h-16 w-16 rounded-full" />
                <Skeleton className="h-5 w-24" />
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoriesEmptyState() {
  return (
    <div className="relative z-20 -mt-16 px-4 pb-10 md:-mt-20">
      <Card className="rounded-2xl border bg-white">
        <CardContent className="flex flex-col items-center justify-center py-10 text-center">
          <h3 className="text-lg font-semibold text-[#2b2b2b]">
            No categories found
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Categories are not available right now.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function CategoriesErrorState({ message, onRetry }) {
  return (
    <div className="relative z-20 -mt-16 px-4 pb-10 md:-mt-20">
      <Card className="rounded-2xl border bg-white">
        <CardContent className="flex flex-col items-center justify-center py-10 text-center">
          <h3 className="text-lg font-semibold text-red-600">
            Failed to load categories
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {message || "Something went wrong while loading categories."}
          </p>
          <Button onClick={onRetry} className="mt-4">
            Retry
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CategorySection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [emblaRef] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
  });

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const data = await getCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      setCategories([]);
      setErrorMessage(error?.message || "Failed to load categories.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  if (loading) {
    return <CategoriesSkeleton />;
  }

  if (errorMessage) {
    return (
      <CategoriesErrorState
        message={errorMessage}
        onRetry={loadCategories}
      />
    );
  }

  if (!categories.length) {
    return <CategoriesEmptyState />;
  }

  return (
    <div className="relative z-20 -mt-16 px-4 pb-10 md:-mt-20">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {categories.map((category) => (
            <Link
            href={`/category/${category.slug}`}
            key={category.id}
            className="min-w-0 flex-[0_0_70%] px-2 sm:flex-[0_0_40%] md:flex-[0_0_25%] lg:flex-[0_0_18%]"
            >
            <div className="rounded-2xl bg-[#f2f2f2] p-6 text-center shadow-lg transition duration-300 hover:-translate-y-1">
                <div className="mb-4 flex justify-center">
                <img
                    src={category.icon || category.image || "/images/fallback-category.png"}
                    alt={category.name}
                    className="h-16 w-16 object-contain"
                />
                </div>

                <h3 className="text-lg font-semibold text-[#2b2b2b]">
                {category.name}
                </h3>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}