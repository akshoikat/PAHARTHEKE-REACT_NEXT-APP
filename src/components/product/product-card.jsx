"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Scale, BadgeCent, Check, Star } from "lucide-react"
import { useDispatch } from "react-redux"
import { addToCart } from "@/features/cart/cartSlice"
import { toast } from "sonner"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"


export default function ProductCard({ product }) {
  const dispatch = useDispatch()

  const image = product.images;
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
<Card className="group overflow-hidden rounded-2xl border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-border dark:bg-card">
  <Link href={`/products/${product.slug}`} className="block">
    {/* Image Wrapper with fixed size */}
    <div className="relative w-[350px] h-[400px] mx-auto overflow-hidden bg-gradient-to-b from-[#fbf7ef] to-[#f4efe6] dark:from-muted/40 dark:to-muted/10 rounded-t-2xl">
      
      {/* Stock badge */}
      <Badge
        className={`absolute left-3 top-3 px-3 py-1 text-xs font-medium shadow-sm ${
          isInStock
            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
            : "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400"
        }`}
      >
        {isInStock ? "In Stock" : "Out of Stock"}
      </Badge>

      {/* Rating
      {typeof product.rating === "number" && (
        <div className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-gray-700 shadow-sm backdrop-blur dark:bg-background/80 dark:text-gray-200">
          <Star className="h-3.5 w-3.5 fill-[#FDC700] text-[#FDC700]" />
          <span>{product.rating.toFixed(1)}</span>
        </div>
      )} */}

      <img
        src={image}
        alt={product.name}
        className="object-contain w-full h-full pt-5 transition duration-500 group-hover:scale-105"
      />
    </div>
  </Link>

  <CardContent className="space-y-4 p-4">
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

      {/* Add to Cart Button */}
      <Button
        onClick={handleAddToCart}
        disabled={!isInStock}
        className="ml-auto inline-flex items-center gap-2 rounded-xl TheamColor px-4 py-2.5 text-sm font-semibold text-black shadow-sm transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ShoppingCart className="h-4 w-4" />
        {isInStock ? "Add" : "Unavailable"}
      </Button>
    </div>
  </CardContent>
</Card>
  )
}