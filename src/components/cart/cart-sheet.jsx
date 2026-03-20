"use client"

import Link from "next/link"
import Image from "next/image"
import { useSelector, useDispatch } from "react-redux"
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "@/features/cart/cartSlice"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"
import { ShoppingCart, Trash2 } from "lucide-react"

export default function CartSheet({ children }) {
  const items = useSelector((state) => state.cart.items)
  const dispatch = useDispatch()

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        {/* Cart Items */}
        <div className="flex-1 space-y-4 overflow-y-auto py-4">
          {items.length === 0 && (
            <p className="text-center text-muted-foreground">
              Your cart is empty
            </p>
          )}

          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-xl border p-3"
            >
              <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col gap-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  ${item.price}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => dispatch(decreaseQty(item.id))}
                    className="px-2"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseQty(item.id))}
                    className="px-2"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="space-y-4 border-t pt-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Subtotal</span>
            <span className="font-bold">${subtotal.toFixed(2)}</span>
          </div>

          <Link href="/checkout">
            <Button className="w-full" disabled={items.length === 0}>
              Checkout
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}