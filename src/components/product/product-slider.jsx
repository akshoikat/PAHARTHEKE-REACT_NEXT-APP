"use client"

import { useEffect, useMemo, useState } from "react"
import { ChevronLeft, ChevronRight, Flame } from "lucide-react"
import ProductCard from "./product-card"

const siteData = [
  {

    sectionTittle: "Best Selling Products"
  },
]
export default function ProductSlider({
  products = [],
  autoplay = true,
  autoplayDelay = 3000,
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slidesToShow, setSlidesToShow] = useState(1)

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(3)
      } else if (window.innerWidth >= 640) {
        setSlidesToShow(2)
      } else {
        setSlidesToShow(1)
      }
    }

    updateSlidesToShow()
    window.addEventListener("resize", updateSlidesToShow)

    return () => window.removeEventListener("resize", updateSlidesToShow)
  }, [])

  const maxIndex = useMemo(() => {
    return Math.max(0, products.length - slidesToShow)
  }, [products.length, slidesToShow])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

 useEffect(() => {
  if (!autoplay || maxIndex === 0) return

  const interval = setInterval(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, autoplayDelay)

  return () => clearInterval(interval)
}, [autoplay, autoplayDelay, maxIndex])

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(0)
    }
  }, [currentIndex, maxIndex])

  const translatePercentage = 100 / slidesToShow

  return (
    <section className="w-full bg-transparent dark:bg-transparent">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-500 shadow-sm dark:bg-orange-500/15 dark:text-orange-400">
              <Flame className="h-4 w-4 fill-orange-500 text-orange-500 dark:fill-orange-400 dark:text-orange-400" />
            </span>

            <h2 className="whitespace-nowrap text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-3xl">
              {siteData[0].sectionTittle}
            </h2>

            <div className="hidden h-px flex-1 bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-700 dark:to-transparent md:block md:min-w-[140px] lg:min-w-[420px]" />
          </div>

          <button className="shrink-0 text-sm font-semibold text-blue-600 transition hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300">
            View All
          </button>
        </div>


          <button
            onClick={handlePrev}
            aria-label="Previous products"
            className="absolute left-[-8px] top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-yellow-300 bg-[#FDC700] text-gray-900 shadow-md transition hover:scale-105 hover:bg-yellow-400 md:left-[-18px]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next products"
            className="absolute right-[-8px] top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-yellow-300 bg-[#FDC700] text-gray-900 shadow-md transition hover:scale-105 hover:bg-yellow-400 md:right-[-18px]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * translatePercentage}%)`,
              }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="w-full shrink-0 px-3 sm:w-1/2 lg:w-1/3"
                >
                  <div className="h-full rounded-2xl transition-transform duration-300 hover:-translate-y-1">
                    <ProductCard product={product} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-2.5">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "h-2.5 w-7 bg-[#FDC700]"
                    : "h-2.5 w-2.5 bg-gray-400 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
    </section>
  )
}