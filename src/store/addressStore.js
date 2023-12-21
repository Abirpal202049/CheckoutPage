import { create } from "zustand";
// import { devtools, persist } from "zustand/middleware";

const addressStore = (set) => ({
  address : [],
  insertAddress : (address) => set((state) => ({address: [...state.address ,address]})),
});

// const useCartStore = create(devtools(persist(cartStore, { name: "cart" })));
const useAddressStore = create(addressStore);

export default useAddressStore;
