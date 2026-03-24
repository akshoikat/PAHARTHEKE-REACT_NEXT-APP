"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Scale, BadgeCent, Check, Star } from "lucide-react"
import { useDispatch } from "react-redux"
import { addToCart } from "@/features/cart/cartSlice"
import { toast } from "sonner"



export default function ProductCard({ product }) {
  const dispatch = useDispatch()

  const image = product.images?.[0] || "/placeholder.png"
  const isInStock = (product.stock ?? 1) > 0

  const handleAddToCart = () => {
    if (!isInStock) {
      toast.error("This product is currently out of stock.")
      return
    }

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        slug: product.slug,
        image,
        price: product.price,
      })
    )

    toast.success(`${product.name} added to cart`, {
      description: "Your item has been added successfully.",
      icon: <Check className="h-4 w-4" />,
    })
  }

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-border dark:bg-card">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative h-[230px] overflow-hidden bg-gradient-to-b from-[#fbf7ef] to-[#f4efe6] dark:from-muted/40 dark:to-muted/10">
          {/* Stock badge */}
          <div className="absolute left-3 top-3 z-10">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium shadow-sm ${isInStock
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                : "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400"
                }`}
            >
              {isInStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* Rating */}
          {typeof product.rating === "number" && (
            <div className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-gray-700 shadow-sm backdrop-blur dark:bg-background/80 dark:text-gray-200">
              <Star className="h-3.5 w-3.5 fill-[#FDC700] text-[#FDC700]" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          )}

          <Image
            src={image}
            alt={product.name}
            fill
            className="object-contain p-5 transition duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="space-y-4 p-4">
        <div className="space-y-2">
          <Link href={`/products/${product.slug}`}>
            <h3 className="line-clamp-1 text-lg font-semibold tracking-tight text-[#222] transition-colors group-hover:text-[#7a5c00] dark:text-white dark:group-hover:text-[#FDC700] md:text-[20px]">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#1f1f1f] dark:text-white">
              ৳{product.price}
            </span>

            {product.oldPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ৳{product.oldPrice}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Weight */}
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-[#4b4b4b] dark:border-border dark:bg-muted/40 dark:text-muted-foreground">
            <Scale className="h-4 w-4" />
            <span>{product.weight || "250gm"}</span>
          </div>

          {/* Price tag */}
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-[#4b4b4b] dark:border-border dark:bg-muted/40 dark:text-muted-foreground">
            <BadgeCent className="h-4 w-4" />
            <span>Best Price</span>
          </div>

          {/* Button */}
          <button
            onClick={handleAddToCart}
            disabled={!isInStock}
            className="ml-auto inline-flex items-center gap-2 rounded-xl bg-green-400 px-4 py-2.5 text-sm font-semibold text-black shadow-sm transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#FDC700]/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingCart className="h-4 w-4" />
            {isInStock ? "Add" : "Unavailable"}
          </button>
        </div>
      </div>
    </div>
  )
}