"use client";
import Background from "../../public/icons/background.svg";
import CartList from "./CartList";
import DiscountCode from "../../public/icons/ticket-discount.svg";
import useCartStore from "@/store/cartStore";
import { useEffect, useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import ErrorIcon from "../../public/icons/info-circle.svg";

const shippingCost = 8;
const validDiscountCodes = [
  { code: "GROWW10", discountPercent: 10 },
  { code: "GROWWMORE20", discountPercent: 20 },
];

export default function CartSection() {
  const { width, height } = useWindowSize();
  const [discountCode, setDiscountCode] = useState("");
  const [discountCodeAppliedStatus, setDiscountCodeAppliedStatus] =
    useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPlaceholder, setDiscountPlaceholder] = useState("");
  const [isExploding, setIsExploding] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const calculateTotal = useCartStore((state) => state.totalAmount);
  const payableAmount = useCartStore((state) => state.payableAmount);
  const setPayableAmount = useCartStore((state) => state.setPayableAmount);
  console.log("AMOUNT ", calculateTotal);

  const applyDiscount = (e) => {
    try {
      e.preventDefault();
      if (discountCode) {
        // Match weather the discount code is present in the validDiscountCodes
        const discountCodeMatch = validDiscountCodes.find(
          (item) => item.code === discountCode.toUpperCase()
        );

        // If the discount code matches then apply the discount
        if (discountCodeMatch) {
          setPayableAmount(
            calculateTotal +
              shippingCost -
              (calculateTotal * discountCodeMatch.discountPercent) / 100
          );
          setDiscountAmount(
            (calculateTotal * discountCodeMatch.discountPercent) / 100
          );
          setDiscountCodeAppliedStatus(true);
          setDiscountPlaceholder(
            `Discount - ${discountCodeMatch.code} (${discountCodeMatch.discountPercent}%)`
          );
          setTimeout(() => {
            setIsExploding(false);
          }, 6000);
          setIsExploding(true);
          setDiscountCode("");
        } else {
          setTimeout(() => {
            setErrorMessage("");
          }, 6000);
          setErrorMessage("Invalid Discount Code");
          setDiscountCode("");
        }
      }
    } catch (error) {
      console.log("ERROR", error.message);
    }
  };

  useEffect(() => {
    console.log("Payable Amount ", calculateTotal);
    setPayableAmount(calculateTotal + shippingCost);
  }, []);

  return (
    <div className="w-[50%] bg-skin-foreground/5 border-r border-skin-foreground border-opacity-10 relative overflow-auto">
      {isExploding && (
        <div className=" fixed top-0 left-0 right-0 bottom-0 z-50">
          <Confetti numberOfPieces={1000} width={width} height={height} />
        </div>
      )}
      <div className="bottom-0 absolute left-0 right-0">
        <Background className="w-[100%]" />
      </div>
      <div className="max-w-[768px] float-right h-full bg-slate-100/0 right-0 top-0 bottom-0 text-skin-foreground p-10 px-20 ">
        {/*  Cart */}
        <CartList />

        {/* Discount Code */}

        <form className="border-b-2 border-skin-foreground/10 pb-8 flex flex-col">
          <label htmlFor="discountCode" className="text-lg font-semibold ">
            Discount Code
          </label>
          <div className="flex group border-2 border-skin-primary/20 focus-within:border-skin-primary px-4 py-3 rounded-xl gap-x-3 items-center my-2 ">
            <DiscountCode className="fill-skin-primary w-7" />
            <input
              placeholder="GROWW10"
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              name=""
              id="discountCode"
              className="bg-transparent flex-1 placeholder:font-medium placeholder:text-skin-foreground/30 focus:outline-0 font-medium uppercase"
            />
            <button
              disabled={!discountCode ? true : false}
              type="submit"
              onClick={applyDiscount}
              className="text-skin-primary disabled:text-skin-primary/60 font-medium cursor-pointer hover:text-skin-primary/80 transition-all duration-200 hover:scale-95"
            >
              Apply
            </button>
          </div>
          {errorMessage ? (
            <small className="text-red-500 -mt-1 font-medium flex items-center gap-x-2">
              <ErrorIcon />
              {errorMessage}
            </small>
          ) : (
            <small className="h-[21px] -mt-1 "></small>
          )}
        </form>

        {/* Total */}
        <div className="py-6 text-base font-normal flex flex-col gap-y-3 border-b-2 border-skin-foreground/10">
          <div className="flex">
            <span className="flex-1 text-skin-foreground/60">Subtotal</span>
            <span>${calculateTotal.toFixed(2)}</span>
          </div>
          <div className="flex">
            <span className="flex-1 text-skin-foreground/60">
              Shipping Cost
            </span>
            <span>${shippingCost.toFixed(2)}</span>
          </div>

          {/* This will be conditionally rendered */}
          {discountCodeAppliedStatus && (
            <div className="flex">
              <span className="flex-1 text-skin-foreground/60">
                {discountPlaceholder}
              </span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
          )}
        </div>

        <div className="text-lg font-semibold flex py-6">
          <span className="flex-1">Total</span>
          <span>${payableAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
