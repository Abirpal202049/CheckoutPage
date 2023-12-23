"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Verify from "../../../public/icons/verify.svg";
import CustomerDetails from "@/components/CustomerDetails";
import OrderDetails from "@/components/OrderDetails";
import useUserStore from "@/store/userStore";
import { convertTimestamp } from "@/utils/timeFormatter";

export default function CheckoutPage({ params }) {
  const router = useRouter();
  const orderId = params.orderId; // Getting the order id from the url
  const orderDetails = useUserStore((state) => state.user);

  // Local state
  const [orderState, setOrderState] = useState({});

  console.log("Order Details", orderState);

  useEffect(() => {
    if (orderDetails.orderId === orderId) {
      setOrderState(orderDetails);
    } else {
      router.push("/");
    }
  }, [orderId]);

  return (
    <>
      {/* Top Navigation Header */}
      <div className="h-14 bg-skin-foreground/5 flex justify-center items-center">
        <div className="container mx-auto flex items-center gap-x-3 px-5 sm:px-2 sm:flex-0">
          <div onClick={() => router.back()} className="flex-1 sm:flex-none">
            <ArrowLeft strokeWidth={2} />
          </div>

          <div className="flex flex-col sm:flex-row flex-none sm:flex-1">
            <div className="text-skin-primary font-medium text-sm sm:text-lg flex-1">
              <span>Order:</span>
              <span>{convertTimestamp(orderState?.orderDate)}</span>
            </div>

            <div className="flex self-end items-center gap-x-1">
              <Verify className="w-5 sm:w-7 fill-skin-primary" />
              <span className="text-skin-primary font-medium text-sm sm:text-lg">
                Payment Successful
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Order related details */}
      <div className="max-w-[1200px] mx-auto my-3 flex lg:flex-row flex-col gap-4 px-5">
        <div className="w-full lg:w-2/3 bg-skin-foreground/10 rounded-xl p-6">
          <OrderDetails details={orderDetails} />
        </div>
        <div className="w-full lg:md:w-1/3 bg-skin-foreground/10 h-fit rounded-xl p-6">
          <div className="pt-1">
            <CustomerDetails details={orderDetails} />
          </div>
        </div>
      </div>
    </>
  );
}
