import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";

export type TokenStore = {
  tokenAdded: boolean;
  setTokenAdded: (added: boolean) => void;
};

export const createTokenStore = () => {
  const store = createStore<TokenStore>()(
    persist(
      (set) => ({
        tokenAdded: false,
        setTokenAdded: (added) => set({ tokenAdded: added }),
      }),
      {
        name: "token-store",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );

  return store;
};
