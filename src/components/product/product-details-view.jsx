"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { addToCart } from "@/features/cart/cartSlice"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ProductCard from "./product-card"
import { Star, Zap, Phone, MessageCircle, ShoppingCart } from "lucide-react"
import { Separator } from "@/components/ui/separator";


export default function ProductDetailsView({ product, relatedProducts }) {
  const dispatch = useDispatch()
  const [selectedImage, setSelectedImage] = useState(product.images[0])
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        slug: product.slug,
        image: product.images[0],
        price: product.price,
        quantity,
      })
    )
  }

  return (
    <div className="space-y-12">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left: Product Images */}
        <div className="rounded-2xl border bg-background p-4 md:p-6">
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl border bg-muted">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border bg-background transition ${selectedImage === image
                    ? "ring-2 ring-primary border-primary"
                    : "hover:border-primary/50"
                    }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Product Summary */}
        <div className="rounded-2xl border bg-background">
          <div className="border-b px-5 py-4 md:px-6">
            <h2 className="text-lg font-semibold">Product Summary</h2>
          </div>

          <div className="space-y-6 p-5 md:p-6">

            
            <div className="space-y-3">
              <Badge
                variant="secondary"
                className="rounded-md px-3 py-1 bg-yellow-400 dark:text-black"
              >
                {product.category}
              </Badge>

              <h1 className="text-2xl font-bold leading-snug md:text-3xl">
                {product.name}
              </h1>

              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary">
                  ৳{product.price}
                </span>
                {product.oldPrice && (
                  <span className="text-base text-muted-foreground line-through">
                    ৳{product.oldPrice}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span>⭐ {product.rating} / 5</span>
                <span>•</span>
                <span className="text-green-400 font-bold">{product.stock} in stock</span>
              </div>

              <p className="leading-7 text-muted-foreground">
                {product.description}
              </p>
            </div>

            {/* Info box */}
            {/* <div className="rounded-xl border text-sm">
              <div className="grid grid-cols-2 border-b">
                <div className="px-4 py-3 font-medium">Category</div>
                <div className="px-4 py-3 text-muted-foreground border-l">{product.category}</div>
              </div>
              <div className="grid grid-cols-2 border-b">
                <div className="px-4 py-3 font-medium">Availability</div>
                <div className="px-4 py-3 text-muted-foreground border-l">
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </div>
              </div>
              <div className="grid grid-cols-2 border-b">
                <div className="px-4 py-3 font-medium">Delivery</div>
                <div className="px-4 py-3 text-muted-foreground border-l">2–4 business days</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-3 font-medium">Payment</div>
                <div className="px-4 py-3 text-muted-foreground border-l">Cash on delivery available</div>
              </div>
            </div> */}

            {/* Quantity + Sold counter */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Quantity</p>
              <div className="flex items-center gap-4">
                <div className="flex w-fit items-center rounded-xl border overflow-hidden">
                  <button
                    className="px-4 py-2 text-lg font-bold transition hover:bg-muted"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="min-w-14 text-center font-semibold">{quantity}</span>
                  <button
                    className="px-4 py-2 text-lg font-bold transition hover:bg-muted"
                    onClick={() => setQuantity((prev) => prev + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Live sold counter */}
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <span className="inline-block h-2 w-2 rounded-full TheamColor animate-pulse" />
                  <strong className="text-foreground">30 Sold</strong> in last 24 hours
                </span>
              </div>
            </div>

            <Separator />

              {/* cta Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              <Button
                size="lg"
                className="w-full TheamColor text-black hover:TheamColor font-semibold"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>

              <Button
                size="lg"
                className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-semibold"
                asChild
              >
                <Link href="/checkout">
                  <Zap className="mr-2 h-5 w-5" />
                  Buy Now
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-full border-green-300 bg-green-200/50 text-green-800 hover:bg-green-200 font-semibold"
                asChild
              >
                <a href="tel:+8801711731066">
                  <Phone className="mr-2 h-5 w-5" />
                  কল করে অর্ডার করুন
                </a>
              </Button>

              <Button
                size="lg"
                className="w-full bg-green-700 text-white hover:bg-green-800 font-semibold"
                asChild
              >
                <a
                  href="https://wa.me/+8801711731066"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  হোয়াটসঅ্যাপে অর্ডার করুন
                </a>
              </Button>

            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Related Products</h2>
              <p className="text-muted-foreground">
                More products from the same category.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}