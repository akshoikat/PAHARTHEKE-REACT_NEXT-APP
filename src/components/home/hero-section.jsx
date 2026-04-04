"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getCategories } from "@/lib/data"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"

const siteData = [
  {
    sectionButton: "Start Shopping Now",
    bgVideo: "/videos/HeroSectionVideo.mp4",
  },
]

export default function HeroSection() {
  const { sectionButton, bgVideo } = siteData[0]
  const [categories, setCategories] = useState([])

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      dragFree: false,
    },
    [
      Autoplay({
        delay: 2000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  )

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories()
      setCategories(data)
    }

    fetchCategories()
  }, [])

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[220px] w-full md:h-[100vh] lg:h-[100vh]">
        <div className="absolute inset-0 overflow-hidden">
          <video
            className="pointer-events-none absolute left-1/2 top-1/2 h-[120vw] min-h-full w-[213.33vw] min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
            src={bgVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
          <div className="max-w-4xl space-y-4 md:space-y-6">
            <div className="pt-2">
              <Link href="/">
                <Button className="h-12 rounded-md TheamColor px-6 text-base font-semibold text-black hover:bg-yellow-300">
                  {sectionButton}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 -mt-16 px-4 pb-10 md:-mt-20">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex justify-center">
            {categories.map((category) => (
              <div
                key={category.id}
                className="min-w-0 flex-[0_0_70%] px-2 sm:flex-[0_0_40%] md:flex-[0_0_25%] lg:flex-[0_0_18%]"
              >
                <div className="rounded-2xl bg-[#f2f2f2] p-6 text-center shadow-lg transition hover:-translate-y-1">
                  <div className="mb-4 flex justify-center">
                    <img
                      src={category.icon}
                      alt={category.name}
                      className="h-16 w-16 object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-[#2b2b2b]">
                    {category.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}