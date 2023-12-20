"use client";
import useCartStore from "@/store/cartStore";
import Image from "next/image";

export default function CartList() {
  const cart = useCartStore((state) => state.cart);

  return (
    <>
      <h1 className="text-2xl font-bold">Your Order ({cart.length})</h1>
      <div className="border rounded-xl border-skin-foreground/10 flex flex-col p-6 gap-y-10 my-5 bg-skin-background max-h-[40vh] overflow-auto">
        {cart.map((item) => {
          return (
            <div key={item.id} className="flex items-center gap-x-10">
              <div className="relative bg-white rounded-xl">
                <Image
                  width={100}
                  height={100}
                  src={item.image}
                  alt={item.title}
                  className="border border-skin-foreground/10 p-2 rounded-xl mix-blend-multiply"
                />
                <div className="w-[20px] h-[20px] rounded-full border border-skin-foreground/10 text-xs flex justify-center items-center shadow-sm shadow-skin-foreground absolute bg-skin-background font-semibold -top-2 -right-2">
                  {item.quantity}
                </div>
              </div>

              <div className=" flex flex-col gap-y-3 flex-1">
                <h1 className="w-[80%] text-base font-bold leading-6">
                  {item.title}
                </h1>
                <p className="font-medium text-skin-foreground/60">
                  Qty :{" "}
                  <span className="text-skin-foreground">{item.quantity}</span>
                </p>
              </div>

              <h2 className="text-lg font-medium">${(item.price * item.quantity).toFixed(2)}</h2>
            </div>
          );
        })}
      </div>
    </>
  );
}
