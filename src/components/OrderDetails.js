import useCartStore from "@/store/cartStore";
import { convertTimestamp } from "@/utils/timeFormatter";
import Image from "next/image";
import React from "react";

const shippingCost = 8;

export default function OrderDetails({ details }) {
  const { cart, totalCartAmount, payableAmount, orderDate } = details;
  const calculateDiscount = totalCartAmount - payableAmount;

  return (
    <div>
      <h1 className="text-xl font-semibold border-b border-skin-foreground/10 pb-3">
        Order Details
      </h1>
      <div className="text-base leading-5 my-3">
        <p className="font-semibold">Order Placed</p>
        <p className="text-sm">{convertTimestamp(orderDate)}</p>

        {/* Total Cart */}
        <div className="my-5">
          {cart?.map((item, index) => {
            return (
              <div
                key={item.id}
                className={`flex ${
                  index === cart.length - 1 ? "" : "border-b"
                }   items-center py-2 border-skin-foreground/10 px-3 gap-x-4`}
              >
                {/* Product Image */}
                <div className=" bg-white rounded">
                  <Image
                    width={50}
                    height={50}
                    src={item.image}
                    alt={item.title}
                    className="border border-skin-foreground/10 p-1   mix-blend-multiply"
                  />
                </div>

                {/* Product name and quantity */}
                <div className="text-xs sm:text-sm items-center flex-1 ">
                  <p className=" font-medium">{item.title}</p>

                  {/* price and quantity */}
                  <div className="flex justify-between items-center mt-1">
                    {/* Quantity */}
                    <p className="font-medium  text-skin-foreground/60">
                      Qty :{" "}
                      <span className="text-skin-foreground">
                        {item.quantity}
                      </span>
                    </p>

                    {/* Price only visible in mobile */}
                    <p className="font-medium text-right text-skin-foreground/60 sm:hidden block">
                      Price :{" "}
                      <span className="text-skin-foreground ">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Product price * quantity */}
                <p className="text-sm sm:block hidden">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            );
          })}
        </div>

        {/* Order Summery */}
        <div className="py-6 text-sm font-normal flex flex-col gap-y-3 border-b-2 border-skin-foreground/10">
          <div className="flex">
            <span className="flex-1 text-skin-foreground/60">Subtotal</span>
            <span>${totalCartAmount?.toFixed(2)}</span>
          </div>
          <div className="flex">
            <span className="flex-1 text-skin-foreground/60">
              Shipping Cost
            </span>
            <span>${shippingCost?.toFixed(2)}</span>
          </div>

          {/* This will be conditionally rendered */}
          {calculateDiscount > 0 && (
            <div className="flex">
              <span className="flex-1 text-skin-foreground/60">
                Discount Code Applied
              </span>
              <span>-${calculateDiscount?.toFixed(2)}</span>
            </div>
          )}
        </div>

        <div className="text-lg font-semibold flex my-6 py-2 px-2 rounded bg-skin-primary text-skin-primary-foreground">
          <span className="flex-1">Total</span>
          <span>${payableAmount?.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
