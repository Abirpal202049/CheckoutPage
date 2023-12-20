"use client";
import useGlobalStore from "@/store/globalStore";
import Setting from "../../public/icons/setting.svg";
import Cart from "../../public/icons/shopping-cart.svg";
import useCartStore from "@/store/cartStore";
import Image from "next/image";

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const logo = useGlobalStore((state) => state.merchantLogo);
  const logoName = useGlobalStore((state) => state.merchantName);

  return (
    <div className="border-b border-skin-foreground border-opacity-10 ">
      <div className="container mx-auto">
        <div className="flex py-5 items-center">
          <div className="flex flex-1 items-center gap-x-3 select-none">
            {logo ? (
              <div>
                <Image src={logo} width={40} height={40} alt={logoName} />
              </div>
            ) : (
              <div className="w-[40px] h-[40px] rounded-full bg-skin-foreground/40"></div>
            )}
            <h1 className="text-skin-foreground text-2xl font-semibold">
              {logoName}
            </h1>
          </div>

          <div className="flex gap-x-6 items-center">
            <Setting className="stroke-skin-foreground stroke-[2px] w-7 cursor-pointer" />
            <div className="relative cursor-pointer">
              <Cart className="stroke-skin-foreground stroke-[2px] w-7" />
              {cart.length > 0 && (
              <div className="absolute bg-skin-primary w-[18px] h-[18px] text-skin-primary-foreground flex justify-center items-center rounded-full text-xs font-extrabold -top-1 right-2 ">
                {cart.length}
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
