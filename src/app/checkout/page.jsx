"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/features/cart/cartSlice";
import { submitOrder } from "@/lib/api/orders";
import { mapCartStateToOrderPayload } from "@/lib/api/mappers/order";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/common/header";

const SHIPPING_INSIDE_DHAKA = 80;
const SHIPPING_OUTSIDE_DHAKA = 120;

function CheckoutSummarySkeleton() {
  return (
    <Card className="rounded-md border bg-white dark:border-border dark:bg-card">
      <CardContent className="space-y-4 p-5">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}

function EmptyCartState() {
  return (
    <main className="bg-[#f5f5f5] py-10 dark:bg-background">
      <div className="container mx-auto px-4">
        <Card className="rounded-md border bg-white dark:border-border dark:bg-card">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Your cart is empty
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Add some products before placing an order.
            </p>
            <Link href="/shop" className="mt-5">
              <Button>Return to shop</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  const dispatch = useDispatch();

  const cartState = useSelector((state) => state.cart);
  const items = cartState?.items || [];
  const authUser = useSelector((state) => state.auth?.user || null);

  const [formData, setFormData] = useState({
    phone: "",
    full_name: "",
    city: "",
    address: "",
    email: "",
    area: "",
    zip_code: "",
    country: "Bangladesh",
    order_note: "",
    payment_type: "cash_on_delivery",
    payment_status: "unpaid",
    coupon_code: "",
    coupon_discount: 0,
  });

  const [couponInput, setCouponInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [lastPayload, setLastPayload] = useState(null);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const price = Number(item.price || item.sale_price || item.unit_price || 0);
      const quantity = Number(item.quantity || 1);
      return sum + price * quantity;
    }, 0);
  }, [items]);

  const shipping = useMemo(() => {
    if (!items.length) return 0;
    return formData.city === "Dhaka"
      ? SHIPPING_INSIDE_DHAKA
      : SHIPPING_OUTSIDE_DHAKA;
  }, [items.length, formData.city]);

  const total = useMemo(() => {
    return Math.max(
      subtotal + shipping - Number(formData.coupon_discount || 0),
      0
    );
  }, [subtotal, shipping, formData.coupon_discount]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "city" ? { area: value } : {}),
    }));
  }

  function handleSelectPayment(paymentType) {
    setFormData((prev) => ({
      ...prev,
      payment_type: paymentType,
      payment_status: paymentType === "online" ? "pending" : "unpaid",
    }));
  }

  function handleApplyCoupon() {
    setFormData((prev) => ({
      ...prev,
      coupon_code: couponInput.trim(),
    }));
  }

  function validateForm() {
    if (!items.length) return "Your cart is empty.";
    if (!formData.phone.trim()) return "Phone number is required.";
    if (!formData.full_name.trim()) return "Name is required.";
    if (!formData.city.trim()) return "Please select a shipping city.";
    if (!formData.address.trim()) return "Address is required.";
    return "";
  }

  async function placeOrder(payloadOverride = null) {
    setErrorMessage("");
    setSuccessMessage("");

    const validationError = validateForm();
    if (validationError && !payloadOverride) {
      setErrorMessage(validationError);
      return;
    }

    setLoading(true);

    try {
      const payload =
        payloadOverride ||
        mapCartStateToOrderPayload({
          cartState,
          shippingForm: {
            ...formData,
            coupon_code: formData.coupon_code,
            coupon_discount: formData.coupon_discount,
          },
          userId: authUser?.id || null,
        });

      setLastPayload(payload);

      const response = await submitOrder(payload);

      if (response?.success) {
        setSuccessMessage(response?.message || "Order placed successfully.");
        dispatch(clearCart());

        setFormData({
          phone: "",
          full_name: "",
          city: "",
          address: "",
          email: "",
          area: "",
          zip_code: "",
          country: "Bangladesh",
          order_note: "",
          payment_type: "cash_on_delivery",
          payment_status: "unpaid",
          coupon_code: "",
          coupon_discount: 0,
        });

        setCouponInput("");
      } else {
        setErrorMessage(response?.message || "Failed to place order.");
      }
    } catch (error) {
      setErrorMessage(error?.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  }

  async function handlePlaceOrder() {
    await placeOrder();
  }

  async function handleRetryOrder() {
    if (!lastPayload) {
      await placeOrder();
      return;
    }

    await placeOrder(lastPayload);
  }

  if (pageLoading) {
    return (
      <main className="bg-[#f5f5f5] py-10 dark:bg-background">
        <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[1.4fr_0.9fr]">
          <CheckoutSummarySkeleton />
          <CheckoutSummarySkeleton />
        </div>
      </main>
    );
  }

  if (!items.length && !successMessage) {
    return <EmptyCartState />;
  }

  return (
    <>
    <Header />
      <main className="bg-[#f5f5f5] py-10 dark:bg-background">
        <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="space-y-6">
            <Card className="rounded-md border bg-white dark:border-border dark:bg-card">
              <div className="border-b px-5 py-3 dark:border-border">
                <h2 className="font-semibold text-gray-800 dark:text-white">
                  Address Info
                </h2>
              </div>

              <CardContent className="space-y-3 p-5">
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-500 focus:border-black dark:border-border dark:bg-background dark:text-white dark:placeholder:text-muted-foreground dark:focus:border-primary"
                  placeholder="Your Phone / Whatsapp / Messenger"
                />

                <input
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-500 focus:border-black dark:border-border dark:bg-background dark:text-white dark:placeholder:text-muted-foreground dark:focus:border-primary"
                  placeholder="Your Name"
                />

                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-500 outline-none focus:border-black dark:border-border dark:bg-background dark:text-muted-foreground dark:focus:border-primary"
                >
                  <option value="">Select Shipping City</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chattogram">Chattogram</option>
                  <option value="Khulna">Khulna</option>
                </select>

                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-500 focus:border-black dark:border-border dark:bg-background dark:text-white dark:placeholder:text-muted-foreground dark:focus:border-primary"
                  placeholder="Your Address"
                />

                <div className="grid grid-cols-2 gap-4 pt-3">
                  <button
                    type="button"
                    onClick={() => handleSelectPayment("online")}
                    className={`flex h-28 cursor-pointer flex-col items-center justify-center rounded-md border transition ${
                      formData.payment_type === "online"
                        ? "border-green-500 bg-green-50 dark:border-green-500 dark:bg-green-500/10"
                        : "border-gray-300 bg-gray-50 hover:border-gray-400 dark:border-border dark:bg-background dark:hover:border-primary"
                    }`}
                  >
                    <span className="font-bold text-green-600 dark:text-green-500">
                      PAYONLINE
                    </span>
                    <span className="text-xs text-gray-500 dark:text-muted-foreground">
                      aamarpay
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectPayment("cash_on_delivery")}
                    className={`flex h-28 cursor-pointer flex-col items-center justify-center rounded-md border transition ${
                      formData.payment_type === "cash_on_delivery"
                        ? "border-orange-300 bg-orange-100 dark:border-orange-400 dark:bg-orange-500/10"
                        : "border-gray-300 bg-gray-50 hover:border-gray-400 dark:border-border dark:bg-background dark:hover:border-primary"
                    }`}
                  >
                    <span className="text-2xl">🚚</span>
                    <span className="text-sm font-medium text-gray-800 dark:text-white">
                      Cash on Delivery
                    </span>
                  </button>
                </div>

                {errorMessage ? (
                  <div className="rounded-md bg-red-50 px-3 py-3 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
                    <p>{errorMessage}</p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleRetryOrder}
                      className="mt-3"
                      disabled={loading}
                    >
                      Retry
                    </Button>
                  </div>
                ) : null}

                {successMessage ? (
                  <div className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-600 dark:bg-green-500/10 dark:text-green-400">
                    {successMessage}
                  </div>
                ) : null}
              </CardContent>
            </Card>

            <div className="flex items-center justify-between">
              <Link href="/shop">
                <Button className="bg-green-600 text-white hover:bg-green-700">
                  ← Return to shop
                </Button>
              </Link>

              <Button
                type="button"
                onClick={handlePlaceOrder}
                disabled={loading || !items.length}
                className="text-black hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                style={{ backgroundColor: "#FDC700" }}
              >
                {loading ? "Processing..." : "Complete Order"}
              </Button>
            </div>
          </div>

          <div>
            <Card className="rounded-md border bg-white dark:border-border dark:bg-card">
              <div className="border-b px-5 py-3 dark:border-border">
                <h2 className="font-semibold text-gray-800 dark:text-white">
                  Summary
                </h2>
              </div>

              <CardContent className="space-y-4 p-5 text-sm">
                <div className="flex justify-between font-medium text-gray-500 dark:text-muted-foreground">
                  <span>Product</span>
                  <span>Total</span>
                </div>

                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-gray-800 dark:text-gray-100"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>৳{Number(item.price || 0) * Number(item.quantity || 1)}</span>
                  </div>
                ))}

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

                  {!!formData.coupon_discount && (
                    <div className="flex justify-between text-gray-700 dark:text-gray-300">
                      <span>Coupon discount</span>
                      <span>-৳{formData.coupon_discount}</span>
                    </div>
                  )}

                  <div className="flex justify-between font-semibold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>৳{total}</span>
                  </div>
                </div>

                <div className="flex pt-2">
                  <input
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 rounded-l-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-500 focus:border-black dark:border-border dark:bg-background dark:text-white dark:placeholder:text-muted-foreground dark:focus:border-primary"
                    placeholder="Have coupon code? Enter here"
                  />
                  <Button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="rounded-l-none text-black hover:opacity-90"
                    style={{ backgroundColor: "#FDC700" }}
                  >
                    Apply
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
    </>
  );
}