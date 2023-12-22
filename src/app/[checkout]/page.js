"use client";
import CartList from "@/components/CartList";
import useCartStore from "@/store/cartStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    if (cart.length === 0) {
      router.push("/");
    }
  }, [cart.length]);

  return (
    <div className="container mx-auto my-3">
      <CartList />
    </div>
  );
}
