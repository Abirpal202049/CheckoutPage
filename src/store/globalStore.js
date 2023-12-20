import { create } from "zustand";

const globalStore = (set) => ({
  merchantLogo : "",
  merchantName : "GROWW",
  setMerchantLogo: (logo) => set((state) => ({ merchantLogo: logo })),
  setMerchantName: (name) => set((state) => ({ merchantName: name })),
});

const useGlobalStore = create(globalStore);

export default useGlobalStore;
