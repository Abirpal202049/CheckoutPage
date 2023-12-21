"use client";
import CartSection from "@/components/CartSection";
import CheckoutSection from "@/components/CheckoutSection";
import useCartStore from "@/store/cartStore";
import { useEffect } from "react";
import Background from "../../public/icons/background.svg";
import Cart from "../../public/icons/shopping-cart.svg";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
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

  const refreshData = () => {
    window.location.reload();
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
    <div className="flex flex-col xl:flex-row xl:h-[calc(100vh-83px)]">
      {cart.length > 0 ? (
        <>
          <CartSection />
          <CheckoutSection />
        </>
      ) : (
        <>
          <div className="flex relative items-center justify-center w-screen h-[calc(100vh-83px)]">
            <div className="bottom-0 absolute left-0 right-0 -z-10">
              <Background className="w-[100%]" />
            </div>

            {isLoading ? (
              <>
                <h1>Loading...</h1>
              </>
            ) : (
              <div className="flex items-center -gap-x-10">
                <div className="flex flex-col text-center justify-center items-center gap-y-5">
                  <div className="flex items-center">
                    <Cart className="w-10 sm:w-16 stroke-2 stroke-skin-primary" />

                    <h1 className="text-lg sm:text-2xl text-skin-foreground">
                      Cart is Empty
                    </h1>
                  </div>
                  {/* Add a reload -> Start shopping */}

                  <button
                    className="rounded-xl bg-skin-primary px-20 sm:px-28 py-2 sm:py-3 text-center text-lg font-semibold shadow-sm text-skin-primary-foreground hover:bg-skin-primary/80 hover:text-skin-foreground transition-all duration-200 "
                    onClick={refreshData}
                  >
                    Reload
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
