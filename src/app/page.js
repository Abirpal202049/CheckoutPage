"use client";
import CartSection from "@/components/CartSection";
import CheckoutSection from "@/components/CheckoutSection";
import useCartStore from "@/store/cartStore";
import { useEffect } from "react";
import Background from "../../public/icons/background.svg";
import Cart from "../../public/icons/shopping-cart.svg";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function Home() {
  const setCart = useCartStore((state) => state.setCart);
  const cart = useCartStore((state) => state.cart);
  const setPaymentMethods = useCartStore((state) => state.setPaymentMethod);
  const setTotalAmount = useCartStore((state) => state.setTotalAmount);

  const { data, isLoading, isPending, error } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetch(
        "https://groww-intern-assignment.vercel.app/v1/api/order-details"
      );
      const data = await res.json();
      console.log("Data of Cart TANSTACK", data);
      return data;
    },
  });

  const updateCartState = async () => {
    try {
      console.log("Data of Cart ", data);
      const totalPayableAmount = data.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      console.log("Total Payment Amount", totalPayableAmount);
      setTotalAmount(totalPayableAmount);
      setCart(data.products);
      setPaymentMethods(data.paymentMethods);
    } catch (error) {
      console.log("Error fetching CartList", error);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      console.log("Data of Cart ", data);
      const totalPayableAmount = data.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      console.log("Total Payment Amount", totalPayableAmount);
      setTotalAmount(totalPayableAmount);
      setCart(data.products);
      setPaymentMethods(data.paymentMethods);
    }
  }, [isLoading]);

  return (
    <div className="flex h-[calc(100vh-81px)]">
      {cart.length > 0 ? (
        <>
          <CartSection />
          <CheckoutSection />
        </>
      ) : (
        <>
          <div className="flex relative items-center justify-center w-full">
            <div className="bottom-0 absolute left-0 right-0">
              <Background className="w-[100%]" />
            </div>

            {isLoading ? (
              <>
                <h1>Loading...</h1>
              </>
            ) : (
              <div className="flex items-center -gap-x-10">
                <Cart className="w-12 stroke-skin-foreground" />
                <h1 className="text-2xl text-skin-foreground">Cart is Empty</h1>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
