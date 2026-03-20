"use client"

import { useSelector, useDispatch } from "react-redux"
import { clearCart } from "@/features/cart/cartSlice"
import Header from "@/components/common/header"
import { Button } from "@/components/ui/button"

export default function CheckoutPage() {
  const items = useSelector((state) => state.cart.items)
  const dispatch = useDispatch()

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const shipping = items.length > 0 ? 10 : 0
  const total = subtotal + shipping

  const handlePlaceOrder = () => {
    alert("Order placed successfully!")
    dispatch(clearCart())
  }

  return (
    <>
      <Header />
      <main className="bg-[#f5f5f5] py-10 dark:bg-background">
        <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[1.4fr_0.9fr]">
          {/* LEFT */}
          <div className="space-y-6">
            <div className="rounded-md border bg-white dark:border-border dark:bg-card">
              {/* Header */}
              <div className="border-b px-5 py-3 dark:border-border">
                <h2 className="font-semibold text-gray-800 dark:text-white">
                  Address Info
                </h2>
              </div>

              {/* Form */}
              <div className="space-y-3 p-5">
                <input
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-500 focus:border-black dark:border-border dark:bg-background dark:text-white dark:placeholder:text-muted-foreground dark:focus:border-primary"
                  placeholder="Your Phone / Whatsapp / Messenger"
                />

                <input
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-500 focus:border-black dark:border-border dark:bg-background dark:text-white dark:placeholder:text-muted-foreground dark:focus:border-primary"
                  placeholder="Your Name"
                />

                <select className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-500 outline-none focus:border-black dark:border-border dark:bg-background dark:text-muted-foreground dark:focus:border-primary">
                  <option>Select Shipping City</option>
                  <option>Dhaka</option>
                  <option>Chattogram</option>
                  <option>Khulna</option>
                </select>

                <input
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-500 focus:border-black dark:border-border dark:bg-background dark:text-white dark:placeholder:text-muted-foreground dark:focus:border-primary"
                  placeholder="Your Address"
                />

                {/* Payment */}
                <div className="grid grid-cols-2 gap-4 pt-3">
                  {/* Online */}
                  <button
                    type="button"
                    className="flex h-28 cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-gray-50 transition hover:border-gray-400 dark:border-border dark:bg-background dark:hover:border-primary"
                  >
                    <span className="font-bold text-green-600 dark:text-green-500">
                      PAYONLINE
                    </span>
                    <span className="text-xs text-gray-500 dark:text-muted-foreground">
                      aamarpay
                    </span>
                  </button>

                  {/* COD */}
                  <button
                    type="button"
                    className="flex h-28 cursor-pointer flex-col items-center justify-center rounded-md border border-orange-200 bg-orange-100 transition hover:border-orange-300 dark:border-border dark:bg-orange-500/10 dark:hover:border-orange-400"
                  >
                    <span className="text-2xl">🚚</span>
                    <span className="text-sm font-medium text-gray-800 dark:text-white">
                      Cash on Delivery
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="flex items-center justify-between">
              <button className="rounded bg-green-600 px-4 py-2 text-sm text-white transition hover:bg-green-700">
                ← Return to shop
              </button>

              <button
                onClick={handlePlaceOrder}
                className="rounded px-6 py-2 text-sm font-medium text-black transition hover:opacity-90"
                style={{ backgroundColor: "#FDC700" }}
              >
                Complete Order
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <div className="rounded-md border bg-white dark:border-border dark:bg-card">
              {/* Header */}
              <div className="border-b px-5 py-3 dark:border-border">
                <h2 className="font-semibold text-gray-800 dark:text-white">
                  Summary
                </h2>
              </div>

              <div className="space-y-4 p-5 text-sm">
                {/* Table Header */}
                <div className="flex justify-between font-medium text-gray-500 dark:text-muted-foreground">
                  <span>Product</span>
                  <span>Total</span>
                </div>

                {/* Items */}
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-gray-800 dark:text-gray-100"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>৳{item.price * item.quantity}</span>
                  </div>
                ))}

                {/* Divider */}
                <div className="space-y-2 border-t pt-3 dark:border-border">
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>Subtotal</span>
                    <span>৳{subtotal}</span>
                  </div>

                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>Tax</span>
                    <span>৳0.00</span>
                  </div>

                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>Shipping cost</span>
                    <span>৳{shipping}</span>
                  </div>

                  <div className="flex justify-between font-semibold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>৳{total}</span>
                  </div>
                </div>

                {/* Coupon */}
                <div className="flex pt-2">
                  <input
                    className="flex-1 rounded-l-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-500 focus:border-black dark:border-border dark:bg-background dark:text-white dark:placeholder:text-muted-foreground dark:focus:border-primary"
                    placeholder="Have coupon code? Enter here"
                  />
                  <button
                    className="rounded-r-md px-4 text-sm text-black transition hover:opacity-90"
                    style={{ backgroundColor: "#FDC700" }}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}