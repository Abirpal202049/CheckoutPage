import React from "react";

export default function CustomerDetails({ details }) {
  const {
    username,
    personEmail,
    personPhone,
    billingAddress,
    bill_and_ship_status,
  } = details;
  return (
    <>
      {/* Customer Details */}
      <div className="text-xl">
        <h1>Customer Details</h1>
        {/* Name */}
        <div className="flex flex-col my-3 gap-y-1">
          <div className="flex justify-between text-base">
            <p className="text-skin-foreground text-opacity-70">Name : </p>
            <p className="font-light">{username}</p>
          </div>
          <div className="flex justify-between text-base">
            <p className="text-skin-foreground text-opacity-70">
              Phone Number :{" "}
            </p>
            <p className="font-light">{personPhone}</p>
          </div>
          <div className="flex justify-between text-base">
            <p className="text-skin-foreground text-opacity-70">Email : </p>
            <p className="font-light">{personEmail}</p>
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="text-xl my-12">
        <h1>Shipping Address</h1>
        {/* Name */}
        <div className="flex flex-col my-3 gap-y-1 text-base opacity-70">
          <p className="font-light">{billingAddress?.address}</p>

          <p className="font-light">
            {billingAddress?.house_name}, {billingAddress?.city},{" "}
            {billingAddress?.state}, {billingAddress?.country}
          </p>

          <p className="font-light">{billingAddress?.pincode}</p>
        </div>
      </div>

      {/* Billing Address */}
      {bill_and_ship_status && (
        <div className="text-xl ">
          <h1>Billing Address</h1>
          {/* Name */}
          <div className="flex flex-col my-3 gap-y-1 text-base opacity-70">
            <p className="font-light">{details?.shippingAddress?.address}</p>

            <p className="font-light">
              {billingAddress?.house_name}, {details?.shippingAddress?.city},{" "}
              {details?.shippingAddress?.state},{" "}
              {details?.shippingAddress?.country}
            </p>

            <p className="font-light">{details?.shippingAddress?.pincode}</p>
          </div>
        </div>
      )}
    </>
  );
}
