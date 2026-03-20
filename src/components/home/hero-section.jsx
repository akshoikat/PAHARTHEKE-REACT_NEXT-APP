import Link from "next/link"
import { Button } from "@/components/ui/button"
import { categories } from "@/lib/data"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[220px] w-full md:h-[360px] lg:h-[420px]">
        {/* YouTube Background */}
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            className="absolute left-1/2 top-1/2 h-[120vw] min-h-full w-[213.33vw] min-w-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            src="https://www.youtube.com/embed/mWpO0oHNYJ4?autoplay=1&mute=1&loop=1&playlist=mWpO0oHNYJ4&controls=0&modestbranding=1&showinfo=0&rel=0"
            title="Hero Background Video"
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>


        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
          <div className="max-w-4xl space-y-4 md:space-y-6">
            {/* <h2 className="text-3xl font-extrabold uppercase tracking-tight text-yellow-400 md:text-6xl">
              Bangladesh&apos;s
            </h2>

            <p className="text-2xl font-medium text-yellow-300 md:text-5xl">
              First &amp; Only
            </p>

            <h1 className="text-3xl font-bold leading-tight text-white md:text-6xl">
              International Standard Abattoir
            </h1> */}

            <div className="pt-2">
              <Link href="/">
                <Button className="h-12 rounded-md bg-yellow-400 px-6 text-base font-semibold text-black hover:bg-yellow-300">
                  Start Shopping Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Category Cards */}
      <div className="relative z-20 -mt-16 px-4 pb-10 md:-mt-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {categories.map((category) => (
              <div
                key={category.id}
                className="rounded-2xl bg-[#f2f2f2] p-6 text-center shadow-lg transition hover:-translate-y-1"
              >
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
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}