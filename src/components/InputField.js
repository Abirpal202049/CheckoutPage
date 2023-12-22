"use client";
import ErrorIcon from "../../public/icons/info-circle.svg";

export default function InputField({
  label,
  type,
  id,
  placeholder,
  register,
  min,
  max,
  maxLength,
  minLength,
  validationSchema,
  errors,
  className
}) {
  return (
    <div className="flex flex-col mb-1">
      <label className="font-semibold text-base" htmlFor={id}>
        {label}
      </label>
      <input
        placeholder={placeholder}
        className={`focus:outline-0 bg-skin-foreground/5 border px-5 py-3 border-skin-foreground/10 rounded-xl mt-2 placeholder:text-skin-foreground/30 focus-within:border-skin-primary ${className}`}
        type={type}
        id={id}
        {...register(id, validationSchema)}
        min={min}
        max={max}
        maxLength={maxLength}
        minLength={minLength}
      />
      {errors[id] ? (
        <small className="text-red-500 mt-[2px] font-medium flex items-center gap-x-2">
          <ErrorIcon />
          {errors[id].message}
        </small>
      ) : (
        <small className="h-[21px] mt-[2px] "></small>
      )}
    </div>
  );
}
