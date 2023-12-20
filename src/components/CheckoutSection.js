"use client";
import InputField from "./InputField";
import useCartStore from "@/store/cartStore";
import Card from "../../public/icons/card.svg";
import UPI from "../../public/icons/upi.svg";
import { useState } from "react";
import { useCreditCardValidator, images } from "react-creditcard-validator";
import Close from '../../public/icons/close-circle.svg'

const paymentOptionImage = {
  UPI: {
    name: "UPI",
    image: <UPI className="w-14 fill-skin-foreground" />,
  },
  CARDS: {
    name: "Credit Card / Debit Card",
    image: <Card className="w-10 fill-skin-foreground" />,
  },
};

export default function CheckoutSection() {
  function expDateValidate(month, year) {
    if (Number(year) > 2035) {
      return "Expiry Date Year cannot be greater than 2035";
    }
    return;
  }

  const {
    getCardNumberProps,
    getCardImageProps,
    getCVCProps,
    getExpiryDateProps,
    meta: { erroredInputs },
  } = useCreditCardValidator({ expiryDateValidator: expDateValidate });

  const paymentOption = useCartStore((state) => state.paymentMethod);
  const [currentPaymentOption, setCurrentPaymentOption] = useState(
    paymentOption[0]
  );
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="w-[50%] bg-skin-background relative overflow-auto">
      {modalOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed top-0 left-0 right-0 bottom-0 bg-skin-background/80"
            onClick={() => setModalOpen(false)}
          ></div>
          <div className="fixed w-[500px] bg-skin-background border rounded-xl border-skin-foreground/20 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] shadow">
            <div className="p-3 px-5 border-b border-skin-foreground/20 flex items-center">
              <h1 className="text-base font-medium flex-1">Add New Address</h1>
              <Close className="w-5 stroke-skin-foreground/30 stroke-2 hover:stroke-skin-foreground transition-all duration-200" />
            </div>
            <div className="px-5 p-3">

            </div>
          </div>
        </>
      )}
      <div className="max-w-[768px] h-full bg-slate-100/0 left-0 top-0 bottom-0 p-20 bg-skin-background">
        <form className="flex flex-col pb-10">
          <InputField
            label="Email"
            type="email"
            id="personEmail"
            placeholder="joylawson@gmail.com"
          />
          <InputField
            label="Phone Number"
            type="number"
            id="personPhone"
            placeholder="(201) 830-8210"
          />

          {/* Payment Module */}
          <div className="my-6">
            {/* Payment Method */}
            <div className="flex flex-col mb-2">
              <div className="flex">
                <label className="font-semibold text-base flex-1">
                  Payment Option
                </label>
              </div>
              <div className="flex gap-x-4 my-2">
                {paymentOption.map((option, index) => {
                  return (
                    <div
                      className={`w-1/2 h-20 border-2 ${
                        currentPaymentOption === option
                          ? "border-skin-primary"
                          : "border-skin-foreground/0"
                      } bg-skin-foreground/5 rounded-xl flex justify-center items-center gap-x-2 px-4 cursor-pointer`}
                      key={index}
                      onClick={() => setCurrentPaymentOption(option)}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 ${
                          currentPaymentOption === option
                            ? "bg-skin-background border-skin-primary"
                            : "bg-skin-background border-skin-foreground/30"
                        } flex justify-center items-center shadow-sm`}
                      >
                        <div
                          className={` ${
                            currentPaymentOption === option
                              ? "w-3 h-3 bg-skin-primary rounded-full"
                              : ""
                          }  `}
                        ></div>
                      </div>
                      <div className="flex-1 font-semibold text-base">
                        {paymentOptionImage[option].name}
                      </div>
                      <div>{paymentOptionImage[option].image}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Date and CVV */}
            {currentPaymentOption === "CARDS" ? (
              <>
                <InputField
                  label="Card holder name"
                  type="text"
                  id="card_holder_name"
                  placeholder="Ex. Jane Cooper"
                />
                <div className="flex flex-col">
                  <label className="font-semibold text-base">Card Number</label>
                  <div className="flex group border focus-within:border-skin-primary px-4 py-2 rounded-xl gap-x-3 items-center my-2 bg-skin-foreground/5 border-skin-foreground/10">
                    <input
                      className="bg-transparent flex-1 placeholder:text-skin-foreground/30  focus:outline-0 py-1"
                      {...getCardNumberProps()}
                    />
                    <svg {...getCardImageProps({ images })} />
                  </div>
                </div>

                <div className="flex gap-x-4 mt-2">
                  <div className="w-[50%] flex flex-col">
                    <label className="font-semibold text-base">
                      Valid Till
                    </label>
                    <input
                      className="focus:outline-0 bg-skin-foreground/5 border px-5 py-3 border-skin-foreground/10 rounded-xl mt-2 mb-5 placeholder:text-skin-foreground/30 focus-within:border-skin-primary"
                      {...getExpiryDateProps()}
                    />
                  </div>

                  <div className="w-[50%] flex flex-col">
                    <label className="font-semibold text-base" htmlFor="cvv">
                      CVV
                    </label>
                    <input
                      className="focus:outline-0 bg-skin-foreground/5 border px-5 py-3 border-skin-foreground/10 rounded-xl mt-2 mb-5 placeholder:text-skin-foreground/30 focus-within:border-skin-primary"
                      {...getCVCProps()}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <InputField
                  label="UPI ID"
                  type="text"
                  id="upi_id"
                  placeholder="Ex. 12345@bankname"
                />
              </>
            )}
          </div>

          {/* Billing Address */}
          <div>
            <div className="flex flex-col">
              <div className="flex">
                <label className="font-semibold text-base flex-1">
                  Billing Address
                </label>
                {/* {<span className="text-skin-primary font-medium cursor-pointer hover:text-skin-primary/80 transition-all duration-200 hover:scale-95">
                  + Add new
                </span>} */}
              </div>
              <div
                onClick={() => setModalOpen(true)}
                className="mt-2 mb-5 border-dashed border-2 bg-skin-foreground/5 border-skin-foreground/10 h-40  rounded-xl flex justify-center items-center font-medium text-lg text-skin-foreground/30 cursor-pointer hover:bg-skin-primary-foreground/10 hover:border-skin-primary hover:text-skin-primary transition-all duration-200"
              >
                + Add new billing address
              </div>
            </div>
          </div>

          <div className="flex gap-x-3">
            <input type="checkbox" name="" id="" />
            <span className="flex-1 text-skin-foreground/60">
              Billing address is same as shipping
            </span>
          </div>

          <div className="bg-skin-primary py-3 font-bold rounded-xl mt-6 text-center">
            <button className="text-skin-primary-foreground text-base">
              Pay $51.00
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
