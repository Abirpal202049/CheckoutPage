"use client";

export default function InputField({ label, type, id, placeholder, register}) {

  return (
    <div className="flex flex-col">
      <label className="font-semibold text-base" htmlFor={id}>{label}</label>
      <input
        placeholder={placeholder}
        className="focus:outline-0 bg-skin-foreground/5 border px-5 py-3 border-skin-foreground/10 rounded-xl mt-2 mb-5 placeholder:text-skin-foreground/30 focus-within:border-skin-primary"
        type={type}
        id={id}
        {...register(id)}
      />
    </div>
  );
}
