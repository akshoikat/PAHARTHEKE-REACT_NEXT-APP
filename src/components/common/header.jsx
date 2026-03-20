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
    <header className="sticky top-0 z-50 border-b bg-[#232530] text-white">
      <div className="container mx-auto flex flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: Logo */}
        <div className="flex items-center justify-between gap-4 lg:w-[220px]">
          <Link href="/" className="shrink-0">
            {/* <div className="rounded-full bg-yellow-400 px-6 py-3 text-center text-black shadow-md">
              <p className="text-2xl font-extrabold uppercase leading-none">
                Pahar
              </p>
              <p className="text-2xl font-extrabold uppercase leading-none">
                Theke
              </p>
            </div> */}
          </Link>

          <div className="lg:hidden">
            <ThemeToggle />
          </div>
        </div>

        {/* Middle: Search */}
        <div className="flex w-full flex-1 items-center">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search Here"
              className="h-11 border-none bg-white pl-10 text-black placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-wrap items-center gap-3 lg:justify-end">
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>

          <CartSheet>
            <Button
              variant="outline"
              className="relative h-11 border-gray-600 bg-transparent text-white hover:bg-white hover:text-black"
            >
              <ShoppingCart className="h-4 w-4 text-yellow-400" />
              {totalQty > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-yellow-400 px-1 text-xs font-bold text-black">
                  {totalQty}
                </span>
              )}
            </Button>
          </CartSheet>

          <Button
            variant="outline"
            className="h-11 border-gray-600 bg-transparent text-white hover:bg-white hover:text-black"
          >
            <User className="mr-2 h-4 w-4 text-yellow-400" />
            Sign In
          </Button>
        </div>
      </div>
    </header>
  )
}