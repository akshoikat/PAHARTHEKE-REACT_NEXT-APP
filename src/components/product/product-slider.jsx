"use client"

import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "./product-card"

export default function ProductSlider({ products }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    setScrollSnaps(emblaApi.scrollSnapList())
    onSelect()

    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)

    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-gray-100 py-14 dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-500 shadow-sm dark:bg-orange-500/15 dark:text-orange-400">
              <Flame className="h-4 w-4 fill-orange-500 text-orange-500 dark:fill-orange-400 dark:text-orange-400" />
            </span>

            <h2 className="whitespace-nowrap text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-3xl">
              Best Deals
            </h2>

            <div className="hidden h-px flex-1 bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-700 dark:to-transparent md:block md:min-w-[140px] lg:min-w-[420px]" />
          </div>

          <button className="shrink-0 text-sm font-semibold text-blue-600 transition hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300">
            View All
          </button>
        </div>

        {/* Slider Wrapper */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={scrollPrev}
            aria-label="Previous products"
            className="absolute left-[-8px] top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-yellow-300 bg-[#FDC700] text-gray-900 shadow-md transition hover:scale-105 hover:bg-yellow-400 dark:border-yellow-500/30 md:left-[-18px]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollNext}
            aria-label="Next products"
            className="absolute right-[-8px] top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-yellow-300 bg-[#FDC700] text-gray-900 shadow-md transition hover:scale-105 hover:bg-yellow-400 dark:border-yellow-500/30 md:right-[-18px]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Embla */}
          <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
            <div className="flex gap-6 py-1">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="min-w-[88%] sm:min-w-[48%] lg:min-w-[31.5%]"
                >
                  <div className="h-full rounded-2xl transition-transform duration-300 hover:-translate-y-1">
                    <ProductCard product={product} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="mt-10 flex items-center justify-center gap-2.5">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi && emblaApi.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`rounded-full transition-all duration-300 ${index === selectedIndex
                  ? "h-2.5 w-7 bg-[#FDC700]"
                  : "h-2.5 w-2.5 bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-500"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}