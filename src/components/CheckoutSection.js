"use client";
import InputField from "./InputField";
import useCartStore from "@/store/cartStore";
import Card from "../../public/icons/card.svg";
import UPI from "../../public/icons/upi.svg";
import { useState } from "react";
import { useCreditCardValidator, images } from "react-creditcard-validator";
import AddressModal from "./AddressModal";

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

  const payableAmount = useCartStore((state) => state.payableAmount);

  return (
    <div className="w-[50%] bg-skin-background relative overflow-auto">
      {/* New Address Pop Up */}
      {modalOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed top-0 left-0 right-0 bottom-0 bg-skin-background/80 z-40"
            onClick={() => setModalOpen(false)}
          ></div>

          {/* Address Modal */}
          <AddressModal setModalOpenFunc={setModalOpen} />
        </>
      )}

      {/* Checkout Form */}
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

          <div className="inline-flex items-center ">
            <label
              className="relative flex items-center rounded-full cursor-pointer"
              htmlFor="billing_and_shipping"
            >
              <input
                type="checkbox"
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-skin-bg-skin-primary checked:bg-skin-primary checked:before:bg-skin-primary hover:before:opacity-10"
                id="billing_and_shipping"
              />
              <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="1"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
            <label className="ml-2" htmlFor="billing_and_shipping">
              Billing address is same as shipping
            </label>
          </div>

          <div className="bg-skin-primary py-3 font-bold rounded-xl mt-6 text-center">
            <button className="text-skin-primary-foreground text-base">
              Pay ${payableAmount.toFixed(2)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
