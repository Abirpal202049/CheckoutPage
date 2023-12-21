"use client";
import useCartStore from "@/store/cartStore";
import Image from "next/image";
import UpArrow from "../../public/icons/arrow-up.svg";

export default function CartList() {
  const cart = useCartStore((state) => state.cart);

  return (
    <div>
      <div className="flex items-center ">
        <h1 className="text-xl sm:text-2xl font-bold flex-1">
          Your Order ({cart.length})
        </h1>
      </div>
      <div className="xl:border  rounded-xl xl:border-skin-foreground/10 flex flex-col xl:p-6 p-2 gap-y-10 my-2 sm:my-5 xl:bg-skin-background xl:max-h-[40vh] overflow-auto">
        {cart.map((item) => {
          return (
            <div key={item.id} className="flex items-center gap-x-10">
              <div className="relative bg-white rounded-xl">
                <Image
                  width={100}
                  height={100}
                  src={item.image}
                  alt={item.title}
                  className="border border-skin-foreground/10 p-1 xl:p-2 rounded-xl mix-blend-multiply"
                />
                <div className="w-[20px] h-[20px] rounded-full border border-skin-foreground/10 text-xs flex justify-center items-center shadow-sm shadow-skin-foreground absolute bg-skin-background font-semibold -top-2 -right-2">
                  {item.quantity}
                </div>
              </div>

              <div className=" flex flex-col gap-y-1 sm:gap-y-3 flex-1 text-sm sm:text-base">
                <h1 className="w-[100%] sm:w-[80%]  font-bold sm:leading-6">
                  {item.title}
                </h1>
                <p className="font-medium  text-skin-foreground/60">
                  Qty :{" "}
                  <span className="text-skin-foreground">{item.quantity}</span>
                </p>
                <p className="font-medium text-skin-foreground/60 flex items-center sm:hidden">
                  Price :{" "}
                  <span className="text-skin-foreground ">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </p>
              </div>

              <h2 className="text-lg font-medium sm:block hidden">
                ${(item.price * item.quantity).toFixed(2)}
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}
