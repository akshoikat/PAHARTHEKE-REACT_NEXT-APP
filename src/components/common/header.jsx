"use client"

import Link from "next/link"
import { MapPin, Search, ShoppingCart, User } from "lucide-react"
import { useSelector } from "react-redux"

import CartSheet from "@/components/cart/cart-sheet"
import ThemeToggle from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Header() {
  const items = useSelector((state) => state.cart.items)

  const totalQty = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 bg-green-50 text-black dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-3 py-3">

        <div className="flex items-center gap-2 flex-nowrap">

          {/* <Link href="/" className="shrink-0">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
          </Link> */}

          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-yellow-500" />
            <Input
              placeholder="Search"
              className="h-9 w-full border border-green-600 bg-white pl-9 text-sm text-black placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <ThemeToggle />

            <CartSheet>
              <Button
                variant="outline"
                className="relative h-9 px-2 border-green-600 bg-transparent text-black hover:bg-white"
              >
                <ShoppingCart className="h-4 w-4 text-yellow-500" />
                {totalQty > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-yellow-400 px-1 text-[10px] font-bold text-black">
                    {totalQty}
                  </span>
                )}
              </Button>
            </CartSheet>

            <Button
              variant="outline"
              className="h-9 px-2 border-green-600 bg-transparent text-yellow-500 hover:bg-white hover:text-black"
            >
              <User className="h-4 w-4" />
            </Button>

          </div>
        </div>

      </div>
    </header>
  )
}