"use client";
import useAddressStore from "@/store/addressStore";
import Close from "../../public/icons/close-circle.svg";
import InputField from "./InputField";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';

export default function AddressModal({ setModalOpenFunc }) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const insertAddress = useAddressStore((state) => state.insertAddress);

  const onSubmit = (data) => {
    insertAddress({...data, aid: uuidv4()});
    setModalOpenFunc(false);
    reset();
  };
  return (
    <div className="fixed w-[90vw]  h-[500px] sm:h-max overflow-auto  sm:w-[500px] bg-skin-background border rounded-xl border-skin-foreground/20 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] shadow z-50">
      <div className="p-3 px-5 border-b border-skin-foreground/20 flex items-center">
        <h1 className="text-base font-medium flex-1">Add New Address</h1>
        <Close
          onClick={() => setModalOpenFunc(false)}
          className="w-5 stroke-skin-foreground/30 stroke-2 hover:stroke-skin-foreground transition-all duration-200 cursor-pointer"
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-4 py-5">
          <InputField
            register={register}
            type="text"
            label="Address"
            id="address"
            placeholder="1131 Dusty Townline, Jacksonville, TX 40322"
            errors={errors}
            validationSchema={{
              required: "This field is required",
              maxLength: {
                value: 500,
                message: "Max length is 500 characters",
              },
              minLength: {
                value: 10,
                message: "Min length is 10 characters",
              },
            }}
          />
          <InputField
            register={register}
            type="text"
            label="House Name / Flat No"
            id="house_name"
            placeholder="1131 Dusty Townline"
            errors={errors}
            validationSchema={{
              required: "This field is required",
              maxLength: {
                value: 50,
                message: "Max length exceeds",
              },
            }}
          />

          <div className="flex flex-col sm:flex-row sm:w-[460px] gap-x-3">
            <div className="sm:w-[49%]">
              <InputField
                register={register}
                type="text"
                label="State"
                id="state"
                placeholder="Texas"
                errors={errors}
                validationSchema={{
                  required: "This field is required",
                  maxLength: {
                    value: 70,
                    message: "Max length exceeds",
                  },
                }}
              />
            </div>

            <div className="sm:w-[50%]">
              <InputField
                register={register}
                type="text"
                label="Country"
                id="country"
                placeholder="United States"
                errors={errors}
                validationSchema={{
                  required: "This field is required",
                  maxLength: {
                    value: 70,
                    message: "Max length exceeds",
                  },
                }}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:w-[460px] gap-x-3">
            <div className="sm:w-[49%]">
              <InputField
                register={register}
                type="text"
                label="City"
                id="city"
                placeholder="Jacksonville"
                errors={errors}
                validationSchema={{
                  required: "This field is required",
                  maxLength: {
                    value: 70,
                    message: "Max length exceeds",
                  },
                }}
              />
            </div>

            <div className="sm:w-1/2">
              <InputField
                register={register}
                type="number"
                label="Pincode"
                id="pincode"
                placeholder="403221"
                max={999999}
                min={100000}
                errors={errors}
                validationSchema={{
                  required: "This field is required",
                  maxLength: {
                    value: 6,
                    message: "Max length exceeds",
                  },
                  minLength: {
                    value: 6,
                    message: "Min length is 6 characters",
                  },
                }}
              />
            </div>
          </div>

          <div>
            <InputField
              className="uppercase"
              register={register}
              type="text"
              label="Tag"
              id="tag"
              placeholder="House / Office"
              errors={errors}
            />
          </div>
        </div>
        <div className="border-t font-semibold flex px-5 p-4 border-skin-foreground/20 gap-x-3">
          <button
            onClick={() => setModalOpenFunc(false)}
            className="bg-skin-foreground/20 py-3 text-center px-5 rounded-xl flex-1 hover:bg-skin-foreground/10 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-skin-primary text-skin-primary-foreground hover:bg-skin-primary/80 py-3 text-center px-5 rounded-xl flex-1 transition-all duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
