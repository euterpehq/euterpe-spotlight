import { createStore } from "zustand/vanilla";

export type EarningsStore = {
  earnings: number;
  updateEarnings: (amount: number) => void;
};

export const createEarningsStore = () => {
  const store = createStore<EarningsStore>((set) => ({
    earnings: 0,
    updateEarnings: (amount) => {
      set((state) => ({
        earnings: state.earnings + amount,
      }));
    },
  }));

  return store;
};
