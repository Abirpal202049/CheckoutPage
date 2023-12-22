"use client";
import InputField from "./InputField";
import useCartStore from "@/store/cartStore";
import Card from "../../public/icons/card.svg";
import UPI from "../../public/icons/upi.svg";
import { useEffect, useState } from "react";
import { useCreditCardValidator, images } from "react-creditcard-validator";
import AddressModal from "./AddressModal";
import { useForm } from "react-hook-form";
import useAddressStore from "@/store/addressStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import useUserStore from "@/store/userStore";
import ErrorIcon from "../../public/icons/info-circle.svg";

const paymentOptionImage = {
  UPI: {
    name: "UPI",
    image: <UPI className="w-11 sm:w-14 fill-skin-foreground" />,
  },
  CARDS: {
    name: "Credit / Debit Card",
    image: <Card className="w-7 sm:w-10 fill-skin-foreground" />,
  },
};

export default function CheckoutSection() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

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
  const allAddress = useAddressStore((state) => state.address);
  const setOrder = useUserStore((state) => state.setUser);
  const [billingError, setBillingError] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(
    allAddress[0]?.aid || ""
  );

  const onSubmit = (data) => {
    if (allAddress.length > 0) {
      const filterAddress = allAddress.filter(
        (address) => address.aid === selectedAddress
      )[0];
      if (data.bill_and_ship_status) {
        const orderSummery = {
          ...data,
          billingAddress: filterAddress,
          shippingAddress: filterAddress,
          orderId: uuidv4(),
        };
        console.log("Order Summery: ", orderSummery);
        setOrder(orderSummery);
        router.push(`/${orderSummery?.orderId}`);
      } else {
        const orderSummery = {
          ...data,
          billingAddress: filterAddress,
          orderId: uuidv4(),
        };
        console.log("Order Summery: ", orderSummery);
        setOrder(orderSummery);
        router.push(`/${orderSummery?.orderId}`);
      }
      reset();
      toast.success("Payment Successful");
    }else{
      setBillingError(true);
    }
  };

  useEffect(() => {
    setSelectedAddress(allAddress[0]?.aid || "");
  }, [allAddress[0]?.aid]);

  return (
    <div className="xl:w-[50%] bg-skin-background relative overflow-auto">
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
      <div className="xl:max-w-[768px] w-full h-full bg-slate-100/0 left-0 top-0 bottom-0 p-5 xl:p-20 bg-skin-background">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col pb-10">
          <InputField
            register={register}
            label="Email"
            type="email"
            id="personEmail"
            placeholder="joylawson@gmail.com"
            errors={errors}
            validationSchema={{
              required: "This field is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid Email Address",
              },
            }}
          />
          <InputField
            register={register}
            label="Phone Number"
            type="tel"
            id="personPhone"
            placeholder="(201) 830-8210"
            maxLength={10}
            errors={errors}
            validationSchema={{
              required: "This field is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Invalid Phone Number",
              },
            }}
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
                      <div className="flex-1 font-semibold text-xs sm:text-base">
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
                  register={register}
                  label="Card holder name"
                  type="text"
                  id="card_holder_name"
                  placeholder="Ex. Jane Cooper"
                  errors={errors}
                  validationSchema={{
                    required: "This field is required",
                    maxLength: {
                      value: 100,
                      message: "Max length exceeds",
                    },
                  }}
                  className={"uppercase"}
                />
                <div className="flex flex-col">
                  <label className="font-semibold text-base">Card Number</label>
                  <div className="flex group border focus-within:border-skin-primary px-4 py-2 rounded-xl gap-x-3 items-center my-2 bg-skin-foreground/5 border-skin-foreground/10">
                    <input
                      {...register("card_number")}
                      className="bg-transparent flex-1 placeholder:text-skin-foreground/30  focus:outline-0 py-1"
                      {...getCardNumberProps()}
                    />
                    <svg {...getCardImageProps({ images })} />
                  </div>

                  {erroredInputs.cardNumber ? (
                    <small className="text-red-500 font-medium flex items-center gap-x-2">
                      <ErrorIcon />
                      {erroredInputs.cardNumber}
                    </small>
                  ) : (
                    <small className="h-[21px] mt-[2px] "></small>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-x-4 mt-2">
                  <div className="sm:w-[50%] flex flex-col">
                    <label className="font-semibold text-base">
                      Valid Till
                    </label>
                    <input
                      {...register("expiry_date")}
                      className="focus:outline-0 bg-skin-foreground/5 border px-5 py-3 border-skin-foreground/10 rounded-xl mt-2 mb-5 placeholder:text-skin-foreground/30 focus-within:border-skin-primary"
                      {...getExpiryDateProps()}
                    />
                    {erroredInputs.expiryDate ? (
                      <small className="text-red-500 font-medium flex items-center gap-x-2 -mt-3">
                        <ErrorIcon />
                        {erroredInputs.expiryDate}
                      </small>
                    ) : (
                      <small className="h-[21px]"></small>
                    )}
                  </div>

                  <div className="sm:w-[50%] flex flex-col">
                    <label className="font-semibold text-base" htmlFor="cvv">
                      CVV
                    </label>
                    <input
                      {...register("cvv")}
                      className="focus:outline-0 bg-skin-foreground/5 border px-5 py-3 border-skin-foreground/10 rounded-xl mt-2 mb-5 placeholder:text-skin-foreground/30 focus-within:border-skin-primary"
                      {...getCVCProps()}
                    />
                    {erroredInputs.cvc ? (
                      <small className="text-red-500 font-medium flex items-center gap-x-2 -mt-3">
                        <ErrorIcon />
                        {erroredInputs.cvc}
                      </small>
                    ) : (
                      <small className="h-[21px]"></small>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <InputField
                  register={register}
                  label="UPI ID"
                  type="text"
                  id="upi_id"
                  placeholder="Ex. 12345@bankname"
                  errors={errors}
                  validationSchema={{
                    required: "This field is required",
                    maxLength: {
                      value: 100,
                      message: "Max length exceeds",
                    },
                    pattern: {
                      value: /[\.\-a-z0-9]+@[a-z]+/gm,
                      message: "Invalid UPI ID",
                    },
                  }}
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
                {allAddress.length > 0 && (
                  <span
                    onClick={() => setModalOpen(true)}
                    className="text-skin-primary font-medium cursor-pointer hover:text-skin-primary/80 transition-all duration-200 hover:scale-95 "
                  >
                    + Add new
                  </span>
                )}
              </div>

              {allAddress.length <= 0 ? (
                <>
                  <div
                    onClick={() => setModalOpen(true)}
                    className="mt-2 mb-5 border-dashed border-2 bg-skin-foreground/5 border-skin-foreground/10 h-40  rounded-xl flex justify-center items-center font-medium text-lg text-skin-foreground/30 cursor-pointer hover:bg-skin-primary-foreground/10 hover:border-skin-primary hover:text-skin-primary transition-all duration-200"
                  >
                    + Click here to add new billing address
                  </div>
                  {billingError ? (
                    <small className="text-red-500 font-medium flex items-center gap-x-2 -mt-4 mb-5">
                      <ErrorIcon />
                      This field is required
                    </small>
                  ) : (
                    <small className="h-[21px] -mt-4 mb-5"></small>
                  )}
                </>
              ) : (
                <div className="xl:max-h-80 xl:overflow-auto mt-2 mb-5 border rounded-xl p-4 border-skin-foreground/20 flex flex-col gap-y-5">
                  {allAddress.map((address, index) => {
                    return (
                      <div
                        onClick={() => setSelectedAddress(address.aid)}
                        key={index}
                        className={`flex cursor-pointer border-2 flex-col gap-y-2 ${
                          selectedAddress === address.aid
                            ? "border-skin-primary"
                            : "border-transparent"
                        } p-3 rounded-xl`}
                      >
                        <div className="flex items-center gap-x-3">
                          <h1 className="font-semibold text-lg">
                            {address.house_name}
                          </h1>

                          <div className="flex-1">
                            {address.tag && (
                              <div className="font-medium w-fit border-skin-primary text-skin-primary uppercase border rounded px-3 text-sm ">
                                {address.tag}
                              </div>
                            )}
                          </div>

                          {/* <div className="text-blue-500 font-medium cursor-pointer hover:text-blue-500/80 transition-all duration-200 hover:scale-95 pr-3 border-r border-skin-foreground/30">
                            Edit
                          </div>

                          <div className="text-red-500 font-medium cursor-pointer hover:text-red-500/80 transition-all duration-200 hover:scale-95 ">
                            Remove
                          </div> */}
                        </div>

                        <div className="text-sm text-skin-foreground/60">
                          {address.address}
                        </div>
                        <div className="text-sm text-skin-foreground/60">
                          {address.city}, {address.state}, {address.country} -{" "}
                          {address.pincode}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="inline-flex items-center ">
            <label
              className="relative flex items-center rounded-full cursor-pointer"
              htmlFor="billing_and_shipping"
            >
              <input
                {...register("bill_and_ship_status")}
                type="checkbox"
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-skin-bg-skin-primary checked:bg-skin-primary checked:before:bg-skin-primary hover:before:opacity-10"
                id="billing_and_shipping"
              />
              <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
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
            <label
              className="ml-2 cursor-pointer"
              htmlFor="billing_and_shipping"
            >
              Billing address is same as shipping
            </label>
          </div>

          <button className="text-skin-primary-foreground text-base">
            <div
              type="submit"
              className="bg-skin-primary py-3 font-bold rounded-xl mt-6 text-center"
            >
              Pay ${payableAmount.toFixed(2)}
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}
