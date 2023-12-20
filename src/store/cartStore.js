import { create } from "zustand";
// import { devtools, persist } from "zustand/middleware";

const cartStore = (set) => ({
  cart: [],
  totalAmount : 0,
  payableAmount : 0,
  setCart : (list) => set((state) => ({cart: list})),
  setTotalAmount : (amount) => set((state) => ({totalAmount: amount})),
  setPayableAmount : (amount) => set((state) => ({payableAmount: amount})),
  paymentMethod : [],
  setPaymentMethod : (method) => set((state) => ({paymentMethod: method}))
});

// const useCartStore = create(devtools(persist(cartStore, { name: "cart" })));
const useCartStore = create(cartStore);

export default useCartStore;
