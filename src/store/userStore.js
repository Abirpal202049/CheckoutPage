import { create } from "zustand";

const userStore = (set) => ({
  user : {},
  setUser: (userDetails) => set((state) => ({ user:  userDetails})),
});

const useUserStore = create(userStore);

export default useUserStore;
